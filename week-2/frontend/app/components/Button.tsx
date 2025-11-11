import React from "react";

interface ButtonProps {
  text?: string;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  name?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  icon,
  onClick,
  className = "",
  name,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      name={name}
      aria-label={text || "button"}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-colors ${className}`}
    >
      {icon}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;
