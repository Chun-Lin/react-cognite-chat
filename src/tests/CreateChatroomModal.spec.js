import React from 'react'
import userEvent from '@testing-library/user-event'

import { render } from 'test-utils'

import CreateChatroomModal from 'components/modals/CreateChatroomModal'

const mockFriends = [
  {
    uid: 'EqOtr0Fi4KMf2rl0GydZBcLU7wG2',
    photoURL:
      'https://lh3.googleusercontent.com/-65VVKBumV1Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckTpjIGqSrQkJxVvd8lKfMbw1Ey_w/s96-c/photo.jpg',
    email: 'wulin104065529@gapp.nthu.edu.tw',
    displayName: 'Wu Gary-NTHU',
  },
  {
    uid: 'EaaaLGbFZZXIsT8PY3An8VnrNer2',
    photoURL:
      'https://lh4.googleusercontent.com/-ydRjPWpfNNc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclodgeEKwFBd9UHmunKSSLvDrSTTg/s96-c/photo.jpg',
    email: 'garywu@qnap.com',
    displayName: 'Gary Wu',
  },
]

const mockUser = {
  uid: 'efOzFdeIo9NrUT0WHercnwiqhx12',
  photoURL:
    'https://lh3.googleusercontent.com/-cAJh2ZEW9Hg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckxc820_nnKOs3DOyhRRtD03lXY7g/s96-c/photo.jpg',
  email: 'wulin40063@gmail.com',
  displayName: 'ChunLin Wu',
}

test('should show <CreateChatroomModal /> correctly', async () => {
  const onClose = jest.fn()
  const { findByText, getByPlaceholderText, debug } = render(
    <CreateChatroomModal
      onClose={onClose}
      friends={mockFriends}
      user={mockUser}
    />
  )
  expect(await findByText(/Chatroom Name/i)).toBeInTheDocument()
  expect(await findByText(/Choose Members/i)).toBeInTheDocument()

  const inputNode = getByPlaceholderText('Please input chatroom name')
  userEvent.type(inputNode, 'room1')
  expect(inputNode).toHaveValue('room1')

  debug()

  const cancelBtn = await findByText(/Cancel/i)
  userEvent.click(cancelBtn)
  expect(onClose).toHaveBeenCalledTimes(1)
})
