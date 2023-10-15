import { createAsyncThunk } from '@reduxjs/toolkit'

export const crearReferencia = createAsyncThunk(`/crearReferencia`, async (data, { rejectWithValue }) => {
    try {
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})

export const agregarReferencia = createAsyncThunk(`/listaReferencia`, async (data, { rejectWithValue }) => {
    try {
        return data;
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})
