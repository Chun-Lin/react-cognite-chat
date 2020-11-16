import { createSlice } from '@reduxjs/toolkit'

export const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState: {
    chatroom: null,
    messages: [],
  },
  reducers: {
    join: (state, action) => {
      state.chatroom = action.payload
    },
    exit: state => {
      state.chatroom = null
    },
    saveMessage: (state, action) => {
      const { chatroomId } = action.payload

      const index = state.messages.findIndex(
        messageItem => messageItem.chatroomId === chatroomId
      )

      const newMessages = state.messages.map((item, idx) => {
        if (idx === index) return action.payload

        return item
      })

      if (index >= 0) {
        state.messages = newMessages
      } else {
        state.messages = [...state.messages, action.payload]
      }
    },
  },
})

export const { join, exit, saveMessage } = chatroomSlice.actions

export const selectChatroom = state => state.chatroom.chatroom
export const cacheMessages = state => state.chatroom.messages

export default chatroomSlice.reducer
