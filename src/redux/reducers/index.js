import { combineReducers } from '@reduxjs/toolkit'
import auth from './authReducer'
import  liquidReduce  from './liquidReduce'

const reducers = combineReducers({ auth, liquidReduce })


export default reducers
  