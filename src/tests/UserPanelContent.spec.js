import React from 'react'

import { render } from 'test-utils'

import UserPanelContent from 'components/UserPanelContent'

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
  const { findByText, findByRole, debug } = render(
    <UserPanelContent user={mockUser} friends={mockFriends} />
  )

  debug()
  expect(await findByText(/Cognite Chat/i)).toBeInTheDocument()
  expect(await findByRole('img')).toHaveAttribute(
    'src',
    'https://lh3.googleusercontent.com/-cAJh2ZEW9Hg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckxc820_nnKOs3DOyhRRtD03lXY7g/s96-c/photo.jpg'
  )
})
