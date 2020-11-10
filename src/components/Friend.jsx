import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { db } from 'firebaseSetting'
import Avatar from 'components/shared/Avatar'
import { join } from 'redux/chatroom/chatroomRedux'
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
    const stringToHash = [friend, user]
      .sort((a, b) => a.uid.localeCompare(b.uid))
      .reduce((acc, curr) => {
        return (acc += curr.uid)
      }, '')

    const chatroomId = hashFromString(stringToHash)

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
