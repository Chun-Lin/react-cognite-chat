import React, { useEffect, lazy, Suspense } from 'react'

import './App.css'
import Login from 'components/Login'
import { auth, db } from 'firebaseSetting'
import { login, logout, selectUser } from 'redux/user/userRedux'
import { useDispatch, useSelector } from 'react-redux'

const Messenger = lazy(() => import('containers/Messenger/Messenger'))

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged(({ uid, photoURL, email, displayName }) => {
      if (uid) {
        dispatch(
          login({
            uid,
            photoURL,
            email,
            displayName,
          })
        )
        db.collection('users').doc(uid).set(
          {
            displayName,
            uid,
            photoURL,
            email,
          },
          { merge: true }
        )
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <div className="App">
      {user ? (
        <Suspense fallback={<div></div>}>
          <Messenger />
        </Suspense>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App
