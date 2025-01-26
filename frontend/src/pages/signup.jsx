import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.Api";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState(""); 
  const [isSuccess, setIsSuccess] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Live validation for password matching
    if (name === "confirmPassword" || name === "password") {
      if (formData.password !== value && name === "confirmPassword") {
        setPasswordError("Passwords do not match!");
      } else if (name === "password" && value !== formData.confirmPassword) {
        setPasswordError("Passwords do not match!");
      } else {
        setPasswordError(""); 
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      return; 
    }

    setLoading(true);
    try {
      const response = await registerUser(formData);
      setMessage(response.message);
      setIsSuccess(true); 
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
      setIsSuccess(false); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-200 flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-md bg-gradient-to-b from-gray-800 via-gray-700 to-black text-gray-200 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-gray-200"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900 text-gray-200"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-2">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-bold transition-all cursor-pointer ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"} ${loading ? "opacity-50" : ""}`}
            disabled={loading || passwordError}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {message && (
          <p
            className={`text-sm mt-4 text-center ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
