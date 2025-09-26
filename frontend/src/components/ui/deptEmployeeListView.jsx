import { EyeClosed } from "lucide-react"; 
import Modal from "./modal";
import { calculateAgeFromDOB } from "../../utils/employerUtills";

export default function EmployeeViewModal({ open, onClose, employees, title }) {
  return (
    <Modal open={open} onClose={onClose} title={title || "Employees"}>
      

      <div className="flex justify-end mb-2">
</div>
      {employees.length === 0 ? (
        <p className="text-gray-500 text-center">No employees found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm font-semibold text-gray-600 border-b border-gray-300">
                <th className="py-3">Full Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Salary</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700">
              {employees.map((emp) => (
                <tr key={emp.employeeId} className="border-b">
                  <td className="py-3">{emp.firstName} {emp.lastName}</td>
                  <td className="px-4 py-3">{emp.email}</td>
                  <td className="px-4 py-3">{emp.age ?? calculateAgeFromDOB(emp.dateOfBirth)}</td>
                  <td className="px-4 py-3">{emp.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
}
