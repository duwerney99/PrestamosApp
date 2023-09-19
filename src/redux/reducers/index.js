import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'
import productReducer from './productReducer'
import invoiceReducer from './invoiceReducer'

const reducers = combineReducers({ productReducer, auth, invoiceReducer })

export default reducers
