import React from 'react'
import styled from 'styled-components'

import { Avatar } from './shared/Avatar'

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

const ChatroomHeaderContent = () => {
  return (
    <HeaderContainer>
      <Avatar
        src="http://lorempixel.com/640/480"
        alt=""
        width="30px"
        height="30px"
        borderRadius="100px"
      />
      <ChatroomName>Chatroom Name</ChatroomName>
    </HeaderContainer>
  )
}

export default ChatroomHeaderContent
