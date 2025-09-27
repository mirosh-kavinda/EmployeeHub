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
     
      if (adminId === "admin" && password === "password") {
      
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
      localStorage.removeItem("user");
  
      window.location.href = "/";
    };
  
    return { logout };
  };