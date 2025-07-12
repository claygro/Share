import connection from "../config/connection.config";
import { useNavigate } from "react-router-dom";
const Setting = () => {
  const navigate = useNavigate();
  // Handle logout
  const handleLogout = async () => {
    try {
      await connection.get("/logout");
      localStorage.setItem("login", false);
      navigate("/login");
    } catch (err) {
      console.log("Error during logout:", err);
    }
  };
  const handleAddUser = () => {
    localStorage.setItem("login", false);
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <div className="min-h-screen px-2 py-3 from-gray-900 to-gray-800 bg-linear-30 bg-gradient-to-[60deg]">
        {/* Logout Button */}
        <div className="bg-gray-700 py-5 px-8 rounded-md">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-2 bg-red-800 text-md text-white rounded-xl cursor-pointer"
          >
            Logout
          </button>
        </div>
        {/* for adding user or signup. */}
        <div className="bg-gray-700 mt-4 py-5 px-8 rounded-md">
          <button
            onClick={handleAddUser}
            className="w-full py-2 px-2 bg-red-800 text-md text-white rounded-xl cursor-pointer"
          >
            Add another account
          </button>
        </div>
      </div>
    </>
  );
};

export default Setting;
