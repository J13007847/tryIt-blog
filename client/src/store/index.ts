import {configureStore} from '@reduxjs/toolkit'
import userSlice from './reducer/user'
export default configureStore({
  reducer:{
    user:userSlice,
  }
})