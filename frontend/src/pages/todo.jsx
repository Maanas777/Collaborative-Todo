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
  // Setting up Redux hooks
  const dispatch = useDispatch(); // Dispatch action to Redux store
  const todos = useSelector((state) => state.todos); // Get todos from the Redux store

  // Sorting todos based on the createdAt timestamp
  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [todos]); // Re-run sorting when the 'todos' array changes

  // Local state for handling the new todo input and active tab (pending/completed)
  const [newTodo, setNewTodo] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  // Custom hook for socket management
  useTodoSocket();

  // Effect hook to fetch the user and todos when the component mounts
  useEffect(() => {
    // Get the auth token from localStorage and decode it to extract user information
    const token = localStorage.getItem("authToken");
    const decoded = decodeJwt(token);

    // If the token is valid, dispatch action to fetch user details
    if (decoded && decoded.userId) {
      dispatch(fetchUserById(decoded.userId));
    }

    // Fetch the todos from the backend when the component is first rendered
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 flex flex-col items-center p-4 md:p-6">
      {/* Header section with username display and logout button */}
      <div className="w-full flex justify-between items-center mb-4 px-4">
        <UserNameDisplay />
        <LogoutButton />
      </div>

      {/* Main title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center"> Todos </h1>

      {/* Input box to add a new todo */}
      <div className="w-full flex flex-col items-center gap-4 mb-6">
        <InputBox
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleAddTodo={() => handleAddTodo(newTodo, dispatch, setNewTodo)} // Handle adding a new todo
        />
      </div>

      {/* Tab buttons to filter between "Pending" and "Completed" todos */}
      <div className="flex gap-4 mb-6">
        <button
          className={`${
            activeTab === "pending" ? " bg-gradient-to-r from-purple-800 to-indigo-600" : "bg-gray-600 cursor-pointer"
          } text-white py-2 px-4 rounded-lg `}
          onClick={() => setActiveTab("pending")} // Set active tab to "pending"
        >
          Pending
        </button>
        <button
          className={`${
            activeTab === "completed" ? " bg-gradient-to-r from-purple-800 to-indigo-600" : "bg-gray-600"
          } text-white py-2 px-4 rounded-lg cursor-pointer`}
          onClick={() => setActiveTab("completed")} // Set active tab to "completed"
        >
          Completed
        </button>
      </div>

      {/* Displaying the todo list based on active tab (pending/completed) */}
      {activeTab === "pending" && (
        <TodoList
          todos={sortedTodos} // Pass sorted todos to the TodoList component
          handleUpdateTodo={(todo) => handleUpdateTodo(todo, dispatch)} // Handle updating a todo
          handleDeleteTodo={(id) => handleDeleteTodo(id, dispatch)} // Handle deleting a todo
          filterCompleted={false} // Filter todos that are not completed
        />
      )}

      {activeTab === "completed" && (
        <TodoList
          todos={sortedTodos} // Pass sorted todos to the TodoList component
          handleUpdateTodo={(todo) => handleUpdateTodo(todo, dispatch)} // Handle updating a todo
          handleDeleteTodo={(id) => handleDeleteTodo(id, dispatch)} // Handle deleting a todo
          filterCompleted={true} // Filter todos that are completed
        />
      )}
    </div>
  );
};

export default TodoApp;
