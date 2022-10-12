import { configureStore } from "@reduxjs/toolkit";
import reducer from './../features/countrySlice.ts'


export const store = configureStore({
    reducer: {
        countryInfo: reducer,
       
    
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false,
          })
})