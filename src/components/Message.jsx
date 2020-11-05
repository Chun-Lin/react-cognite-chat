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

const Message = ({ message, timeStamp, photoURL }) => {
  return (
    <MessageContainer>
      <Avatar
        src={photoURL}
        alt=""
        width="30px"
        height="30px"
        borderRadius="100px"
      />
      <p>{message}</p>
      <small>
        {timeStamp ? new Date(timeStamp.toDate()).toLocaleString() : null}
      </small>
    </MessageContainer>
  )
}

export default Message
