
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodoFromSocket, deleteTodo, updateTodo } from "../features/todoSlice";
import { getSocketInstance, initializeSocket } from "../socket/socket";
// import { fetchTodos } from "../features";

const useTodoSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initializeSocket(); 
    const socket = getSocketInstance();

    socket.on("todoAdded", (todos) => dispatch(addTodoFromSocket(todos)));
    socket.on("todoDeleted", (id) => dispatch(deleteTodo(id)));
    socket.on("todoUpdated", (todo) => dispatch(updateTodo(todo)),
  );

    return () => {
      socket.off("todoAdded");
      socket.off("todoDeleted");
      socket.off("todoUpdated");
    };
  }, [dispatch]);
};

export default useTodoSocket;
