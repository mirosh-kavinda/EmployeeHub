import { Link, useLocation } from "react-router-dom";
import { Users, Briefcase, LogOut } from "lucide-react";
import { useLogout } from "../../hooks/authUse";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useLogout(); 

  return (
    <div className="h-screen w-20 md:w-56 border-r border-gray-200 shadow-sm flex flex-col items-center md:items-start">
      <div className="p-6 w-full">
        <h3 className="text-lg font-bold text-gray-800 mb-6 hidden md:block">
          Employee Hub
        </h3>
        <nav className="flex flex-col gap-4 text-gray-700 w-full">
          <Link
            to="/employers"
            className={`flex flex-col md:flex-row items-center gap-2 px-3 py-2 rounded-lg transition ${
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
            className={`flex flex-col md:flex-row items-center gap-2 px-3 py-2 rounded-lg transition ${
              location.pathname === "/departments"
                ? "bg-blue-100 shadow-md"
                : "hover:bg-blue-50"
            }`}
          >
            <Briefcase className="w-6 h-6" />
            <span className="hidden md:block">All Departments</span>
          </Link>

          <button
            onClick={logout} // 
            className="flex flex-col md:flex-row items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-red-100 text-red-600"
          >
            <LogOut className="w-6 h-6" />
            <span className="hidden md:block">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
