import { createAsyncThunk } from '@reduxjs/toolkit'

export const createProduct = createAsyncThunk(`/createProduct`, async (data, { rejectWithValue }) => {
    try {
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})

export const addListProduct = createAsyncThunk(`/listProduct`, async (data, { rejectWithValue }) => {
    try {
        return data;
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})
