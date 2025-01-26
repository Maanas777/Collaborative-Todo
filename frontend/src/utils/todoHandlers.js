import { addTodoAsync, updateTodoAsync, deleteTodoAsync } from "../features/todoAsyncThunks";
import { decodeJwt } from "./jwtUtils";

// Function to handle adding a todo
export const handleAddTodo = (newTodo, dispatch, setNewTodo) => {
  const token = localStorage.getItem('authToken');
  let userInfo = decodeJwt(token);
  let id = userInfo.userId;

  if (newTodo.trim()) {
    dispatch(
      addTodoAsync({ title: newTodo, user_id: id })
    );
    setNewTodo(""); // Reset the newTodo input field
  }
};

// Function to handle updating a todo
export const handleUpdateTodo = (todo, dispatch) => {
  const token = localStorage.getItem('authToken');
  let userInfo = decodeJwt(token);
  let userId = userInfo.userId;

  dispatch(updateTodoAsync({ ...todo, completed: !todo.completed, updatedBy: userId }));
};

// Function to handle deleting a todo
export const handleDeleteTodo = (id, dispatch) => {
  dispatch(deleteTodoAsync(id));
};
