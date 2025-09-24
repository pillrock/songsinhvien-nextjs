"use client";
import ButtonCustom from "./ButtonCustom";
import NavText from "./NavText";
import GithubIcon from "../icons/github";
import { useEffect, useState } from "react";
import NavBars from "./NavBars";
import GradientBox from "./GradientBox";
import { routes } from "@/lib/constants/routes";
import { User } from "@/lib/api/user";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [userStorage, setUserStorage] = useState<User | null>(null);
  //check token exists
  useEffect(() => {
    setUserStorage(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="px-5 md:px-8 flex justify-between sticky top-0 bg-background z-10">
      <GradientBox
        anchors="to-r"
        colors={["transparent", "--bg-primary-1", "transparent"]}
        className={`absolute opacity-0 ${
          isSticky && "opacity-100"
        } transition-all duration-300 left-0 w-screen h-[1px] bottom-0`}
      ></GradientBox>
      {/* logo & navbar */}
      <NavBars />

      {!userStorage ? (
        <div className="hidden md:flex flex-1 justify-end gap-x-4 ">
          <div className="flex justify-end items-center">
            <NavText
              name="Product"
              href={"https://github.com/pillrock"}
              mainNav
            >
              <div className="flex group items-center gap-x-1">
                <span className="group-hover:text-green-500">
                  <GithubIcon className="group-hover:text-green-500 transition-all duration-300" />
                </span>
                <p>Github</p>
              </div>
            </NavText>
          </div>
          <div className="flex items-center gap-x-2 justify-end ">
            <ButtonCustom
              href={routes.signup}
              className="text-[14px] font-base-bold"
            >
              Đăng ký
            </ButtonCustom>
            <ButtonCustom
              className="text-[14px] font-base-bold "
              full
              href={routes.signin}
            >
              Đăng nhập
            </ButtonCustom>
          </div>
        </div>
      ) : (
        <div className="md:flex hidden flex-1 justify-end items-center gap-x-3">
          <p>{userStorage.username}</p>
          <div
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setUserStorage(null);
            }}
            className="cursor-pointer md:grid hidden w-[35px] h-[35px] rounded-full bg-[#10B981] place-items-center"
          >
            {userStorage.username?.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
