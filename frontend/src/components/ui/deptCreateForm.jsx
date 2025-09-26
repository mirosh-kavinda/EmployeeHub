import React, { useEffect, useState } from "react";
import { InputField } from "./inputField";

function DepartmentForm({ initial, onSave, onCancel }) {
  const [departmentCode, setDepartmentCode] = useState(
    initial?.departmentCode || ""
  );
  const [departmentName, setDepartmentName] = useState(
    initial?.departmentName || ""
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDepartmentCode(initial?.departmentCode || "");
    setDepartmentName(initial?.departmentName || "");
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!departmentCode.trim() || !departmentName.trim()) {
      alert("Please enter required fields.");
      return;
    }
    setSaving(true);
    try {
      await onSave({
        departmentCode: departmentCode.trim(),
        departmentName: departmentName.trim(),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Department Code *"
        type="text"
        value={departmentCode}
        onChange={setDepartmentCode}
        placeholder="Enter department code"
      />
      <InputField
        label="Department Name *"
        type="text"
        value={departmentName}
        onChange={setDepartmentName}
        placeholder="Enter department name"
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

export default DepartmentForm;
