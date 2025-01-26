// features/todoAsyncThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todo.api";

// Fetch Todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await getTodos();

  return response.data;
});

// Add Todo
export const addTodoAsync = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await addTodo(todo);
  return response.data;
});

// Update Todo
export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodo",
  async (todo) => {
    console.log(todo,"this is before ")
    const response = await updateTodo(todo._id, todo);
    console.log(response,"this is after ")
    return response.data;
  }
);

// Delete Todo
export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodo",
  async (id) => {
    await deleteTodo(id);
    return id;
  }
);
