import React, { useState } from "react";
import Modal from "../components/ui/modal";
import { useEmployees } from "../hooks/employeeUse";
import { useDepartments } from "../hooks/departmentUse";
import { calculateAgeFromDOB } from "../utils/employerUtills";
import EmployeeForm from "../components/ui/employeeForm";

export default function Employers() {
  const { employees, loading, add, update, remove } = useEmployees();
  const { departments } = useDepartments();

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSave = async (payload) => {
    try {
      if (editing) {
        await update(editing.id, payload);
      } else {
        await add(payload);
      }
      setOpenModal(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    try {
      await remove(id);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex">
      <div className="flex-1  bg-gray-50 min-h-screen">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Employees</h2>
          <button
            onClick={() => {
              setEditing(null);
              setOpenModal(true);
            }}
            className=" px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add New Employee
          </button>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left text-sm font-semibold text-gray-600 border-b border-gray-300">
                  <th className="py-3 ">Full Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Age</th>
                  <th className="px-4 py-3">Salary</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-8 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-b">
                    <td className=" py-3">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="px-4 py-3">{emp.email}</td>
                    <td className="px-4 py-3">
                      {emp.age ?? calculateAgeFromDOB(emp.dateOfBirth)}
                    </td>
                    <td className="px-4 py-3">{emp.salary}</td>
                    <td className="px-4 py-3">
                      {emp.departmentName || emp.department?.departmentName}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditing(emp);
                          setOpenModal(true);
                        }}
                        className="px-2 py-1 text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="px-2 py-1 text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-3 text-center text-gray-500 border-b"
                    >
                      No employees found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Add/Edit */}
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditing(null);
          }}
          title={editing ? "Edit Employee" : "Add Employee"}
        >
          <EmployeeForm
            initial={editing}
            departments={departments}
            onCancel={() => {
              setOpenModal(false);
              setEditing(null);
            }}
            onSave={handleSave}
          />
        </Modal>
      </div>
    </div>
  );
}
