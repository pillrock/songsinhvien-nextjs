"use client";
import Image from "next/image";
import ButtonCustom from "./UI/ButtonCustom";
import NavText from "./UI/NavText";
import GithubIcon from "./UI/icons/github";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavBars from "./UI/NavBars";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="px-5 md:px-8 flex justify-between sticky top-0 bg-background">
      <div
        className={`absolute opacity-0 ${
          isSticky && "opacity-100"
        } transition-all duration-300 left-0 w-screen h-[1px] bottom-0 gradient-theme`}
      ></div>
      {/* logo & navbar */}
      <NavBars />
      <div className="hidden md:flex flex-1 justify-end gap-x-4 ">
        <div className="flex justify-end items-center">
          <NavText name="Product" href={"https://github.com/pillrock"}>
            <div className="flex group items-center gap-x-1">
              <span className="group-hover:text-green-500">
                <GithubIcon className="group-hover:text-green-500 transition-all duration-300" />
              </span>
              <p>Github</p>
            </div>
          </NavText>
        </div>
        <div className="flex items-center gap-x-2 justify-end ">
          <ButtonCustom className="text-[14px] font-base-bold">
            Đăng ký
          </ButtonCustom>
          <ButtonCustom
            className="text-[14px] font-base-bold "
            full
            href={"/about-us"}
          >
            Đăng nhập
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}

export default Header;
