import { ChevronDown, DiscIcon, MoveRightIcon } from "lucide-react";
import { ReactNode } from "react";

export default function NavText({
  children,
  name,
  dropMenu = false,
  href = null,
  icon,
  arrow = false,
  ...props
}: {
  children?: ReactNode;
  name: string;
  dropMenu?: boolean;
  href?: string | null;
  icon?: ReactNode;
  arrow?: boolean;
}) {
  const Tag = dropMenu ? "div" : "a";
  return (
    <Tag {...props} {...(href ? { href } : {})} className="relative">
      <div className="group max-w-max py-5">
        <div className="flex items-center relative">
          {dropMenu ? (
            <span className="text-[14px] group-hover:text-[#0c8] transition-all duration-300 ">
              {name}
            </span>
          ) : arrow ? (
            <span className="text-[14px] flex items-center gap-x-0.5 group-hover:text-[#0c8] transition-all duration-300 ">
              {children}
              <span className="absolute -right-5 group-hover:-right-6.5 transition-all duration-300">
                <MoveRightIcon size={17} />
              </span>
            </span>
          ) : (
            <span className="text-[14px] flex items-center gap-x-0.5 group-hover:text-[#0c8] transition-all duration-300 ">
              {children}
            </span>
          )}
          {dropMenu && (
            <span className="text-color-3 group-hover:rotate-180 transition-all duration-300">
              <ChevronDown size={17} />
            </span>
          )}
        </div>
        {dropMenu && (
          <div
            className={`px-7 py-6 absolute left-0 opacity-0 group-hover:opacity-100 
            group-hover:pointer-events-auto scale-80 group-hover:scale-100 origin-top-left
            pointer-events-none transition-all duration-300 -translate-x-[10%] translate-y-[10%]
            border border-gray-2 bg-[#0b0c0f] w-max rounded-[14px] z-10`}
          >
            {children}
          </div>
        )}
      </div>
    </Tag>
  );
}
