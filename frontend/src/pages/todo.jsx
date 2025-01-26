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
  const [activeTab, setActiveTab] = useState("pending"); // Track the active tab (pending or completed)

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
      <div className="w-full flex justify-between items-center mb-4 px-4">
        <UserNameDisplay />
        <LogoutButton />
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center"> Todos </h1>

     
    

      <div className="w-full flex flex-col items-center gap-4 mb-6">
        <InputBox
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleAddTodo={() => handleAddTodo(newTodo, dispatch, setNewTodo)}
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          className={`${
            activeTab === "pending" ? " bg-gradient-to-r from-purple-800 to-indigo-600" : "bg-gray-600"
          } text-white py-2 px-4 rounded-lg`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`${
            activeTab === "completed" ? " bg-gradient-to-r from-purple-800 to-indigo-600" : "bg-gray-600"
          } text-white py-2 px-4 rounded-lg`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
      </div>

   
      {activeTab === "pending" && (
        <TodoList
          todos={sortedTodos}
          handleUpdateTodo={(todo) => handleUpdateTodo(todo, dispatch)}
          handleDeleteTodo={(id) => handleDeleteTodo(id, dispatch)}
          filterCompleted={false}
        />
      )}

      {activeTab === "completed" && (
        <TodoList
          todos={sortedTodos}
          handleUpdateTodo={(todo) => handleUpdateTodo(todo, dispatch)}
          handleDeleteTodo={(id) => handleDeleteTodo(id, dispatch)}
          filterCompleted={true}
        />
      )}
    </div>
  );
};

export default TodoApp;
