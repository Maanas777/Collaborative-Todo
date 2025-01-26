
import { useSelector } from "react-redux";

const UserNameDisplay = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className="text-sm sm:text-lg font-bold bg-gradient-to-r from-purple-800 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-md max-w-[70%] sm:max-w-full truncate">
      {user ? `Hello, ${user.username}` : "Loading..."}
    </div>
  );
};

export default UserNameDisplay;
