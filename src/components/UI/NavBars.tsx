import NavText from "./NavText";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function NavBars() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  return (
    <>
      <div className="flex justify-between flex-1">
        {/* logo */}
        <Link className="flex items-center gap-x-1" href={"/"}>
          <Image
            className="w-[40px] h-[30px]"
            src={"/images/logo.png"}
            width={40}
            height={30}
            alt="img-neon-temp"
          />
          <div className="font-logo flex text-2xl gap-x-[2px]">
            <span className="text-[#00C7CC]">S</span>
            <span className="text-[#00C7CC]">S</span>
            <span className="text-[#42D75B]">V</span>
          </div>
        </Link>

        {/* navbar PC*/}
        <div className="justify-end gap-x-10 hidden md:flex">
          <NavText name="Utilities" dropMenu>
            <div>Sớm ra mắt</div>
          </NavText>
          <NavText name="FAQ">
            <div>FAQ</div>
          </NavText>
          <NavText name="Docs">
            <div>Docs</div>
          </NavText>
          <NavText name="About us">
            <div>About us</div>
          </NavText>
        </div>
      </div>

      <div
        onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
        className="flex flex-col  md:hidden gap-y-[6px] group items-center justify-center py-7"
      >
        <div
          className={`${
            isOpenMobileMenu && "rotate-45 translate-y-2"
          } w-6 h-[2px] bg-foreground rounded-full 
         transition-all duration-300`}
        ></div>
        <div
          className={`${
            isOpenMobileMenu && "opacity-0"
          } w-6 h-[2px] bg-foreground rounded-full
         transition-all duration-300`}
        ></div>
        <div
          className={`${
            isOpenMobileMenu && "-rotate-45 -translate-y-2"
          } w-6 h-[2px]  bg-foreground rounded-full
         transition-all duration-300`}
        ></div>
      </div>
    </>
  );
}
