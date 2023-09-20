import { addListInvoice } from '@redux/actions/invoiceActions'
import { invoice } from '@redux/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    facturas: [],
    errorMessage: null,
    loading: false,
}

const invoiceReducer = createSlice({
    name: invoice,
    initialState,
    reducers: {
        saveInvoice: (state, { payload }) => {
            if (state.facturas.some(invoiceExist => invoiceExist.numeroFactura !== payload.numeroFactura)) state.facturas.push(payload)
        },
        editInvoice: (state, { payload }) => {
            state.facturas.map((invoiceExist, index) => {
                if (invoiceExist.numeroFactura === payload.numeroFactura) state.facturas[index] = payload;
            });
        },
        clearErrorMessage: (state) => {
            state.errorMessage = initialState.errorMessage
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addListInvoice.fulfilled, (state, { payload }) => {
            payload.forEach((invoiceReceived) => {
                if (!state.facturas.some(invoiceExist => invoiceExist.numeroFactura === invoiceReceived.numeroFactura)) state.facturas.push(invoiceReceived)
            });
            state.loading = !state.loading
            state.errorMessage = initialState.errorMessage
        })
    },
})

export const { clearErrorMessage, saveInvoice: saveInvoice, editInvoice: editInvoice } = invoiceReducer.actions

export default invoiceReducer.reducer
