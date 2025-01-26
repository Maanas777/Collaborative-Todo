import { logoutUser } from "../api/auth.Api";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("authToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-gradient-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-base transition-all"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
