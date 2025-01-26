import { Pen } from "lucide-react";
import { Trash } from "lucide-react";

const TodoList = ({ todos, handleUpdateTodo, handleDeleteTodo, filterCompleted }) => {
  // Filter tasks if displaying completed tasks
  const filteredTodos = filterCompleted
    ? todos.filter((todo) => todo.completed)
    : todos.filter((todo) => !todo.completed);

  return (
    <ul className="w-full max-w-3xl space-y-4">
      {filteredTodos.map((todo) => (
        <li
          key={todo._id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex-1 md:mr-4">
            <span
              onClick={() => handleUpdateTodo(todo)}
              className={`cursor-pointer text-xl md:text-2xl font-semibold ${
                todo.completed ? "line-through text-gray-500" : "text-gray-300"
              }`}
            >
              {todo.title}
            </span>

            <p className="text-sm text-gray-500 mt-1">
              Created by {todo.createdBy.username} on{" "}
              {new Date(todo.createdAt).toLocaleDateString()}
            </p>

            {todo.completed && todo.updatedBy && (
              <div className="text-sm text-gray-500 mt-1">
                <p>
                  Task completed by {todo.updatedBy.username} on{" "}
                  {new Date(todo.updatedAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {!todo.completed && (
              <p className="text-sm text-gray-500 mt-1">
                Task not completed yet.
              </p>
            )}
          </div>

          {/* Action buttons container */}
          <div className="flex items-center mt-2 md:mt-0 justify-center md:justify-start">
           

            {/* Delete button (always visible and centered on small screens) */}
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
