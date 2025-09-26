import { useState } from "react";

const ERROR_MESSAGE = "Invalid Admin ID or Password";

export const useLogin = () => {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    setError("");

    try {
      // 👉 Replace this with repository call later
      if (adminId === "admin" && password === "password") {
        localStorage.setItem(
          "user",
          JSON.stringify({ id: "admin", name: "Admin User" })
        );
        window.location.href = "/employers";
      } else {
        throw new Error(ERROR_MESSAGE);
      }
    } catch (err) {
      setError(err.message || ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  return {
    adminId,
    setAdminId,
    password,
    setPassword,
    error,
    loading,
    login,
  };
};


export const useLogout = () => {
    const logout = () => {
      // Remove user from localStorage
      localStorage.removeItem("user");
  
      // Redirect to login page
      window.location.href = "/";
    };
  
    return { logout };
  };