import api from "../api/api";
import employees from "../assets/mock/employees.json";

const USE_MOCK = import.meta.env.VITE_IS_MOCK_LOAD || false; 
const subLevl="/Employees";

export const getEmployees = async () => {
  if (USE_MOCK) return Promise.resolve(employees);
  const res = await api.get(subLevl);
  return res.data;
};

export const createEmployee = async (data) => {
  if (USE_MOCK) return Promise.resolve({ ...data, id: Date.now() });
  const res = await api.post(subLevl, data);
  return res.data;
};

export const updateEmployee = async (id, data) => {
  if (USE_MOCK) return Promise.resolve({ ...data, id });
  const res = await api.put(`${subLevl}/${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id) => {
  if (USE_MOCK) return Promise.resolve({ success: true, id });
  const res = await api.delete(`${subLevl}/${id}`);
  return res.data;
};

export const getEmployeesBYDepId = async (id) => {
  if (USE_MOCK) return Promise.resolve(employees);
  const res = await api.get(`${subLevl}/${id}`);
  return res.data;
};
