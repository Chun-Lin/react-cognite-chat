// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'

jest.mock('firebase/app', () => {
  const initializeApp = jest.fn().mockReturnValue({})

  const auth = jest.fn().mockReturnValue({
    signInWithRedirect: jest.fn(),
    signInWithPopup: jest.fn(),
    onAuthStateChanged: jest.fn(),
    signOut: jest.fn(),
  })

  const firestore = jest.fn()

  auth.GoogleAuthProvider = jest.fn()

  return { auth, initializeApp, firestore }
})

afterEach(() => {
  jest.restoreAllMocks()
})
