import { createAsyncThunk } from '@reduxjs/toolkit'

export const crearColeccion = createAsyncThunk(`/crearColeccion`, async (data, { rejectWithValue }) => {
    try {
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})

export const agregarColeccion = createAsyncThunk(`/listaColeccion`, async (data, { rejectWithValue }) => {
    try {
        return data;
    } catch (error) {
        return rejectWithValue({ error: error.message })
    }
})
