import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  admin: {},
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload
    },
  },
})

export const { setAdmin } = loginSlice.actions

export default loginSlice.reducer