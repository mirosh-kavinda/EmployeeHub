import api from "../api/api";
import employees from "../assets/mock/employees.json";

const USE_MOCK = true; 

export const getEmployees = async () => {
  if (USE_MOCK) return Promise.resolve(employees);
  const res = await api.get("/employees");
  return res.data;
};

export const createEmployee = async (data) => {
  if (USE_MOCK) return Promise.resolve({ ...data, id: Date.now() });
  const res = await api.post("/employees", data);
  return res.data;
};

export const updateEmployee = async (id, data) => {
  if (USE_MOCK) return Promise.resolve({ ...data, id });
  const res = await api.put(`/employees/${id}`, data);
  return res.data;
};

export const deleteEmployee = async (id) => {
  if (USE_MOCK) return Promise.resolve({ success: true, id });
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};
