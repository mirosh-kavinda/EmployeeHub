import React, { useEffect, useState } from "react";
import { calculateAgeFromDOB, isEmailValid } from "../../utils/employerUtills";
import { InputField } from "./inputField";

export default function EmployeeForm({ initial, departments, onSave, onCancel }) {
  const [firstName, setFirstName] = useState(initial?.firstName || "");
  const [lastName, setLastName] = useState(initial?.lastName || "");
  const [email, setEmail] = useState(initial?.email || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    initial?.dateOfBirth ? initial.dateOfBirth.split("T")[0] : ""
  );
  const [age, setAge] = useState(
    initial?.age ??
      (initial?.dateOfBirth
        ? calculateAgeFromDOB(initial.dateOfBirth.split("T")[0])
        : "")
  );
  const [salary, setSalary] = useState(initial?.salary ?? "");
  const [departmentId, setDepartmentId] = useState(
    initial?.departmentId ?? initial?.department?.id ?? ""
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFirstName(initial?.firstName || "");
    setLastName(initial?.lastName || "");
    setEmail(initial?.email || "");
    setDateOfBirth(initial?.dateOfBirth ? initial.dateOfBirth.split("T")[0] : "");
    setAge(
      initial?.age ??
        (initial?.dateOfBirth
          ? calculateAgeFromDOB(initial.dateOfBirth.split("T")[0])
          : "")
    );
    setSalary(initial?.salary ?? "");
    setDepartmentId(initial?.departmentId ?? initial?.department?.id ?? "");
  }, [initial]);

  const handleDobChange = (v) => {
    setDateOfBirth(v);
    const newAge = calculateAgeFromDOB(v);
    setAge(newAge);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !dateOfBirth ||
      !departmentId
    ) {
      alert("Please fill required fields");
      return;
    }
    if (!isEmailValid(email)) {
      alert("Please enter a valid email");
      return;
    }
    setSaving(true);
    const payload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      dateOfBirth,
      age,
      salary,
      departmentId,
    };
    try {
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="First Name *"
          type="text"
          value={firstName}
          onChange={setFirstName}
          placeholder="Enter first name"
        />
        <InputField
          label="Last Name *"
          type="text"
          value={lastName}
          onChange={setLastName}
          placeholder="Enter last name"
        />
        <InputField
          label="Email *"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter email"
        />
        <InputField
          label="Date of Birth *"
          type="date"
          value={dateOfBirth}
          onChange={handleDobChange}
        />
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            value={age}
            disabled
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50"
          />
        </div>
        <InputField
          label="Salary"
          type="number"
          value={salary}
          onChange={setSalary}
          placeholder="Enter salary"
        />
        <div className="col-span-2">
          <label className="block text-sm font-medium">Department *</label>
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            required
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- select --</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.departmentName} ({d.departmentCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
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
