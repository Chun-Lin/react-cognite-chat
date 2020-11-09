import React from 'react'
import userEvent from '@testing-library/user-event'

import { render } from 'test-utils'

import ChatroomList from 'components/ChatroomList'

const attendants = [
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
  {
    uid: 'efOzFdeIo9NrUT0WHercnwiqhx12',
    photoURL:
      'https://lh3.googleusercontent.com/-cAJh2ZEW9Hg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckxc820_nnKOs3DOyhRRtD03lXY7g/s96-c/photo.jpg',
    email: 'wulin40063@gmail.com',
    displayName: 'ChunLin Wu',
  },
]

test('should show <CreateChatroomModal /> correctly', async () => {
  const { findByText, findByRole, store, debug } = render(
    <ChatroomList
      photoURL="https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg"
      chatroomId="abja9je"
      chatroomName="room1"
      attendants={attendants}
    />
  )

  debug()
  expect(await findByText(/room1/i)).toBeInTheDocument()

  const avatarNode = await findByRole('img')
  expect(avatarNode).toHaveAttribute(
    'src',
    'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg'
  )

  userEvent.click(avatarNode)

  expect(store.getState()).toStrictEqual({
    chatroom: {
      chatroom: {
        chatroomId: 'abja9je',
        chatroomName: 'room1',
        photoURL:
          'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
        users: [
          {
            displayName: 'Wu Gary-NTHU',
            email: 'wulin104065529@gapp.nthu.edu.tw',
            photoURL:
              'https://lh3.googleusercontent.com/-65VVKBumV1Y/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckTpjIGqSrQkJxVvd8lKfMbw1Ey_w/s96-c/photo.jpg',
            uid: 'EqOtr0Fi4KMf2rl0GydZBcLU7wG2',
          },
          {
            displayName: 'Gary Wu',
            email: 'garywu@qnap.com',
            photoURL:
              'https://lh4.googleusercontent.com/-ydRjPWpfNNc/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclodgeEKwFBd9UHmunKSSLvDrSTTg/s96-c/photo.jpg',
            uid: 'EaaaLGbFZZXIsT8PY3An8VnrNer2',
          },
          {
            displayName: 'ChunLin Wu',
            email: 'wulin40063@gmail.com',
            photoURL:
              'https://lh3.googleusercontent.com/-cAJh2ZEW9Hg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckxc820_nnKOs3DOyhRRtD03lXY7g/s96-c/photo.jpg',
            uid: 'efOzFdeIo9NrUT0WHercnwiqhx12',
          },
        ],
      },
    },
    user: {
      user: null,
    },
  })
})
