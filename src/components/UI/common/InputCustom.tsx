"use client";
import { Eye, EyeClosed } from "lucide-react";
import { RefObject, useState } from "react";

export default function InputCustom({
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
    <div
      onClick={handleClick}
      className={` flex relative w-full  flex-col mt-4`}
    >
      <label
        htmlFor={id}
        className={`absolute ml-4 pointer-events-none mt-5 md:mt-4 text-sm md:text-base text-foreground/70 px-1 bg-background ${
          (focus || value) && "mt-[-9px]! text-xs md:text-sm text-teal-400!"
        } transition-all duration-300`}
      >
        {label}
      </label>
      <input
        ref={ref}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        type={
          type == "password" ? (isHidePassword ? "password" : "text") : type
        }
        id={id}
        name={id}
        required={required}
        value={value}
        maxLength={maxLength ? maxLength : undefined}
        autoComplete="off"
        onChange={(e) => onChangeValue(e.target.value)}
        className={`outline-none p-4 border-[#2b2b2b] ${className} pr-10 border-[1px] bg-background transition-all duration-300 ${
          focus && "border-teal-600!"
        } border rounded-md`}
      />
      {type === "password" && (
        <span
          className="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
          onClick={() => setIsHidePassword(!isHidePassword)}
        >
          {isHidePassword ? <EyeClosed size={19} /> : <Eye size={19} />}
        </span>
      )}
    </div>
  );
}
