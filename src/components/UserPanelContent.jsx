import PropTypes from 'prop-types'
import React, { lazy, Suspense } from 'react'
import styled from 'styled-components/macro'
import { BiMessageSquareAdd } from 'react-icons/bi'

import Avatar from 'components/shared/Avatar'
import { useModal } from 'hooks/useModal'

const LogoutModal = lazy(() => import('./modals/LogoutModal'))
const CreateChatroomModal = lazy(() => import('./modals/CreateChatroomModal'))

const UserPanelContentContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* background-color: #faf3ee; */

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
      {renderLogoutModal(
        <Suspense fallback={<div></div>}>
          <LogoutModal onClose={closeLogoutModal} />
        </Suspense>
      )}
      {renderCreateChatroomModal(
        <Suspense fallback={<div></div>}>
          <CreateChatroomModal
            onClose={closeCreateChatroomModal}
            friends={friends}
            user={user}
          />
        </Suspense>
      )}
    </UserPanelContentContainer>
  )
}

UserPanelContent.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
}

export default UserPanelContent
