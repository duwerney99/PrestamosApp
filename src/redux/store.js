import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
            immutableCheck: false,
        }),
    devTools: true,
})

export default store
