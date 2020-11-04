import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterRedux'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})
