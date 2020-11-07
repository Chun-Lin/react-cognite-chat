import React from 'react'
import styled from 'styled-components'
import { BiMessageSquareAdd } from 'react-icons/bi'

import { Avatar } from './shared/Avatar'
import { useModal } from 'hooks/useModal'
import LogoutModal from './modals/LogoutModal'

const UserPanelContentContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #faf3ee;

  h1 {
    padding: 0;
    margin: 0;
    font-size: 25px;
  }
`

const UserPanelContent = ({ user }) => {
  const { showModal, closeModal, renderModal } = useModal({
    isCoverRemovable: true,
    isCoverShown: true,
  })

  return (
    <UserPanelContentContainer>
      <Avatar
        src={user?.photoURL}
        alt=""
        width="25px"
        height="25px"
        borderRadius="100px"
        onClick={showModal}
      />
      <h1>Cognite Chat</h1>
      <BiMessageSquareAdd size="25px" />
      {renderModal(<LogoutModal onClose={closeModal} />)}
    </UserPanelContentContainer>
  )
}

export default UserPanelContent
