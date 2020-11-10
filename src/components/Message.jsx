import React from 'react'
import styled from 'styled-components'

import Avatar from 'components/shared/Avatar'

const MessageContainer = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  margin: 10px;
  margin-right: ${props => (props.senderMsg ? '' : 'auto')};
  margin-left: ${props => (props.senderMsg ? 'auto' : '')};

  p {
    padding: 15px;
    margin: 10px;
    text-align: ${props => (props.senderMsg ? 'right' : 'left')};
    border-radius: 20px;
    background-color: #f3f3f3;
  }

  small {
    position: absolute;
    font-size: 10px;
    right: 0;
    bottom: -5px;
  }

  img {
    order: ${props => (props.senderMsg ? 1 : 0)};
  }
`

const Message = ({ message, timeStamp, photoURL, senderMsg }) => {
  return (
    <MessageContainer senderMsg={senderMsg}>
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
