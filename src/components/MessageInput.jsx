import PropTypes from 'prop-types'
import React, { useState } from 'react'

import { sendMessage } from 'api'
import Button from 'components/shared/Button'
import Input from 'components/shared/Input'

const MessageInput = ({ selectedChatroom: { chatroomId }, user }) => {
  const [inputValue, setInputValue] = useState('')

  const onChangeHandler = e => {
    e.preventDefault()
    setInputValue(e.target.value)
  }

  const onKeyDownHandler = (e, user) => {
    if (!chatroomId) return
    if (e.key === 'Enter') {
      sendMessage(chatroomId, user, inputValue)
      setInputValue('')
    }
  }

  const sendButtonClickHandler = (e, user) => {
    if (!chatroomId) return
    sendMessage(chatroomId, user, inputValue)
    setInputValue('')
  }

  return (
    <>
      <Input
        width="100%"
        height="30px"
        onChange={onChangeHandler}
        onKeyDown={e => onKeyDownHandler(e, user)}
        value={inputValue}
      />
      <Button
        width="60px"
        height="30px"
        margin="0 0 0 10px"
        borderRadius="20px"
        border="none"
        backgroundColor="orange"
        onClick={e => sendButtonClickHandler(e, user)}
      >
        Send
      </Button>
    </>
  )
}

MessageInput.propTypes = {
  selectedChatroom: PropTypes.object,
  user: PropTypes.object,
}

export default MessageInput
