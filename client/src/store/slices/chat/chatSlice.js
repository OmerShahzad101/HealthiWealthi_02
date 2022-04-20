import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    recieverId : null,
    recieverName: null,
    conversationId: null,
    messages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatWindow: (state, action) => {
            state.recieverId = action.payload.id
            state.recieverName = action.payload.name
            state.conversationId = action.payload.conversationId
            state.messages = action.payload.messages
        },
    },
})

// Action creators are generated for each case reducer function
export const { setChatWindow } = chatSlice.actions

export default chatSlice.reducer