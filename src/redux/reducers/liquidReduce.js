import { liquidReduce } from '@redux/types'
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    liquidReduce: [],
    errorMessage: null,
    loading: false,
}


const liquidReducers = createSlice({
    name: liquidReduce,
    initialState,
    reducers: {
        saveLiqui: (state, { payload }) => {
            
            const existingClientIndex = state.liquidReduce.findIndex(item => item.codigoCliente === payload.codigoCliente);
            
            if (existingClientIndex !== -1) {
                state.liquidReduce[existingClientIndex] = payload;
                console.log(state.liquidReduce[existingClientIndex] = payload)
            } else {
                state.liquidReduce.push(payload);
            }
        }
    },
    
})

export const { saveLiqui } = liquidReducers.actions

export default liquidReducers.reducer

