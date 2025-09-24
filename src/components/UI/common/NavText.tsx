import { ChevronDown, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function NavText({
  children,
  name,
  dropMenu = false,
  href,
  icon,
  arrow = false,
  subName,
  mobile = false,
  mainNav = false,
  className,
  anchor = "left",
  ...props
}: {
  children?: ReactNode;
  name: string;
  dropMenu?: boolean;
  href?: string;
  icon?: ReactNode;
  arrow?: boolean;
  mobile?: boolean;
  subName?: string;
  mainNav?: boolean;
  anchor?: "left" | "right";
  className?: string;
}) {
  const content = (
    <div className={`group ${(mainNav || mobile) && "py-2 md:py-5"}`}>
      <div className="flex items-center relative group/cc">
        {dropMenu ? (
          <span className="text-[14px] group-hover:text-[#0c8] transition-all duration-300 ">
            {name}
          </span>
        ) : arrow ? (
          <span className="text-[14px] text-foreground-plus flex items-center gap-x-0.5 group-hover:text-[#0c8] transition-all duration-300 ">
            {children}
            <span className="absolute -right-5 group-hover:-right-6.5 transition-all duration-300">
              <MoveRightIcon size={17} />
            </span>
          </span>
        ) : (
          <div
            className={`flex gap-x-[7px]  ${
              !mobile &&
              !mainNav &&
              "group-hover/cc:bg-[#16181d] items-center py-2 px-3"
            }  transition-all duration-300 rounded-[14px] w-full `}
          >
            {icon && (
              <div
                className={`${
                  !mobile &&
                  "w-[32px] h-[32px] relative  grid bg-[#16181d] rounded-lg  place-items-center"
                } `}
              >
                <span
                  className={`text-[14px] mt-2 md:mt-0
                    items-start flex gap-x-0.5 group-hover/cc:text-[#0c8] transition-all duration-300`}
                >
                  <span className="text-gray-300">{icon}</span>
                </span>
                {!mobile && (
                  <div className="absolute z-10  w-full h-full border border-[#2e3038] rounded-lg bg-gradient-to-r from-black/30 to-gray-500/10"></div>
                )}
              </div>
            )}
            <div className="">
              <span
                className={`${
                  mobile ||
                  (!dropMenu && mainNav && "group-hover/cc:text-[#0c8]")
                } transition-all duration-300 text-[14px]`}
              >
                {children}
              </span>
              <p className="text-[12px] text-gray-500">{subName}</p>
            </div>
          </div>
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
            pointer-events-none transition-all duration-300 ${
              anchor == "left" ? "-translate-x-[10%]" : "-translate-x-[90%]"
            }  translate-y-[5%]
            border border-gray-2 z-10 select-none group-hover:select-auto bg-[#0b0c0f] w-max rounded-[14px]`}
        >
          {children}
        </div>
      )}
    </div>
  );
  return href ? (
    <Link {...props} href={href} className={`relative  ${className}`}>
      {content}
    </Link>
  ) : (
    <div {...props} className={`relative  ${className}`}>
      {content}
    </div>
  );
}
