import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: {},
  isLogoutVisible: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload
    },
    showLogout: (state) => {
      state.isLogoutVisible = true
    },
    hideLogout: (state) => {
      state.isLogoutVisible = false
    },
  },
})

export const { setAdmin, showLogout, hideLogout } = loginSlice.actions

export default loginSlice.reducer