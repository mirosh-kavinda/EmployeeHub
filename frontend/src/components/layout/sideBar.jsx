import { Link, useLocation } from "react-router-dom";
import { Users, Briefcase, LogOut } from "lucide-react";
import { useLogout } from "../../hooks/authUse";
import sideBarHero from "../../assets/images/sideBarHero.png";
import logo from "../../assets/images/logo.png";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useLogout();

  return (
    <div className="h-screen w-20 md:w-56 border-r border-gray-200 shadow-sm flex flex-col">
      <div className="flex flex-col justify-between h-full p-6">
    
        <div className="hidden md:flex items-center gap-2 mb-6">
          <h3 className="text-lg text-center font-bold text-gray-800">Employee Hub</h3>
          <img
            src={logo}
            alt="Logo"
            className="w-14 h-14 object-contain"
          />
        </div>

        <nav className="flex flex-col gap-4 text-gray-700 items-center md:items-start justify-center flex-1">
          <Link
            to="/employers"
            className={`flex flex-col md:flex-row items-center gap-2 px-2 py-1 rounded-lg transition ${
              location.pathname === "/employers"
                ? "bg-blue-100 shadow-md"
                : "hover:bg-blue-50"
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="hidden md:block">All Users</span>
          </Link>

          <Link
            to="/departments"
            className={`flex flex-col md:flex-row items-center gap-2 px-2 py-1 rounded-lg transition ${
              location.pathname === "/departments"
                ? "bg-blue-100 shadow-md"
                : "hover:bg-blue-50"
            }`}
          >
            <Briefcase className="w-6 h-6" />
            <span className="hidden md:block">All Departments</span>
          </Link>

          <button
            onClick={logout}
            className="flex flex-col md:flex-row items-center gap-2 px-2 py-1 transition hover:bg-red-100 text-red-600"
          >
            <LogOut className="w-6 h-6" />
            <span className="hidden md:block">Logout</span>
          </button>
        </nav>

        {/* Sidebar Hero Image */}
        <img
          src={sideBarHero}
          alt="Sidebar Hero"
          className="hidden md:block self-center mb-0 object-contain"
          style={{ width: "247px", height: "234px" }}
        />
      </div>
    </div>
  );
}
