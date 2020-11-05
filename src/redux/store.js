import { configureStore } from '@reduxjs/toolkit'

import userReducer from 'redux/user/userRedux'
import chatroomReducer from 'redux/chatroom/chatroomRedux'

export default configureStore({
  reducer: {
    user: userReducer,
    chatroom: chatroomReducer,
  },
})
