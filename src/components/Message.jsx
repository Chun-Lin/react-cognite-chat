import React from 'react'
import styled from 'styled-components'
import { Avatar } from './shared/Avatar'

const MessageContainer = styled.div`
  width: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 15px;

  p {
    padding: 15px;
    margin: 10px;
    border-radius: 20px;
    background-color: #f3f3f3;
  }

  small {
    position: absolute;
    font-size: 10px;
    right: 0;
    bottom: -5px;
  }
`

const Message = () => {
  return (
    <MessageContainer>
      <Avatar
        src="http://lorempixel.com/640/480"
        alt=""
        width="30px"
        height="30px"
        borderRadius="100px"
      />
      <p>This is a Message</p>
      <small>timestamp</small>
    </MessageContainer>
  )
}

export default Message
