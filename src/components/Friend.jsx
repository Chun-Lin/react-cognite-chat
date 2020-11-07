import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import isEqual from 'lodash.isequal'

import { db } from 'firebaseSetting'
import { Avatar } from './shared/Avatar'
import { join } from 'redux/chatroom/chatroomRedux'
import { login } from 'redux/user/userRedux'

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

    const chatroomDocRef = await db.collection('chatrooms').add(
      {
        users: [friend, user],
      },
      { merge: true }
    )

    dispatch(
      join({
        chatroomId: chatroomDocRef.id,
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
            ? [...userDoc.data().chatrooms, chatroomDocRef.id]
            : [chatroomDocRef.id],
        },
        { merge: true }
      )

    const friendDoc = await db.collection('users').doc(friend.uid).get()
    db.collection('users')
      .doc(friend.uid)
      .set(
        {
          chatrooms: friendDoc.data().chatrooms
            ? [...friendDoc.data().chatrooms, chatroomDocRef.id]
            : [chatroomDocRef.id],
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
