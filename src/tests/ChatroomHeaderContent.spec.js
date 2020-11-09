import React from 'react'
import userEvent from '@testing-library/user-event'

import { render } from 'test-utils'

import ChatroomHeaderContent from 'components/ChatroomHeaderContent'

describe('<ChatroomHeaderContent /> Unit Tests', () => {
  it('should show avatar and friend name', async () => {
    const { findByText, getByRole } = render(
      <ChatroomHeaderContent
        photoURL="https://s3.amazonaws.com/uifaces/faces/twitter/rahmeen/128.jpg"
        chatroomName="Gary Wu"
      />
    )

    expect(await findByText(/Gary Wu/i)).toBeInTheDocument()

    const avatarNode = getByRole('img')

    expect(avatarNode).toHaveAttribute(
      'src',
      'https://s3.amazonaws.com/uifaces/faces/twitter/rahmeen/128.jpg'
    )
    expect(avatarNode).toHaveAttribute('width', '30px')
    expect(avatarNode).toHaveAttribute('height', '30px')
  })
})
