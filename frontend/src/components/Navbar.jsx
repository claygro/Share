import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
const Navbar = () => {
  return (
    <nav className=" flex  sm:flex-col sm:items-start items-center justify-between  sm:space-y-0 sm:space-x-4 sm:px-4 py-4 bg-gray-800">
      {/* Home Link */}
      <div className="flex items-center">
        <div className="flex sm:hidden">
          <NavLink to="/home">
            <GoHome className="text-white text-5xl " />
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-900 rounded-md shadow-md" : ""
              } w-full hidden sm:flex text-md sm:text-xl sm:w-auto text-center text-white sm:px-4 sm:py-2`
            }
          >
            Home
          </NavLink>
        </div>
      </div>
      {/* Profile Link */}
      <div className="flex items-center">
        <div className="flex sm:hidden">
          <NavLink to="/profile">
            <CgProfile className="text-white text-5xl " />
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-900 rounded-md shadow-md" : ""
              } w-full hidden sm:flex text-md sm:text-xl sm:w-auto text-center text-white sm:px-4 sm:py-2`
            }
          >
            Profile
          </NavLink>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex sm:hidden">
          <NavLink to="/setting">
            <CiSettings className="text-white text-5xl " />
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              `${
                isActive ? "bg-gray-900 rounded-md shadow-md" : ""
              } w-full hidden sm:flex text-md sm:text-xl sm:w-auto text-center text-white sm:px-4 sm:py-2`
            }
          >
            Setting
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
