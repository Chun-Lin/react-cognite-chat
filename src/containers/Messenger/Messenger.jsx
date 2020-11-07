import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

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
import UserPanelContent from 'components/UserPanelContent'

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
  const mainUser = useSelector(selectUser)
  const selectedChatroom = useSelector(selectChatroom)
  const [friends, setFriends] = useState([])
  const [chatrooms, setChatrooms] = useState([])
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    db.collection('users')
      .where('uid', '!=', mainUser.uid)
      .onSnapshot((querySnapshot) => {
        let friendsAll = []
        querySnapshot.forEach((doc) => friendsAll.push(doc.data()))

        setFriends([...friendsAll])
      })
  }, [mainUser.uid])

  useEffect(() => {
    db.collection('chatrooms')
      // TODO: filter the chatroom don't belong to the user
      // .where('users', 'array-contains', {
      //   ...mainUser,
      // })
      .onSnapshot((querySnapshot) => {
        let chatroomsAll = []
        querySnapshot.forEach((doc) =>
          chatroomsAll.push({ id: doc.id, data: doc.data() })
        )

        setChatrooms([...chatroomsAll])
      })
  }, [selectedChatroom, mainUser])

  useEffect(() => {
    if (selectedChatroom) {
      db.collection('chatrooms')
        .doc(selectedChatroom.chatroomId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot(
          (querySnapshot) => {
            let messagesAll = []
            querySnapshot.forEach((doc) =>
              messagesAll.push({ id: doc.id, data: doc.data() })
            )
            setMessages([...messagesAll])
          },
          (err) => console.log(err)
        )
    }
  }, [selectedChatroom])

  const onChangeHandler = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const sendButtonClickHandler = (e, mainUser) => {
    if (selectedChatroom) {
      db.collection('chatrooms')
        .doc(selectedChatroom.chatroomId)
        .collection('messages')
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          sender: mainUser,
        })
    }

    setInput('')
  }

  return (
    <MessngerContainter>
      <UserPanel>
        <UserPanelContent user={mainUser} />
      </UserPanel>
      <FriendList>
        {friends.length > 0 &&
          friends.map((friend) => (
            <Friend key={friend.uid} friend={friend} user={mainUser} />
          ))}
      </FriendList>
      <ChatroomListContainer>
        {chatrooms.length > 0
          ? chatrooms.map((chatroom) => {
              const friend = chatroom.data.users.filter(
                (user) => user.uid !== mainUser.uid
              )[0]

              return (
                <ChatroomList
                  key={chatroom.id}
                  chatroomId={chatroom.id}
                  photoURL={friend.photoURL}
                  chatroomName={friend.displayName}
                  friend={friend}
                  user={mainUser}
                />
              )
            })
          : null}
      </ChatroomListContainer>
      <ChatroomHeader>
        {selectedChatroom ? (
          <ChatroomHeaderContent
            photoURL={selectedChatroom.photoURL}
            chatroomName={selectedChatroom.chatroomName}
          />
        ) : null}
      </ChatroomHeader>
      <Chatroom>
        {messages.length > 0
          ? messages.map((message) => {
              return (
                <Message
                  key={message.id}
                  message={message.data.message}
                  timeStamp={message.data.timestamp}
                  photoURL={message.data.sender?.photoURL}
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
          onClick={(e) => sendButtonClickHandler(e, mainUser)}
        >
          Send
        </Button>
      </MessageInputContainer>
    </MessngerContainter>
  )
}

export default Messenger
