import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodoFromSocket, deleteTodo, updateTodo } from "../features/todoSlice"; 
import { getSocketInstance, initializeSocket } from "../socket/socket"; 

const useTodoSocket = () => {
  const dispatch = useDispatch(); // Dispatch action to Redux store

  useEffect(() => {
    // Initialize the socket connection when the component mounts
    initializeSocket();
    const socket = getSocketInstance(); // Get the socket instance

    // Set up socket event listeners for real-time updates
    socket.on("todoAdded", (todos) => dispatch(addTodoFromSocket(todos))); // Listen for new todo being added
    socket.on("todoDeleted", (id) => dispatch(deleteTodo(id))); // Listen for a todo being deleted
    socket.on("todoUpdated", (todo) => dispatch(updateTodo(todo))); // Listen for a todo being updated

    
    return () => {
      socket.off("todoAdded"); // Remove listener for "todoAdded"
      socket.off("todoDeleted"); // Remove listener for "todoDeleted"
      socket.off("todoUpdated"); // Remove listener for "todoUpdated"
    };
  }, [dispatch]); // Re-run effect when dispatch changes (though it should not change)

};

export default useTodoSocket;
