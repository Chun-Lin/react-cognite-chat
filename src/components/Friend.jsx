import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

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

const Friend = ({ photoURL, name, friendUid, userUid }) => {
  const dispatch = useDispatch()

  const addChatRoom = () => {
    dispatch(
      join({
        chatroomName: name,
        photoURL,
        friendUid,
        userUid,
      })
    )

    db.collection('chatrooms')
      .doc(friendUid)
      .set(
        {
          roomName: name,
          users: [friendUid, userUid],
          photoURL,
        },
        { merge: true }
      )
  }

  return (
    <FriendContainer onClick={addChatRoom}>
      <Avatar
        src={photoURL}
        alt=""
        width="40px"
        height="40px"
        borderRadius="100px"
      />
      <span>{name}</span>
    </FriendContainer>
  )
}

export default Friend
