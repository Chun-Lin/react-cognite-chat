import React from 'react'

import { render } from 'test-utils'
import Message from 'components/Message'

test('Display correct avatar and message', async () => {
  const { findByText, getByRole } = render(
    <Message
      message="apple"
      photoURL="https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg"
      senderMsg={true}
    />
  )

  expect(await findByText(/apple/i)).toBeInTheDocument()

  const avatarNode = getByRole('img')

  expect(avatarNode).toHaveAttribute(
    'src',
    'https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg'
  )
})

test('check flex order of Avatar and message', () => {
  const { getByRole, rerender } = render(
    <Message
      message="apple"
      photoURL="https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg"
      senderMsg={true}
    />
  )

  const avatarNode = getByRole('img')
  expect(avatarNode).toHaveStyle('order: 1')

  rerender(
    <Message
      message="apple"
      photoURL="https://s3.amazonaws.com/uifaces/faces/twitter/josevnclch/128.jpg"
      senderMsg={false}
    />
  )

  expect(avatarNode).toHaveStyle('order: 0')
})
