import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import sidebarSlice from './slices/sidebarSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		sidebar: sidebarSlice,
		user: userSlice
	}
})

export default store
