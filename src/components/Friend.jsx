import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import isEqual from 'lodash.isequal'

import { db } from 'firebaseSetting'
import { Avatar } from './shared/Avatar'
import { join } from 'redux/chatroom/chatroomRedux'

const FriendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10px;

  span {
    font-size: 16px;
  }
`

const Friend = ({ photoURL, name, friend, user }) => {
  const dispatch = useDispatch()

  const addChatRoom = async () => {
    const querySnapshot = await db.collection('chatrooms').get()
    let users = []
    querySnapshot.forEach((doc) => users.push(doc.data()))

    const isChatroomExist = users.some(
      (chatroomUsers) =>
        isEqual(chatroomUsers.users, [friend, user]) ||
        isEqual(chatroomUsers.users, [user, friend])
    )

    if (isChatroomExist) return

    const docRef = await db.collection('chatrooms').add(
      {
        users: [friend, user],
      },
      { merge: true }
    )

    dispatch(
      join({
        chatroomId: docRef.id,
        users: [friend, user],
        chatroomName: friend.displayName,
        photoURL: friend.photoURL,
      })
    )
  }

  return (
    <FriendContainer onClick={addChatRoom}>
      <Avatar
        src={friend.photoURL}
        alt=""
        width="40px"
        height="40px"
        borderRadius="100px"
      />
      <span>{friend.displayName}</span>
    </FriendContainer>
  )
}

export default Friend
