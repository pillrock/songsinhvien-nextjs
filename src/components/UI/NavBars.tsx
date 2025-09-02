import NavText from "./NavText";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import ButtonCustom from "./ButtonCustom";

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
          <NavText name="Tiện ích" dropMenu>
            <div>Sớm ra mắt</div>
          </NavText>
          <NavText name="FAQ">
            <div>Câu hòi thường gặp</div>
          </NavText>
          <NavText name="Tài liệu">
            <div>Tài liệu</div>
          </NavText>
          <NavText name="Về chúng tôi">
            <div>Về chúng tôi</div>
          </NavText>
        </div>
      </div>

      {/* navbars mobile */}
      <div
        onClick={(e) => {
          setIsOpenMobileMenu(!isOpenMobileMenu);
        }}
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

      <div
        className={`fixed md:hidden ${
          isOpenMobileMenu &&
          "translate-y-0! z-10 opacity-100! pointer-events-auto! select-auto!"
        } w-full left-0 top-[68px] pb-[68px] px-5 bg-background translate-y-20
         transition-all duration-300 z-10 select-none opacity-0 h-screen pointer-events-none`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>Xin chao cac ban</div>
          <div className="py-8 flex flex-col md:flex-row gap-2 justify-between">
            <div className="flex-1">
              <ButtonCustom className="w-full text-[14px] font-base-bold ">
                Đăng ký
              </ButtonCustom>
            </div>
            <div className="flex-1">
              <ButtonCustom
                className="text-[14px] w-full font-base-bold flex-1"
                full
                href={"/about-us"}
              >
                Đăng nhập
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
