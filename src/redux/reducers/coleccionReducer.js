import { agregarColeccion } from '@redux/actions/coleccionActions'
import { colecciones } from '@redux/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    colecciones: [],
    errorMessage: null,
    loading: false,
}

const coleccionReducer = createSlice({
    name: colecciones,
    initialState,
    reducers: {
        guardarColeccion: (state, { payload }) => {
            if (state.colecciones.some(existeColeccion => existeColeccion.codigo !== payload.codigo)) state.colecciones.push(payload)
        },
        editarColeccion: (state, { payload }) => {
            state.colecciones.map((existeColeccion, index) => {
                if (existeColeccion.codigo === payload.codigo) state.colecciones[index] = payload;
            });
        },
        clearErrorMessage: (state) => {
            state.errorMessage = initialState.errorMessage
        },
    },
    extraReducers: (builder) => {
        builder.addCase(agregarColeccion.fulfilled, (state, { payload }) => {
            payload.forEach((coleccionRecibida) => {
                if (!state.colecciones.some(existeColeccion => existeColeccion.codigo === coleccionRecibida.codigo)) state.colecciones.push(coleccionRecibida)
            });
            state.loading = !state.loading
            state.errorMessage = initialState.errorMessage
        })
    },
})

export const { clearErrorMessage, guardarColeccion, editarColeccion } = coleccionReducer.actions

export default coleccionReducer.reducer
