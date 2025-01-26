import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/auth.Api";

const Login = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await loginUser(formData);
     let {token}=response
      console.log(token)
      localStorage.setItem("authToken", token);
      navigate("/"); 
    } catch (error) {
      console.log(error)
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 via-purple-600 to-purple-400 flex items-center justify-center">
      <div className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold transition-all cursor-pointer ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"} ${loading ? "opacity-50" : ""}`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              "Login"
            )}
          </button>
          {message && <p className="text-red-500 mt-4">{message}</p>}
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
