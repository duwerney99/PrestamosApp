import { loginFirebase, logoutFirebase } from '@redux/actions/authActions'
import { auth } from '@redux/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        email: null,
        uid: null,
    },
    errorMessage: null,
    loading: false,
}

const authReducer = createSlice({
    name: auth,
    initialState,
    reducers: {
        saveUser: (state, { payload }) => {
            state.user = { email: payload.email, uid: payload.uid }
        },
        clearErrorMessage: (state) => {
            state.errorMessage = initialState.errorMessage
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginFirebase.pending, (state) => {
            state.loading = !state.loading
            state.errorMessage = initialState.errorMessage
        })
        builder.addCase(loginFirebase.rejected, (state, { payload }) => {
            state.errorMessage = payload.error
            state.loading = !state.loading
        })
        builder.addCase(loginFirebase.fulfilled, (state, { payload }) => {
            state.user = { email: payload.email, uid: payload.uid }
            state.photo = payload.photo
            state.loading = !state.loading
        })
        builder.addCase(logoutFirebase.pending, (state) => {
            state.loading = !state.loading
            state.errorMessage = initialState.errorMessage
        })
        builder.addCase(logoutFirebase.rejected, (state, { payload }) => {
            state.errorMessage = payload.error
            state.loading = !state.loading
        })
        builder.addCase(logoutFirebase.fulfilled, (state, { payload }) => {
            state.user = { email: initialState.user.email, uid: initialState.user.uid }
            state.loading = !state.loading
        })
    },
})

export const { clearErrorMessage, saveUser } = authReducer.actions

export default authReducer.reducer
