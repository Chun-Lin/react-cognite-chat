import React from 'react'
import styled from 'styled-components'

import { auth, provider } from 'firebaseSetting'
import Button from 'components/shared/Button'

const LoginPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const Login = () => {
  const signIn = () => {
    auth.signInWithRedirect(provider)
  }

  return (
    <LoginPageContainer>
      <img
        width="50%"
        height="50%"
        src="https://www.cognite.com/hubfs/CogniteLogo_black.svg"
        alt="cognite"
      />
      <Button
        width="50%"
        height="30px"
        backgroundColor="#FF6918"
        border="none"
        borderRadius="100px"
        onClick={signIn}
      >
        Login with Google
      </Button>
    </LoginPageContainer>
  )
}

export default Login
