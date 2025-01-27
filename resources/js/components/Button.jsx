import React from 'react';

// Button Component
export const Button = ({ children, onClick, variant = "default" }) => {
  const baseStyles = "px-4 py-2 rounded text-black font-semibold cursor-pointer ";
  const variantStyles = {
    default: "bg-blue-500 hover:bg-blue-600",
    destructive: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant] || variantStyles.default}`}
    >
      {children}
    </button>
  );
};

// Card Component
export const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
};

// CardContent Component
export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
