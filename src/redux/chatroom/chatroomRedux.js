import { createSlice } from '@reduxjs/toolkit'

export const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState: {
    chatroom: null,
  },
  reducers: {
    join: (state, action) => {
      state.chatroom = action.payload
    },
    exit: (state) => {
      state.chatroom = null
    },
  },
})

export const { join, exit } = chatroomSlice.actions

export const selectChatroom = (state) => state.chatroom.chatroom

export default chatroomSlice.reducer
