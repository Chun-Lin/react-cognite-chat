import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sendMessage } from 'api'
import Button from 'components/shared/Button'
import Input from 'components/shared/Input'
import { saveMessage, cacheMessages } from 'redux/chatroom/chatroomRedux'

const MessageInput = ({ selectedChatroom: { chatroomId }, user }) => {
  const dispatch = useDispatch()
  const messages = useSelector(cacheMessages)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const cacheMessage = messages.filter(
      messageItem => messageItem.chatroomId === chatroomId
    )

    cacheMessage[0]?.message
      ? setInputValue(cacheMessage[0]?.message)
      : setInputValue('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroomId])

  const onChangeHandler = e => {
    e.preventDefault()
    setInputValue(e.target.value)
    dispatch(saveMessage({ chatroomId, message: e.target.value }))
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
        backgroundColor="#FF6918"
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
