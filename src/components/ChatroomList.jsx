import React from 'react'
import { useDispatch } from 'react-redux'
import { join } from 'redux/chatroom/chatroomRedux'
import styled from 'styled-components/macro'
import { Avatar } from './shared/Avatar'

const ListContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  border-radius: 10px;

  &:hover {
    background-color: #f3f3f3;
  }
`

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
`

const ChatroomName = styled.h3`
  padding: 0;
  margin: 0;
`

const LastestMsg = styled.p`
  padding: 0;
  margin: 0;
`

const ChatroomList = ({ photoURL, chatroomId, chatroomName, friend, user }) => {
  const dispatch = useDispatch()

  const selectedChatRoom = () => {
    dispatch(
      join({
        chatroomId,
        users: [friend, user],
        chatroomName: friend.displayName,
        photoURL: friend.photoURL,
      })
    )
  }

  return (
    <ListContainer onClick={selectedChatRoom}>
      <Avatar
        src={photoURL}
        alt=""
        width="40px"
        height="40px"
        borderRadius="100px"
      />
      <DialogWrapper>
        <ChatroomName>{chatroomName}</ChatroomName>
        <LastestMsg>This is a test</LastestMsg>
      </DialogWrapper>
    </ListContainer>
  )
}

export default ChatroomList
