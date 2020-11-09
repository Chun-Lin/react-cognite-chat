import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

import { Button } from 'components/shared/Button'
import Input from 'components/shared/Input'
import Selector from 'components/shared/Selector'
import { db } from 'firebaseSetting'
import { join } from 'redux/chatroom/chatroomRedux'
import { hashFromString } from 'utils/hash'

const CreateChatRoomModalContainer = styled.div`
  width: 40vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.25);
`

const ModalHeader = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px;
  font-size: 24px;
`

const ModalContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 10px 20px;
  font-size: 20px;
`

const ModalFooter = styled.div`
  height: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 10px;
`

const ModalButton = styled(Button)`
  width: 50px;
  height: 25px;
  margin-left: 10px;
  border-radius: 100px;
  border: none;

  &:hover {
    background-color: orange;
  }
`

const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;

  span {
    margin-right: 10px;
  }
`

const CreateChatroomModal = ({ onClose, friends, user }) => {
  const [selectedFriends, setSelectedFriendss] = useState()
  const [inputValue, setInputValue] = useState()

  const selectorChangeHandler = (option) => {
    setSelectedFriendss(option)
  }

  const friendSelectorOptions = friends.map((friend) => ({
    value: friend.uid,
    label: friend.displayName,
  }))

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value)
  }

  const dispatch = useDispatch()

  const createChatroom = () => {
    const attendedFriends = friends.filter((friend) =>
      selectedFriends.find(
        (selectedFriend) => friend.uid === selectedFriend.value
      )
    )

    const stringToHash = [...attendedFriends, user]
      .sort((a, b) => a.uid.localeCompare(b.uid))
      .reduce((acc, curr) => {
        return (acc += curr.uid)
      }, '')
      .concat(`${inputValue}`)
    const chatroomId = hashFromString(stringToHash)

    db.collection('chatrooms')
      .doc(`${chatroomId}`)
      .set(
        {
          chatroomName: inputValue,
          users: [...attendedFriends, user],
        },
        { merge: true }
      )

    dispatch(
      join({
        chatroomId: `${chatroomId}`,
        users: [...attendedFriends, user],
        chatroomName: inputValue,
        photoURL: attendedFriends[0].photoURL,
      })
    )
  }

  return (
    <CreateChatRoomModalContainer>
      <ModalHeader>Create a Chatroom</ModalHeader>
      <ModalContent>
        <Label htmlFor="chatroom">
          <span>Chatroom Name:</span>
          <Input
            name="chatroom"
            width="100%"
            height="30px"
            onChange={inputChangeHandler}
            value={inputValue}
            placeholder="Please input chatroom name"
          />
        </Label>
        <Label htmlFor="members">
          <span>Choose Members:</span>
          <Selector
            name="members"
            isMulti
            placeHolder="Select at least 2 friends"
            options={friendSelectorOptions}
            onChange={(option) => selectorChangeHandler(option)}
          />
        </Label>
      </ModalContent>
      <ModalFooter>
        <ModalButton onClick={onClose}>Cancel</ModalButton>
        <ModalButton
          disabled={!inputValue || !selectedFriends}
          onClick={() => {
            createChatroom()
            onClose()
          }}
        >
          Create
        </ModalButton>
      </ModalFooter>
    </CreateChatRoomModalContainer>
  )
}

export default CreateChatroomModal
