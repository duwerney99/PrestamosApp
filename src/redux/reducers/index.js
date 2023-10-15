import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'
import productReducer from './productReducer'
import invoiceReducer from './invoiceReducer'
import coleccionReducer from './coleccionReducer'
import referenciaReducer from './referenciaReducer'

const reducers = combineReducers({ productReducer, auth, invoiceReducer, coleccionReducer, referenciaReducer })

export default reducers
