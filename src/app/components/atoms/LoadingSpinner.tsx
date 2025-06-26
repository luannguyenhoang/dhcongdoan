"use client";

import React from "react";
import { twMerge } from "tailwind-merge";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white";
  className?: string;
  text?: string;
  fullPage?: boolean;
}

export const LoadingSpinner = ({
  size = "md",
  color = "primary",
  className = "",
  text,
  fullPage = false
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
    xl: "w-16 h-16 border-4"
  };

  const colorClasses = {
    primary: "border-[#002147] border-t-transparent",
    secondary: "border-yellow-400 border-t-transparent",
    white: "border-white border-t-transparent"
  };

  const containerClasses = fullPage
    ? "min-h-[100vh] w-full flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center";

  return (
    <div className={twMerge(containerClasses, className)}>
      <div
        className={twMerge(
          "rounded-full animate-spin",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      {text && (
        <p
          className={twMerge(
            "mt-3 text-sm font-medium",
            color === "white" ? "text-white" : "text-gray-700"
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
