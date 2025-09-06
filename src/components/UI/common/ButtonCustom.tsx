import { ReactNode } from "react";

export default function ButtonCustom({
  children,
  className,
  full = false,
  href = null,
  cursorPointer = true,
  ...props
}: {
  children: ReactNode;
  className?: string;
  full?: boolean;
  href?: string | null;
  cursorPointer?: boolean;
}) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      {...props}
      {...(href ? { href } : {})}
      className={`${
        !className?.includes("p-") && "px-4 py-[5px]"
      } ${className} ${
        full
          ? "bg-primary-1 text-color-6"
          : "border border-gray-new hover:border-gray-500"
      }   rounded-full transition-all duration-300 h-min ${
        cursorPointer && "cursor-pointer"
      } grid place-items-center ${
        className?.includes("w-full") ? "" : "max-w-max"
      }`}
    >
      {children}
    </Tag>
  );
}
