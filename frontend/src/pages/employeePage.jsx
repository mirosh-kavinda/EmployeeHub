import React, { useState } from "react";
import Modal from "../components/ui/modal";
import { useEmployees } from "../hooks/employeeUse";
import { useDepartments } from "../hooks/departmentUse";
import EmployeeForm from "../components/ui/empCreateForm";
import EmployeeTable from "../components/ui/empListTable";

export default function Employers() {
  const { employees, loading, add, update, remove } = useEmployees();
  const { departments } = useDepartments();

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSave = async (id, payload) => {
    try {
      if (editing) {
        await update(id, payload);
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
      <div className="flex-1 bg-gray-50 min-h-screen">
        <EmployeeTable
          employees={employees}
          loading={loading}
          onAdd={() => {
            setEditing(null);
            setOpenModal(true);
          }}
          onEdit={(emp) => {
            setEditing(emp);
            setOpenModal(true);
          }}
          onDelete={(id) => handleDelete(id)}
        />
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
