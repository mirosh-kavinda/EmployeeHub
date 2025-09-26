
export const InputField = ({ label, type, value, onChange, placeholder }) => (
    <div>
      <label className="block text-sm text-gray-700 mb-1 font-medium">
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        defaultValue={value}
        onBlur={(e) => onChange(e.target.value)}
        required
        placeholder={placeholder}
        style={{ borderRadius: "8px" }}
      />
    </div>
  );
