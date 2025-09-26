import { useState, useCallback } from "react";
import { getEmployeesBYDepId } from "../repositories/employerRepository";

export const useEmployeesByDept = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch employees for a given department
  const fetchEmployees = useCallback(async (departmentId) => {
    if (!departmentId) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getEmployeesBYDepId(departmentId);
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError(err);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { employees, loading, error, fetchEmployees };
};
