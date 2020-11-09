import React from 'react'
import userEvent from '@testing-library/user-event'
import { auth, provider, db } from 'firebaseSetting'
import 'firebase/auth'
import 'firebase/firestore'

import { render } from 'test-utils'

import Friend from 'components/Friend'

describe('<Friend /> Unit Tests', () => {
  const mockFriend = {
    uid: 'abc123',
    displayName: 'John',
    photoURL:
      'https://s3.amazonaws.com/uifaces/faces/twitter/baliomega/128.jpg',
  }

  const mockUser = {
    uid: 'avnsui',
    displayName: 'Gary',
    photoURL:
      'https://s3.amazonaws.com/uifaces/faces/twitter/mikaeljorhult/128.jpg',
  }

  it('should show avatar and friend name', async () => {
    const { findByText, getByRole } = render(
      <Friend friend={mockFriend} user={mockUser} />
    )

    expect(await findByText(/John/i)).toBeInTheDocument()

    const avatarNode = getByRole('img')

    expect(avatarNode).toHaveAttribute(
      'src',
      'https://s3.amazonaws.com/uifaces/faces/twitter/baliomega/128.jpg'
    )
    expect(avatarNode).toHaveAttribute('width', '40px')
    expect(avatarNode).toHaveAttribute('height', '40px')
  })

  // it('should manipulate firestore db when click avatar', () => {
  //   const { findByText, getByRole, debug } = render(
  //     <Friend friend={mockFriend} user={mockUser} />
  //   )

  //   const avatarNode = getByRole('img')

  //   userEvent.click(avatarNode)
  //   console.log('db', db.collection)
  //   expect(db.collection).toHaveBeenCalled()
  // })
})
