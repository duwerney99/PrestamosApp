import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'
import productReducer from './productReducer'
import invoiceReducer from './invoiceReducer'
import coleccionReducer from './coleccionReducer'

const reducers = combineReducers({ productReducer, auth, invoiceReducer, coleccionReducer })

export default reducers
