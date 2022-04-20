import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    receiverId: null,
    receiverName: null,
    messages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatWindow: (state, action) => {
            state.receiverId = action.payload.id
            state.receiverName = action.payload.name
        },
    },
})

// Action creators are generated for each case reducer function
export const { setChatWindow } = chatSlice.actions

export default chatSlice.reducer