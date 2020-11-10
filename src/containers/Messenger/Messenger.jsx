import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/macro'

import Friend from 'components/Friend'
import ChatroomList from 'components/ChatroomList'
import ChatroomHeaderContent from 'components/ChatroomHeaderContent'
import Message from 'components/Message'
import { useSelector } from 'react-redux'
import { selectUser } from 'redux/user/userRedux'
import { db } from 'firebaseSetting'
import { selectChatroom } from 'redux/chatroom/chatroomRedux'
import UserPanelContent from 'components/UserPanelContent'
import MessageInput from 'components/MessageInput'

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
      .where('users', 'array-contains', {
        ...mainUser,
      })
      .onSnapshot((querySnapshot) => {
        let chatroomsAll = []
        querySnapshot.forEach((doc) =>
          chatroomsAll.push({ id: doc.id, data: doc.data() })
        )

        setChatrooms([...chatroomsAll])
      })
  }, [selectedChatroom, mainUser])

  useEffect(() => {
    if (!selectedChatroom) return

    db.collection('chatrooms')
      .doc(selectedChatroom.chatroomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
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
  }, [selectedChatroom])

  const scrollToBottom = useCallback(() => {
    chatroomBottomRef.current.scrollIntoView()
  }, [])

  useEffect(scrollToBottom, [messages, scrollToBottom])

  const chatroomBottomRef = useRef(null)

  return (
    <MessngerContainter>
      <UserPanel>
        <UserPanelContent user={mainUser} friends={friends} />
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
                  chatroomName={chatroom.data.chatroomName}
                  attendants={chatroom.data.users}
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
                  senderMsg={message.data.sender.uid === mainUser.uid}
                />
              )
            })
          : null}
        <div ref={chatroomBottomRef} />
      </Chatroom>
      <MessageInputContainer>
        <MessageInput selectedChatroom={selectedChatroom} user={mainUser} />
      </MessageInputContainer>
    </MessngerContainter>
  )
}

export default Messenger
