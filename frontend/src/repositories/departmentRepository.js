import api from "../api/api";
import departments from "../assets/mock/departments.json";

const USE_MOCK = true; 

export const getDepartments = async () => {
  if (USE_MOCK) return Promise.resolve(departments);
  const res = await api.get("/departments");
  return res.data;
};

export const createDepartment = async (data) => {
  if (USE_MOCK) return Promise.resolve({ ...data, id: Date.now() });
  const res = await api.post("/departments", data);
  return res.data;
};

export const updateDepartment = async (id, data) => {
  if (USE_MOCK) return Promise.resolve({ ...data, id });
  const res = await api.put(`/departments/${id}`, data);
  return res.data;
};

export const deleteDepartment = async (id) => {
  if (USE_MOCK) return Promise.resolve({ success: true, id });
  const res = await api.delete(`/departments/${id}`);
  return res.data;
};
