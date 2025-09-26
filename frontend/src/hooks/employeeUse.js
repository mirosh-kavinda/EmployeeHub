import { useState, useEffect, useCallback } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../repositories/employerRepository";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const add = async (payload) => {
    await createEmployee(payload);
    await load();
  };

  const update = async (id, payload) => {
    await updateEmployee(id, payload);
    await load();
  };

  const remove = async (id) => {
    await deleteEmployee(id);
    await load();
  };

  useEffect(() => {
    load();
  }, [load]);

  return { employees, loading, error, add, update, remove, reload: load };
};
