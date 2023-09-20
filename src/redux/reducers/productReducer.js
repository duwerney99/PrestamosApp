import { addListProduct } from '@redux/actions/productActions'
import { product } from '@redux/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productos: [],
    errorMessage: null,
    loading: false,
}

const productReducer = createSlice({
    name: product,
    initialState,
    reducers: {
        saveProduct: (state, { payload }) => {
            if (state.productos.some(productExist => productExist.codigo !== payload.codigo)) state.productos.push(payload)
        },
        editProduct: (state, { payload }) => {
            state.productos.map((productExist, index) => {
                if (productExist.codigo === payload.codigo) state.productos[index] = payload;
            });
        },
        clearErrorMessage: (state) => {
            state.errorMessage = initialState.errorMessage
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addListProduct.fulfilled, (state, { payload }) => {
            payload.forEach((productReceived) => {
                if (!state.productos.some(productExist => productExist.codigo === productReceived.codigo)) state.productos.push(productReceived)
            });
            state.loading = !state.loading
            state.errorMessage = initialState.errorMessage
        })
    },
})

export const { clearErrorMessage, saveProduct, editProduct } = productReducer.actions

export default productReducer.reducer
