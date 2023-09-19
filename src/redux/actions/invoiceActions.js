import { createAsyncThunk } from '@reduxjs/toolkit'

export const createInvoice = createAsyncThunk(`/createInvoice`, async (data, { rejectWithValue }) => {
    try {
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})

export const addListInvoice = createAsyncThunk(`/listInvoice`, async (data, { rejectWithValue }) => {
    try {
        return data;
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})
