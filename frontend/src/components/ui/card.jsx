// File: frontend/src/components/ui/Card.jsx
import React from "react";

export const Card = ({ className = "", ...props }) => (
  <div className={`rounded-lg shadow-sm border ${className}`} {...props} />
);

export const CardContent = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);
