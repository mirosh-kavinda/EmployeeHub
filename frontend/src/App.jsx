import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Departments from "./pages/departmentPage";
import Employers from "./pages/employeePage";
import LoginPage from "./pages/loginPage";
import DashboardLayout from "./components/layout/dashboardLayout";
import { ToastContainer } from 'react-toastify';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/employers" element={<Employers />} />
          <Route path="/departments" element={<Departments />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}