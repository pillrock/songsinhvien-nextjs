"use client";
import { useState } from "react";

export default function InputCustom({
  className,
  handleClick,
  label,
  type = "text",
  id,
  value,
  onChangeValue,
  required = false,
}: {
  className?: string;
  handleClick?: () => void;
  label: string;
  type?: string; // "text", "password", "email", etc.
  id: string;
  value: string;
  required?: boolean;
  onChangeValue: (value: string) => void;
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      onClick={handleClick}
      className={`${className} flex relative w-full  flex-col mt-4`}
    >
      <label
        htmlFor={id}
        className={`absolute ml-4 mt-5 md:mt-4 text-sm md:text-base text-foreground/70 px-1 bg-background ${
          (focus || value) && "mt-[-9px]! text-xs md:text-sm text-teal-400!"
        } transition-all duration-300`}
      >
        {label}
      </label>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        type={type}
        id={id}
        name={id}
        required={required}
        value={value}
        autoComplete="off"
        onChange={(e) => onChangeValue(e.target.value)}
        className={`outline-none p-4 border-teal-900 border-[1px] bg-background transition-all duration-300 ${
          focus && "border-teal-600!"
        } border rounded-md`}
      />
    </div>
  );
}
