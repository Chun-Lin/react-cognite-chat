import { configureStore } from '@reduxjs/toolkit'

import userReducer from 'redux/user/userRedux'

export default configureStore({
  reducer: {
    user: userReducer,
  },
})
