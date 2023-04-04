/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState: {
		sidebar: false
	},
	reducers: {
		openSidebar(state, action) {
			state.sidebar = true
		},
		closeSidebar(state, action) {
			state.sidebar = false
		}
	}
})

// The function(s) below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSidebar = (state) => state.sidebar

export const { openSidebar, closeSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer
