import { signInWithEmail, signOut } from '@firebase/services/auth'
import { auth } from '@redux/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const loginFirebase = createAsyncThunk(`${auth}/login`, async (data, { rejectWithValue }) => {
    try {
        const { email, uid } = await signInWithEmail(data.email, data.password)
        return { email, uid }
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})

export const logoutFirebase = createAsyncThunk(`${auth}/logout`, async (_data, { rejectWithValue }) => {
    try {
        await signOut()
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})
