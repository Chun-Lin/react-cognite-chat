import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { BiMessageSquareAdd } from 'react-icons/bi'

import { Avatar } from 'components/shared/Avatar'
import Friend from 'components/Friend'
import ChatroomList from 'components/ChatroomList'
import ChatroomHeaderContent from 'components/ChatroomHeaderContent'
import Input from 'components/shared/Input'
import Message from 'components/Message'
import { Button } from 'components/shared/Button'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/user/userRedux'
import firebase, { db } from 'firebaseSetting'
import { selectChatroom } from 'redux/chatroom/chatroomRedux'

const MessngerContainter = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 50px 100px calc(100vh - 230px) 80px;
  grid-template-areas:
    'user-panel chatroom-header'
    'friend-list chatroom'
    'chatroom-list chatroom'
    'chatroom-list message-input';
  grid-column-gap: 0;
`

const UserPanel = styled.div`
  grid-area: user-panel;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #faf3ee;

  h1 {
    padding: 0;
    margin: 0;
    font-size: 25px;
  }
`

const FriendList = styled.div`
  grid-area: friend-list;
  display: flex;
  overflow: auto;
  background-color: #faf3ee;
`

const ChatroomListContainer = styled.div`
  grid-area: chatroom-list;
  padding: 10px 5px 0 5px;
  overflow: auto;
  background-color: #faf3ee;
`

const ChatroomHeader = styled.div`
  grid-area: chatroom-header;
  background-color: #f3f3f3;
`

const Chatroom = styled.div`
  grid-area: chatroom;
  overflow: auto;
`

const MessageInputContainer = styled.div`
  grid-area: message-input;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f3f3f3;
  padding: 0 20px;
`

const Messenger = () => {
  const user = useSelector(selectUser)
  const chatroom = useSelector(selectChatroom)
  const [friends, setFriends] = useState([])
  const [chatrooms, setChatrooms] = useState([])
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    db.collection('users')
      .where('uid', '!=', user?.uid)
      .onSnapshot((querySnapshot) => {
        let friendsAll = []
        querySnapshot.forEach((doc) => friendsAll.push(doc.data()))

        setFriends([...friendsAll])
      })
  }, [user.uid])

  useEffect(() => {
    db.collection('chatrooms')
      .where('users', 'array-contains', user?.uid)
      .onSnapshot((querySnapshot) => {
        let chatroomsAll = []
        querySnapshot.forEach((doc) => chatroomsAll.push(doc.data()))

        setChatrooms([...chatroomsAll])
      })
  }, [user.uid])

  useEffect(() => {
    if (chatroom) {
      db.collection('chatrooms')
        .doc(chatroom.friendUid)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((querySnapshot) => {
          let messagesAll = []
          querySnapshot.forEach((doc) =>
            messagesAll.push({ id: doc.id, data: doc.data() })
          )
          setMessages([...messagesAll])
        })
    }
  }, [chatroom])

  const onChangeHandler = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const sendButtonClickHandler = () => {
    db.collection('chatrooms')
      .doc(chatroom?.friendUid)
      .collection('messages')
      .doc()
      .set({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
      })

    setInput('')
  }

  return (
    <MessngerContainter>
      <UserPanel>
        <Avatar
          src={user?.photoURL}
          alt=""
          width="25px"
          height="25px"
          borderRadius="100px"
        />
        <h1>Cognite Chat</h1>
        <BiMessageSquareAdd size="25px" />
      </UserPanel>
      <FriendList>
        {friends.length > 0 &&
          friends.map((friend) => (
            <Friend
              key={friend.uid}
              photoURL={friend.photoURL}
              name={friend.name}
              friendUid={friend.uid}
              userUid={user.uid}
            />
          ))}
      </FriendList>
      <ChatroomListContainer>
        {chatrooms.length > 0
          ? chatrooms.map((chatroom) => (
              <ChatroomList
                key={chatroom?.photoURL}
                photoURL={chatroom?.photoURL}
                chatroomName={chatroom?.roomName}
                friendUid={
                  chatroom.users.filter((item) => item !== user.uid)[0]
                }
                userUid={user.uid}
              />
            ))
          : null}
      </ChatroomListContainer>
      <ChatroomHeader>
        {chatroom ? (
          <ChatroomHeaderContent
            photoURL={chatroom?.photoURL}
            chatroomName={chatroom?.chatroomName}
          />
        ) : null}
      </ChatroomHeader>
      <Chatroom>
        {messages.length > 0
          ? messages.map((message) => {
              return (
                <Message
                  message={message.data.message}
                  timeStamp={message.data.timestamp}
                  photoURL={user.photoURL}
                />
              )
            })
          : null}
      </Chatroom>
      <MessageInputContainer>
        <Input
          width="100%"
          height="30px"
          onChange={onChangeHandler}
          value={input}
        />
        <Button
          width="60px"
          height="30px"
          margin="0 0 0 10px"
          borderRadius="20px"
          border="none"
          backgroundColor="orange"
          onClick={sendButtonClickHandler}
        >
          Send
        </Button>
      </MessageInputContainer>
    </MessngerContainter>
  )
}

export default Messenger
