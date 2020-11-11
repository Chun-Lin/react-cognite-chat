import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { db } from 'firebaseSetting'
import { join } from 'redux/chatroom/chatroomRedux'
import Avatar from 'components/shared/Avatar'
import DoubleAvatar from 'components/shared/DoubleAvatar'

const ListContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;

  border-radius: 10px;

  &:hover {
    background-color: #f3f3f3;
  }
`

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 0 10px;
`

const ChatroomName = styled.h3`
  padding: 0;
  margin: 0;
`

const LastestMsg = styled.p`
  text-align: left;
  padding: 0;
  margin: 0;
`

const ChatroomList = ({
  photoURLs,
  chatroomId,
  chatroomName,
  attendants,
  user,
}) => {
  const [lastestMessage, setLastestMessage] = useState('')

  const dispatch = useDispatch()

  const selectedChatRoom = () => {
    dispatch(
      join({
        chatroomId,
        users: attendants,
        chatroomName,
        photoURLs,
      })
    )
  }

  useEffect(() => {
    const queryChatroomMsgAsc = db
      .collection('chatrooms')
      .doc(chatroomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')

    queryChatroomMsgAsc.onSnapshot(
      querySnapshot => {
        let messagesAll = []
        querySnapshot.forEach(doc =>
          messagesAll.push({ id: doc.id, data: doc.data() })
        )
        setLastestMessage(messagesAll[messagesAll.length - 1]?.data.message)
      },
      err => console.log(err)
    )
  }, [chatroomId])

  const chooseChatroomName = () => {
    const friendChatroomName = attendants.filter(
      item => item.uid !== user.uid
    )[0].displayName

    return attendants.length === 2 ? friendChatroomName : chatroomName
  }

  return (
    <ListContainer onClick={selectedChatRoom}>
      {photoURLs.length === 1 ? (
        <Avatar
          src={photoURLs[0]}
          alt=""
          width="40px"
          height="40px"
          borderRadius="100px"
        />
      ) : (
        <DoubleAvatar
          photoURLs={photoURLs.slice(0, 2)}
          width={40}
          height={40}
        />
      )}

      <DialogWrapper>
        <ChatroomName>{chooseChatroomName()}</ChatroomName>
        <LastestMsg>{lastestMessage}</LastestMsg>
      </DialogWrapper>
    </ListContainer>
  )
}

ChatroomList.propTypes = {
  attendants: PropTypes.arrayOf(PropTypes.object),
  chatroomId: PropTypes.string,
  chatroomName: PropTypes.string,
  photoURLs: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.object,
}

export default ChatroomList
