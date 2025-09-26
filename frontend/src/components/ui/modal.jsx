import React, { useEffect } from "react";

export default function Modal({ open, onClose, children, title }) {
  // close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 p-6 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
    
        {title && (
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        )}

        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
