import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showLogin: true,
  showMenu: false,
  showCommandList: false,
  showUserList: false,
  showProductList: false,
  showDeliveryMenList: false,
  showAddCommand: false,
  showAddDeliveryMen: false,
  showAddProducts: false,
  showAddUsers: false,
  add: false,
  update: false,
  objectToUpdate: {},
}

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    goLogin: (state) => {
      state.showLogin = true
    },
    goMenu: (state) => {
        state.showMenu = true
    },
    goCommandList: (state) => {
        state.showCommandList = true
    },
    goProductList: (state) => {
        state.showProductList = true
    },
    goUserList: (state) => {
      state.showUserList = true
    },
    goDeliveryMenList: (state) => {
        state.showDeliveryMenList = true
    },
    goAddCommand: (state) => {
      state.showAddCommand = true
    },
    goAddDeliveryMen: (state) => {
      state.showAddDeliveryMen = true
    },
    goAddProducts: (state) => {
      state.showAddProducts = true
    },
    goAddUsers: (state) => {
      state.showAddUsers = true
    },
    wantToAdd: (state) => {
      state.add = true
      state.update = false
    },
    wantToUpdate: (state) => {
      state.add = false
      state.update = true
    },
    setObjectToUpdate: (state, action) => {
      state.objectToUpdate = action.payload
    },
    reset: (state) => {
        state.showLogin = false
        state.showMenu = false
        state.showCommandList = false
        state.showProductList = false
        state.showUserList = false
        state.showDeliveryMenList = false
        state.showAddCommand = false
        state.showAddDeliveryMen = false
        state.showAddProducts = false
        state.showAddUsers = false
        state.add = false
        state.update = false
    },
  },
})

export const { goLogin, goMenu, goCommandList, goProductList, goUserList, goDeliveryMenList, goAddCommand, goAddDeliveryMen, goAddProducts, goAddUsers ,wantToAdd, wantToUpdate, setObjectToUpdate, reset } = viewSlice.actions

export default viewSlice.reducer