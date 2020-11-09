import React from 'react'
import userEvent from '@testing-library/user-event'
import { auth, provider } from 'firebaseSetting'
import 'firebase/auth'
import 'firebase/firestore'

import { render } from 'test-utils'
import Login from 'components/Login'
import App from 'App'

describe('Test whether the display page is login page or messenger page', () => {
  // firebase.auth.mockImplementation(() => new firebase.auth.Auth())
  it('should display login page and called relevant signin apis', async () => {
    const { findByText } = render(<Login />)

    expect(await findByText(/Login with Google/i)).toBeInTheDocument()

    userEvent.click(await findByText(/Login with Google/i))
    expect(auth.signInWithRedirect).toBeCalledTimes(1)
    expect(auth.signInWithRedirect).toBeCalledWith(provider)
  })

  it('should call onAuthStateChanged api when login', async () => {
    const { findByText } = render(<App />)

    expect(await findByText(/Login with Google/i)).toBeInTheDocument()
    expect(auth.onAuthStateChanged).toBeCalledTimes(1)
  })
})
