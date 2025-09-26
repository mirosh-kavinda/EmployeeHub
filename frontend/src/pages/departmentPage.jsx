import React, { useEffect, useState } from "react";
import Modal from "../components/ui/modal";
import { useDepartments } from "../hooks/departmentUse";
import {DepartmentCard} from "../components/ui/departmentCard"
import DepartmentForm from "../components/ui/departmentForm";

export default function Departments() {
  const { departments, loading, add, update, remove } = useDepartments();
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
    if (!window.confirm("Delete this department?")) return;
    try {
      await remove(id);
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6">   
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Departments</h2>
        <button
          onClick={() => {
            setEditing(null);
            setOpenModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add New Department
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {departments.map((d) => (
            <DepartmentCard
              key={d.id}
              department={d}
              onEdit={() => {
                setEditing(d);
                setOpenModal(true);
              }}
              onDelete={handleDelete}
            />
          ))}
          {departments.length === 0 && (
            <p className="text-gray-500">No departments yet.</p>
          )}
        </div>
      )}

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditing(null);
        }}
        title={editing ? "Edit Department" : "Add Department"}
      >
        <DepartmentForm
          initial={editing}
          onCancel={() => {
            setOpenModal(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      </Modal>
    </div>
  );
}

