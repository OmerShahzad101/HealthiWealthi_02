import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    coachList: []
}

export const coachFiltersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCoachesList: (state, action) => {
            state.coachList = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCoachesList } = coachFiltersSlice.actions

export default coachFiltersSlice.reducer