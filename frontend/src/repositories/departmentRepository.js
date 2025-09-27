import api from "../api/api";
import departments from "../assets/mock/departments.json";

const mockEnabled = import.meta.env.VITE_MOCK_ENABLED === 'true';
const subLevl="/Departments";

export const getDepartments = async () => {
  if (mockEnabled) return Promise.resolve(departments);
  const res = await api.get(subLevl);
  return res.data;
};

export const createDepartment = async (data) => {
  if (mockEnabled) return Promise.resolve({ ...data, id: Date.now() });
  const res = await api.post(subLevl, data);
  return res.data;
};

export const updateDepartment = async (id, data) => {
  if (mockEnabled) return Promise.resolve({ ...data, id });
  const res = await api.put(`${subLevl}/${id}`, data);
  return res.data;
};

export const deleteDepartment = async (id) => {
  if (mockEnabled) return Promise.resolve({ success: true, id });
  const res = await api.delete(`${subLevl}/${id}`);
  return res.data;
};
