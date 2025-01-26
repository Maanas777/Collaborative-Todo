import { useSelector } from "react-redux";

const UserNameDisplay = () => {
  // Access the user state from Redux
  const user = useSelector((state) => state.user.user);

  return (
    <div className="absolute left-4 top-4 text-sm sm:text-lg font-bold bg-gradient-to-r from-purple-800 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md max-w-[70%] truncate">
      {user ? `Hello, ${user.username}` : "Loading..."}
    </div>
  );
};

export default UserNameDisplay;
