import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import isEqual from 'lodash.isequal'

import { db } from 'firebaseSetting'
import { Avatar } from './shared/Avatar'
import { join } from 'redux/chatroom/chatroomRedux'
import { login } from 'redux/user/userRedux'
import { hashFromString } from 'utils/hash'

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
    const chatroomId = hashFromString(`${friend.uid}${user.uid}`)
    console.log('chatroomId', chatroomId)
    db.collection('chatrooms')
      .doc(`${chatroomId}`)
      .set(
        {
          chatroomName: friend.displayName,
          users: [friend, user],
        },
        { merge: true }
      )

    dispatch(
      join({
        chatroomId: `${chatroomId}`,
        users: [friend, user],
        chatroomName: friend.displayName,
        photoURL: friend.photoURL,
      })
    )
    const userDoc = await db.collection('users').doc(user.uid).get()
    db.collection('users')
      .doc(user.uid)
      .set(
        {
          chatrooms: userDoc.data().chatrooms
            ? [...userDoc.data().chatrooms, chatroomId]
            : [chatroomId],
        },
        { merge: true }
      )

    const friendDoc = await db.collection('users').doc(friend.uid).get()
    db.collection('users')
      .doc(friend.uid)
      .set(
        {
          chatrooms: friendDoc.data().chatrooms
            ? [...friendDoc.data().chatrooms, chatroomId]
            : [chatroomId],
        },
        { merge: true }
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
