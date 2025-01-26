const InputBox = ({ newTodo, setNewTodo, handleAddTodo }) => {
  return (
    <div className="w-full max-w-lg flex items-center mb-6">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter a new todo..."
        className="w-full p-3 md:p-4 rounded-l-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-purple-500 border-none shadow-md"
      />
      <button
        onClick={handleAddTodo}
        className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-5 md:py-4 md:px-6 rounded-r-lg transition-all shadow-md"
      >
        Add Todo
      </button>
    </div>
  );
};

export default InputBox;
