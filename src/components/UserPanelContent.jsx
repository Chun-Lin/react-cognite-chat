import React from 'react'
import styled from 'styled-components/macro'
import { BiMessageSquareAdd } from 'react-icons/bi'

import { Avatar } from './shared/Avatar'
import { useModal } from 'hooks/useModal'
import LogoutModal from './modals/LogoutModal'
import CreateChatroomModal from './modals/CreateChatroomModal'

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

const UserPanelContent = ({ user, friends }) => {
  const {
    showModal: showLogoutModal,
    closeModal: closeLogoutModal,
    renderModal: renderLogoutModal,
  } = useModal({
    isCoverRemovable: true,
    isCoverShown: true,
  })

  const {
    showModal: showCreateChatroomModal,
    closeModal: closeCreateChatroomModal,
    renderModal: renderCreateChatroomModal,
  } = useModal({
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
        onClick={showLogoutModal}
      />
      <h1>Cognite Chat</h1>
      <BiMessageSquareAdd
        size="25px"
        css={`
          cursor: pointer;
        `}
        onClick={showCreateChatroomModal}
      />
      {renderLogoutModal(<LogoutModal onClose={closeLogoutModal} />)}
      {renderCreateChatroomModal(
        <CreateChatroomModal
          onClose={closeCreateChatroomModal}
          friends={friends}
          user={user}
        />
      )}
    </UserPanelContentContainer>
  )
}

export default UserPanelContent
