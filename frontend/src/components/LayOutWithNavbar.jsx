import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const LayOutWithNavbar = () => {
  return (
    <>
      <div className="flex min-h-screen">
        {/* Left Sidebar/Navbar */}
        <div className="sticky top-0 h-screen hidden sm:block bg-gray-800 pr-30 pl-5 pt-5 text-xl">
          <Navbar />
        </div>

        {/* Main Content Area */}
        <div className="grow flex-1    overflow-y-auto">
          <Outlet />
        </div>
      </div>

      {/* Bottom Navbar on mobile */}
      <div className="sticky bottom-0  sm:hidden bg-gray-800 px-2">
        <Navbar />
      </div>
    </>
  );
};

export default LayOutWithNavbar;
