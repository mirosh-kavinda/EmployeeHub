import { Link, useLocation } from "react-router-dom";
import { Users, Briefcase, LogOut } from "lucide-react";
import { useLogout } from "../../hooks/authUse";
import sideBarHero from "../../assets/images/sideBarHero.png";
import logo from "../../assets/images/logo.png";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useLogout();

  const linkClasses = (path) =>
    `w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-100 shadow-md text-blue-700"
        : "hover:bg-blue-50 text-gray-700"
    }`;

  return (
    <div className="h-screen w-20 md:w-56 border-r border-gray-200 shadow-sm flex flex-col">

      <div className="flex md:hidden justify-center items-center p-4">
        <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
      </div>

      <div className="flex flex-col justify-between h-full">
        {/* Logo / Title for expanded sidebar */}
        <div className="hidden md:flex items-center gap-2 mb-9 p-6">
          <h3 className="text-lg text-center font-bold text-gray-800">Employee Hub</h3>
          <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
        </div>

        {/* Navigation */}
        <nav className="flex  flex-col gap-2 flex-1">
          <Link to="/employers" className={linkClasses("/employers")}>
            <Users className="w-6 h-6" />
            <span className="hidden md:inline">All Users</span>
          </Link>

          <Link to="/departments" className={linkClasses("/departments")}>
            <Briefcase className="w-6 h-6" />
            <span className="hidden md:inline">All Departments</span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center md:justify-start gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-100 transition"
          >
            <LogOut className="w-6 h-6" />
            <span className="hidden md:inline">Logout</span>
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
