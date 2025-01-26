import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todoSlice";
import userReducer from '../features/userSlice'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        user:userReducer
    },
});
