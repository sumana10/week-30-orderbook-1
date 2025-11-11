"use client";
import React from "react";

interface InputElProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  readonly?: boolean;
  className?: string;
}

const InputEl = React.forwardRef<HTMLInputElement, InputElProps>(
  ({ label, readonly, className, ...props }, ref) => {
    return (
      <div className="flex flex-col mb-4">
        {label && (
          <label className="text-xs text-gray-400 mb-1" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          {...props}
          ref={ref}
          readOnly={readonly}
          className={`bg-[#1A1B1F] text-white text-xl font-semibold rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3A88FF] placeholder:text-gray-600 disabled:cursor-not-allowed ${readonly ? "cursor-not-allowed" : "cursor-text"
            } ${className ?? ""}`}
        />
      </div>
    );
  }
);

InputEl.displayName = "InputEl";
export default InputEl;
