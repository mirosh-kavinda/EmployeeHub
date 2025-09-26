import { Eye, Edit, Trash } from "lucide-react"; 

export function DepartmentCard({ department, onEdit, onDelete ,onView }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      {/* Header row */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{department.departmentName}</h3>
          <p className="text-sm text-gray-500">
            {department.members?.length || 0} Members
          </p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded" title="View" onClick={onView}>
            <Eye size={18} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded"
            onClick={onEdit}
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            className="p-2 hover:bg-gray-100 rounded text-red-600"
            onClick={() => onDelete(department.departmentId)}
            title="Delete"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>

      {/* Members */}
      <div className="space-y-3">
        {department.members?.slice(0, 5).map((m, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${m.firstName}+${m.lastName}`}
                alt={`${m.firstName} ${m.lastName}`}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{`${m.firstName} ${m.lastName}`}</p>
                <p className="text-xs text-gray-500">{m.email}</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">{">"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
