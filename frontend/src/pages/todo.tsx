import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/todoAsyncThunks";
import useTodoSocket from "../hooks/useTodoSocket";
import { handleAddTodo, handleUpdateTodo, handleDeleteTodo } from "../utils/todoHandlers";
import InputBox from "../components/inputBox";
import TodoList from "../components/todoList";
import LogoutButton from "../components/logoutButton";
import { decodeJwt } from "../utils/jwtUtils";
import { fetchUserById } from "../features/userSlice";
import UserNameDisplay from "../components/userName";

const TodoApp = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [todos]);

  const [newTodo, setNewTodo] = useState("");

  useTodoSocket();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const decoded = decodeJwt(token);
    if (decoded && decoded.userId) {
      dispatch(fetchUserById(decoded.userId));
    }

    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 flex flex-col items-center p-4 md:p-6">
      <div className="w-full flex flex-col items-center mb-4">
        <UserNameDisplay  />
        <LogoutButton />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Your Todo List</h1>
      <div className="w-full flex flex-col items-center gap-4 mb-6">
        <InputBox
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleAddTodo={() => handleAddTodo(newTodo, dispatch, setNewTodo)}
        />
      </div>
      <TodoList
        todos={sortedTodos}
        handleUpdateTodo={(todo) => handleUpdateTodo(todo, dispatch)}
        handleDeleteTodo={(id) => handleDeleteTodo(id, dispatch)}
      />
    </div>
  );
};

export default TodoApp;
