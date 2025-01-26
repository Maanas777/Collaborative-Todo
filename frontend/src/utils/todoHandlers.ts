import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { SetStateAction } from "react";
import { decodeJwt } from "./jwtUtils";
import { addTodoAsync, updateTodoAsync, deleteTodoAsync } from "../features/todoAsyncThunks";


export const handleAddTodo = (newTodo: string, dispatch: Dispatch<UnknownAction>, setNewTodo: { (value: SetStateAction<string>): void; (arg0: string): void; }) => {

  const token=localStorage.getItem('authToken')

let userInfo= decodeJwt(token)
let id=userInfo.userId


    if (newTodo.trim()) {
      dispatch(
        addTodoAsync({ title: newTodo, user_id: id })
      );
      setNewTodo("");
    }
  };
  
 export const handleUpdateTodo = (todo: { completed: any; _id: string }, dispatch: Dispatch<UnknownAction>) => {
  const token = localStorage.getItem('authToken');
  let userInfo = decodeJwt(token);
  let userId = userInfo.userId;

  dispatch(updateTodoAsync({ ...todo, completed: !todo.completed, updatedBy: userId }));
};

  
  export const handleDeleteTodo = (id: any, dispatch: Dispatch<UnknownAction>) => {
    dispatch(deleteTodoAsync(id));
  };
  