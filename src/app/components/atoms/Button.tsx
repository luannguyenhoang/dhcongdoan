import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "yellow";
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  "aria-label": ariaLabel,
  type = "button",
  disabled = false,
  ...rest
}: ButtonProps) => {
  const baseClasses =
    "font-medium px-8 py-3 w-fit uppercase text-sm transition-all duration-300";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    yellow: "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type={type}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
