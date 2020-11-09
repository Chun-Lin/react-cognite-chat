import { combineReducers } from '@reduxjs/toolkit'

import userReducer from 'redux/user/userRedux'
import chatroomReducer from 'redux/chatroom/chatroomRedux'

const rootReducer = combineReducers({
  user: userReducer,
  chatroom: chatroomReducer,
})

export default rootReducer
