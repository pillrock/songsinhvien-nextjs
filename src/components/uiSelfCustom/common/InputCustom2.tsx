"use client";

import { Eye, EyeClosed } from "lucide-react";
import { RefObject, useState } from "react";

export default function InputCustom2({
  className,
  handleClick,
  label,
  type = "text",
  id,
  value,
  onChangeValue,
  required = false,
  maxLength,
  ref,
}: {
  className?: string;
  handleClick?: () => void;
  label: string;
  type?: string; // "text", "password", "email", etc.
  id: string;
  value: string;
  required?: boolean;
  maxLength?: number;
  ref?: RefObject<null>;
  onChangeValue: (value: string) => void;
}) {
  const [focus, setFocus] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);

  return (
    <div onClick={handleClick} className={`flex relative w-full flex-col mt-4`}>
      <label
        htmlFor={id}
        className="ml-1 mb-1 text-sm md:text-base text-foreground/70"
      >
        {label}
      </label>

      <input
        ref={ref}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        type={
          type === "password" ? (isHidePassword ? "password" : "text") : type
        }
        id={id}
        name={id}
        required={required}
        value={value}
        maxLength={maxLength ? maxLength : undefined}
        autoComplete="off"
        onChange={(e) => onChangeValue(e.target.value)}
        className={`outline-none p-4 pr-10 border border-[#2b2b2b] bg-background rounded-md transition-all duration-300 
          ${
            focus
              ? "border-teal-600 ring-2 ring-[#0e4136] ring-offset-[#00a870] ring-offset-1"
              : ""
          }
          ${className}
        `}
      />

      {type === "password" && (
        <span
          className="absolute right-3 top-[55%] translate-y-[-50%] cursor-pointer"
          onClick={() => setIsHidePassword(!isHidePassword)}
        >
          {isHidePassword ? <EyeClosed size={19} /> : <Eye size={19} />}
        </span>
      )}
    </div>
  );
}
