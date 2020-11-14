import React from 'react'

import { render } from 'test-utils'
import userEvent from '@testing-library/user-event'
import MessageInput from 'components/MessageInput'

test('Can call sendMessage api', async () => {
  const mockSelectedChatroom = {
    chatroomId: '617323160',
    users: [
      {
        displayName: 'ChunLin Wu',
        email: 'wulin40063@gmail.com',
        uid: 'efOzFdeIo9NrUT0WHercnwiqhx12',
        photoURL:
          'https://lh3.googleusercontent.com/-cAJh2ZEW9Hg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckxc820_nnKOs3DOyhRRtD03lXY7g/s96-c/photo.jpg',
      },
      {
        email: 'garywuofficial@gmail.com',
        photoURL:
          'https://lh3.googleusercontent.com/a-/AOh14GjszAsx5vvG9IwaCEQZOZzC94_Gwe5ylXzgIcUS=s96-c',
        displayName: 'Gary Wu',
        uid: 'zqyg8FPzTUfirtUItq8CqXZQ2Pf1',
      },
    ],
    chatroomName: 'ChunLin Wu',
    photoURLs: [
      'https://lh3.googleusercontent.com/a-/AOh14GjszAsx5vvG9IwaCEQZOZzC94_Gwe5ylXzgIcUS=s96-c',
    ],
  }

  const mockUser = {
    uid: 'efOzFdeIo9NrUT0WHercnwiqhx12',
    photoURL:
      'https://lh3.googleusercontent.com/-cAJh2ZEW9Hg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckxc820_nnKOs3DOyhRRtD03lXY7g/s96-c/photo.jpg',
    email: 'wulin40063@gmail.com',
    displayName: 'ChunLin Wu',
  }

  const { findByText, getByRole } = render(
    <MessageInput selectedChatroom={mockSelectedChatroom} user={mockUser} />
  )

  const btnNode = await findByText(/Send/i)
  expect(btnNode).toBeInTheDocument()

  const inputNode = getByRole('textbox')
  userEvent.type(inputNode, 'Yoooooo')
  expect(inputNode).toHaveAttribute('value', 'Yoooooo')
})
