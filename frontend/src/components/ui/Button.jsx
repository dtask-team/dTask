// ✅ File: frontend/src/components/ui/Button.jsx
import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded font-semibold transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
