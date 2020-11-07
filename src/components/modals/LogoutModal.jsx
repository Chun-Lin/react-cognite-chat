import React from 'react'
import styled from 'styled-components'

import { Button } from 'components/shared/Button'
import { auth } from 'firebaseSetting'
import { useDispatch } from 'react-redux'
import { logout } from 'redux/user/userRedux'

const ModalContainer = styled.div`
  width: 300px;
  height: 150px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.25);
`

const ModalContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`

const ButtonContainer = styled.div`
  height: 50px;
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

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch()

  return (
    <ModalContainer>
      <ModalContent>Want to logout?</ModalContent>
      <ButtonContainer>
        <ModalButton onClick={onClose}>No</ModalButton>
        <ModalButton
          onClick={() => {
            onClose()
            auth.signOut()
            dispatch(logout())
          }}
        >
          Yes
        </ModalButton>
      </ButtonContainer>
    </ModalContainer>
  )
}

export default LogoutModal
