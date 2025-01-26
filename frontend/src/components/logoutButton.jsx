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
      className="cursor-pointer bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700 text-white px-5 py-3 rounded-lg shadow-lg text-base sm:text-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
