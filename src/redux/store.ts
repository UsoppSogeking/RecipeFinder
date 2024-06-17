import { configureStore } from "@reduxjs/toolkit";
import placeholderReducer from "./placeholderReducer";

const store = configureStore({
    reducer: {
        placeholder: placeholderReducer,
    }
});

export default store;