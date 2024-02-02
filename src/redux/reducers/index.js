import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'

const reducers = combineReducers({ auth })

export default reducers
