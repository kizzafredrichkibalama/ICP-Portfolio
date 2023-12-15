import { configureStore } from "@reduxjs/toolkit";
import plugReducer from "./features/plugSlice"
import infoReducer from "./features/infoSlice"
export const store = configureStore({
    reducer:{
        plug: plugReducer,
        info: infoReducer
    }
})
