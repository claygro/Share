import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import connection from "../config/connection.config";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserCreate = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [create, setCreate] = useState(false);
  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    if (login) navigate("/home");
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await connection.post("/user/signup", { ...userData });
      navigate("/home");
      setCreate(true);
      localStorage.setItem("login", JSON.stringify(true));
      console.log(response);
    } catch (err) {
      toast(`❌${err.response.data.message}`);
      console.log(`error in signup in  ${err}`);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center h-screen items-center  bg-gray-800">
        <form
          className="bg-gray-800 shadow-2xl shadow-black px-10 py-14 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div className="border-b-2 bg-transparent border-b-white text-white">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full  px-4 py-1 border-none outline-0"
              onChange={handleChange}
              required
            />
          </div>
          <div className="border-b-2 border-b-white text-white ">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border-none outline-0"
              onChange={handleChange}
              required
            />
          </div>
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
          <NavLink to="/login" className="text-white text-md">
            Already have account?Login
          </NavLink>
          <div className="mt-4">
            <button className="bg-gray-600 text-white text-xl m-auto block px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-500 active:bg-gray-700">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserCreate;
