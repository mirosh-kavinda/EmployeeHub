import { useState, useEffect, useCallback } from "react";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../repositories/departmentRepository";

export const useDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      console.error("Failed to load departments:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const add = async (payload) => {
    await createDepartment(payload);
    await load();
  };

  const update = async (id, payload) => {
    await updateDepartment(id, payload);
    await load();
  };

  const remove = async (id) => {
    await deleteDepartment(id);
    await load();
  };

  useEffect(() => {
    load();
  }, [load]);

  return { departments, loading, error, add, update, remove, reload: load };
};
