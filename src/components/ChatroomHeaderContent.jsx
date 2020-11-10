import React from 'react'
import styled from 'styled-components'

import Avatar from 'components/shared/Avatar'
import DoubleAvatar from 'components/shared/DoubleAvatar'

const HeaderContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
`
const ChatroomName = styled.h3`
  padding: 0;
  margin: 0;
  margin-left: 10px;
`

const ChatroomHeaderContent = ({ photoURLs, chatroomName }) => {
  return (
    <HeaderContainer>
      {photoURLs.length === 1 ? (
        <Avatar
          src={photoURLs[0]}
          alt=""
          width="30px"
          height="30px"
          borderRadius="100px"
        />
      ) : (
        <DoubleAvatar
          photoURLs={photoURLs.slice(0, 2)}
          width={40}
          height={40}
        />
      )}

      <ChatroomName>{chatroomName}</ChatroomName>
    </HeaderContainer>
  )
}

export default ChatroomHeaderContent
