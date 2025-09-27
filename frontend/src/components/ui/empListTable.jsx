import { Edit, Trash } from "lucide-react";
import { calculateAgeFromDOB } from "../../utils/employerUtills";

export default function EmployeeTable({
    employees = [],
    loading = false,
    onAdd,
    onEdit,
    onDelete,
    isModalview = false
}) {
    return (
        <div className="flex-8 bg-gray-50 ">
            {!isModalview ? (
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Employees</h2>

                    <div className="hidden md:flex items-center gap-2 mb-6 p-6">

                        <button
                            onClick={onAdd}
                            className="px-4 py-2 add_button text-lg text-center"
                        >
                            + Add New Employee
                        </button>
                    </div>

                </div>
            ) : null}
            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-sm font-semibold text-gray-600 border-b border-gray-300">
                                <th className="py-3">Full Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Age</th>
                                <th className="px-4 py-3">Salary ($)</th>
                                {!isModalview ? (<th className="px-4 py-3">Department</th>) : null}
                                <th className="px-8 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-700">
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
                           {employees?.map?.((emp) => (
                                <tr key={emp.employeeId} className="border-b">
                                    <td className="py-3">
                                        {emp.firstName} {emp.lastName}
                                    </td>
                                    <td className="px-4 py-3">{emp.email}</td>
                                    <td className="px-4 py-3">
                                        {emp.age ?? calculateAgeFromDOB(emp.dateOfBirth)}
                                    </td>
                                    <td className="px-4 py-3">{emp.salary}</td>
                                    {!isModalview ? (<td className="px-4 py-3">
                                        {emp.departmentName || emp.department?.departmentName}
                                    </td>) : null}
                                    <td className="px-4 py-3 flex gap-2">
                                        {!isModalview ? (<button
                                            onClick={() => onEdit(emp)}
                                            className="px-2 py-1 text-blue-600 hover:underline"
                                        >
                                            <Edit />
                                        </button>) : null}
                                        <button
                                            onClick={() => onDelete(emp.employeeId)}
                                            className="px-2 py-1 text-red-600 hover:underline"
                                        >
                                            <Trash />
                                        </button>
                                    </td>
                                </tr>
                            ))??null}

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
