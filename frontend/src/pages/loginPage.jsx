import logo from "../assets/images/logo.png";
import { useLogin } from "../hooks/authUse";
import {InputField} from "../components/ui/inputField";
import {showCustomToast} from "../components/ui/customProgresBar"
const LoginPage = () => {
  const { adminId, setAdminId, password, setPassword, error, loading, login } =
    useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const ErrorMessage = ({ message }) => (
    <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded-md">
      {message}
    </div>
  );

  return (
    <div className="flex items-center justify-center loginPage">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Welcome to <br /> Employee Hub
      </h1>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="relative z-10 flex flex-col">
          <div className="row mb-6 items-center">
            <img
              src={logo}
              alt="Employee Hub Logo"
              className="mx-auto"
              style={{ width: "80px", height: "80px" }}
            />
          </div>
        <div className="mb-4 p-3 text-sm bg-gray-100 text-gray-700 rounded-md text-center">
            <p>Use <strong>ID:</strong> <code>'admin</code> | <strong>Password:</strong> <code>password</code> for login</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <InputField
              label="Admin ID / Manager ID"
              type="text"
              value={adminId}
              onChange={setAdminId}
              placeholder="Enter your ID!"
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter your Password!"
            />

            {error && <ErrorMessage message={error} />}
           

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-800"
              style={{
                borderRadius: "8px",
                background: "linear-gradient(to right, #4A90E2, #5DADE2)",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <p className="mt-10 text-xs text-gray-500 text-center">
        © 2025 EmployeeHub. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
