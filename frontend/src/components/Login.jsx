import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import connection from "../config/connection.config";
import { useNavigate, NavLink } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [create, setCreate] = useState(false);

  // Check if the user is already logged in, if yes, redirect to home
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (login) {
      navigate("/home"); // Redirect to home if already logged in
    }
  }, []); // Only re-run if navigate changes

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await connection.post("/user/login", { ...userData });
      localStorage.setItem("login", JSON.stringify(true)); // Store login status
      navigate("/home"); // Navigate to home page
      setCreate(true); // Set flag for successful login
      console.log(response);
    } catch (err) {
      toast(`❌ ${err.response.data.message}`); // Handle login errors
      console.log(`Error in login: ${err}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center h-screen items-center bg-gray-800">
        <form
          className="bg-gray-800 shadow-2xl shadow-black px-10 py-14 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div className="border-b-2 border-b-white text-white">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border-none outline-0"
              onChange={handleChange}
              required
            />
          </div>
          <div className="border-b-2 border-b-white text-white">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border-none outline-0"
              onChange={handleChange}
              required
            />
          </div>
          <NavLink to="/" className="text-white text-md">
            Donot have account?singup
          </NavLink>
          <div className="mt-4">
            <button className="bg-gray-600 text-white text-xl m-auto block px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-500 active:bg-gray-700">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
