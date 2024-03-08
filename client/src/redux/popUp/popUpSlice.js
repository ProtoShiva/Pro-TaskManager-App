import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  showCheckPopup: false,
  showLogPopup: false
}

export const popUpSlice = createSlice({
  name: "Popup",
  initialState,
  reducers: {
    setShowCheckPopup: (state, action) => {
      state.showCheckPopup = action.payload
    },
    setShowLogPopup: (state, action) => {
      state.showLogPopup = action.payload
    }
  }
})

export const { setShowCheckPopup, setShowLogPopup } = popUpSlice.actions

export default popUpSlice.reducer
