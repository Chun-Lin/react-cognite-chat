import React from 'react'
import userEvent from '@testing-library/user-event'

import { auth } from 'firebaseSetting'
import { render } from 'test-utils'

import LogoutModal from 'components/modals/LogoutModal'

describe('<LogoutModal /> integration Tests', () => {
  it('should show <LogoutModal /> correctly', async () => {
    const onClose = jest.fn()
    const { findByText, rerender } = render(<LogoutModal onClose={onClose} />)

    const signOutBtn = await findByText(/Yes/i)
    const cancelBtn = await findByText(/No/i)
    expect(signOutBtn).toBeInTheDocument()
    expect(cancelBtn).toBeInTheDocument()
    expect(await findByText(/Want to Logout?/i)).toBeInTheDocument()

    userEvent.click(cancelBtn)
    expect(onClose).toHaveBeenCalledTimes(1)

    rerender(<LogoutModal onClose={onClose} />)
    userEvent.click(signOutBtn)
    expect(onClose).toHaveBeenCalledTimes(2)
    expect(auth.signOut).toHaveBeenCalledTimes(1)
  })
})
