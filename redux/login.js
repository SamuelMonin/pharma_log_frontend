import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: {},
  token: ""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setAdmin, setToken } = loginSlice.actions

export default loginSlice.reducer