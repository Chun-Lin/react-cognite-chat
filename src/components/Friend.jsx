import { db } from 'firebaseSetting'
import React from 'react'
import styled from 'styled-components'
import { Avatar } from './shared/Avatar'

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

const Friend = ({ photoURL, name }) => {
  return (
    <FriendContainer onClick={() => {}}>
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
