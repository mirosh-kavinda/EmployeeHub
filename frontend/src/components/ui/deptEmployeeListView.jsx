import Modal from "./modal";
import EmployeeTable from "./empListTable";
import { useEmployees } from "../../hooks/employeeUse";

export default function EmployeeViewModal({ open, onClose, employees, title }) {
  const { remove } = useEmployees();

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
    <Modal open={open} onClose={onClose} title={title || "Employees"}>
      <div className="flex justify-end mb-2">
      </div>
      {employees.length === 0 ? (
        <p className="text-gray-500 text-center">No employees found</p>
      ) : (
        <EmployeeTable
          isModalview={true}
          employees={employees}
          loading={false}
          onDelete={(id) => handleDelete(id)}
        />
      )}
    </Modal>
  );
}
