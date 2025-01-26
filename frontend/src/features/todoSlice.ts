// features/todosSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "./todoAsyncThunks"; // Import async thunks
import { updateTodoAsync, deleteTodoAsync } from "./todoAsyncThunks"; // Async actions

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodoFromSocket: (state, action) => {
      console.log(action.payload,)
      state.push(action.payload); // Add a new todo from socket
    },
    deleteTodo: (state, action) => {
      const todoId = action.payload;
      return state.filter((todo) => todo._id !== todoId); // Remove deleted todo
    },
    updateTodo: (state, action) => {
      const updatedTodo = action.payload;
      
      const index = state.findIndex((todo) => todo._id === updatedTodo._id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedTodo }; // Update existing todo
      }
    },
  },

  // Add cases for the async thunks
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        return state.filter((todo) => todo._id !== action.payload);
      });
  },
});

export const { addTodoFromSocket, deleteTodo, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;
