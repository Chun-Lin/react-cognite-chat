import React, { useEffect } from 'react'

import './App.css'
import Messenger from 'containers/Messenger/Messenger'
import Login from 'components/Login'
import { auth } from 'firebaseSetting'
import { login, logout, selectUser } from 'redux/user/userRedux'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged(({ uid, photoURL, email, displayName }) => {
      console.log('uid', uid)
      console.log('photo', photoURL)
      if (uid) {
        dispatch(
          login({
            uid,
            photoURL,
            email,
            displayName,
          })
        )
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return <div className="App">{user ? <Messenger /> : <Login />}</div>
}

export default App
