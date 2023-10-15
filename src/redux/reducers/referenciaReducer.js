import { agregarReferencia } from '@redux/actions/referenciaActions'
import { referencias } from '@redux/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    referencias: [],
    errorMessage: null,
    loading: false,
}

const referenciaReducer = createSlice({
    name: referencias,
    initialState,
    reducers: {
        guardarReferencia: (state, { payload }) => {
            if (state.referencias.some(existeReferencia => existeReferencia.codigo !== payload.codigo)) state.referencias.push(payload)
        },
        editarReferencia: (state, { payload }) => {
            state.referencias.map((existeReferencia, index) => {
                if (existeReferencia.codigo === payload.codigo) state.referencias[index] = payload;
            });
        },
        clearErrorMessage: (state) => {
            state.errorMessage = initialState.errorMessage
        },
    },
    extraReducers: (builder) => {
        builder.addCase(agregarReferencia.fulfilled, (state, { payload }) => {
            payload.forEach((referenciaRecibida) => {
                if (!state.referencias.some(existeReferencia => existeReferencia.codigo === referenciaRecibida.codigo)) state.referencias.push(referenciaRecibida)
            });
            state.loading = !state.loading
            state.errorMessage = initialState.errorMessage
        })
    },
})

export const { clearErrorMessage, guardarReferencia, editarReferencia } = referenciaReducer.actions

export default referenciaReducer.reducer
