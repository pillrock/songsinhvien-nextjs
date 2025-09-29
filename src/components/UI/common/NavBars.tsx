"use client";

import NavText from "./NavText";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import useDisableScroll from "@/lib/utils/frontend/DisableScroll";
import {
  ChevronDown,
  ClipboardEdit,
  Download,
  ShoppingBagIcon,
} from "lucide-react";
import { routes } from "@/lib/constants/routes";
import { User } from "@/lib/api/user";
import { useUserStore } from "@/lib/zustand/userStore";
import { getCookie, getCookies, hasCookie } from "cookies-next/client";

export const NavBarsData = [
  {
    name: "Tiện ích",
    dropMenu: [
      {
        name: "Mua sắm",
        href: "/shopping",
        icon: <ShoppingBagIcon size={16} />,
        subName: "Quản lý chi tiền khi mua sắm",
      },
      {
        name: "Bảng tỉ số",
        href: "/score-board",
        icon: <ClipboardEdit size={16} />,
        subName: "Tạo lập bảng tỷ số",
      },
      {
        name: "Tải Video",
        href: "/dowload-video",
        icon: <Download size={16} />,
        subName: "Tải mọi video bằng đường Link",
      },
    ],
  },
  {
    name: "Câu hỏi thường gặp",
    href: "/faq",
  },
  {
    name: "Tài Liệu",
    href: "/documents",
  },
  {
    name: "Về chúng tôi",
    href: "/about",
  },
];

export default function NavBars() {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [indexOpenDropMenu, setIndexOpenDropMenu] = useState(-1);
  const profile = useUserStore((s) => s.profile);
  const [userStorage, setUserStorage] = useState<User | null>(null);

  useEffect(() => {
    setUserStorage(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null
    );
  }, [profile]);
  useDisableScroll(isOpenMobileMenu);

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
        <div className="justify-end gap-x-10 items-center hidden md:flex">
          {NavBarsData.map((item) =>
            item?.dropMenu ? (
              <NavText key={item.name} name={item.name} mainNav dropMenu>
                {item.dropMenu.map((subItem) => {
                  return (
                    <NavText
                      icon={subItem.icon}
                      href={subItem.href}
                      key={subItem.name}
                      name={subItem.name}
                      subName={subItem.subName}
                    >
                      {subItem.name}
                    </NavText>
                  );
                })}
              </NavText>
            ) : (
              <NavText name="FAQ" key={item.name} href={item.href} mainNav>
                <div>{item.name}</div>
              </NavText>
            )
          )}
        </div>
      </div>

      {/* navbars mobile */}
      <div
        onClick={() => {
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
         transition-all duration-300 z-10 select-none opacity-0 h-dvh pointer-events-none`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="overflow-y-scroll p-0">
            {NavBarsData.map((item, index) => {
              return (
                <div
                  key={item.name}
                  className="group/cac"
                  onClick={() => {
                    setIndexOpenDropMenu((prev) =>
                      index === prev ? -1 : index
                    );
                  }}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`flex justify-between text-[#c9cbcf] py-4 border-b border-[#181717] ${
                        indexOpenDropMenu === index && "text-foreground"
                      } group-hover/cac:text-foreground transition-all duration-300`}
                    >
                      <span className="font-base-bold ">{item.name}</span>
                      {item.dropMenu && (
                        <ChevronDown
                          className={`${
                            indexOpenDropMenu === index && "rotate-180"
                          } group-hover/cac:rotate-180 transition-all duration-300`}
                          size={17}
                        />
                      )}
                    </Link>
                  ) : (
                    <div
                      className={`flex justify-between text-[#c9cbcf] py-4 border-b border-[#181717] ${
                        indexOpenDropMenu === index && "text-foreground"
                      } transition-all duration-300 group-hover/cac:text-foreground`}
                    >
                      <span className="font-base-bold ">{item.name}</span>
                      {item.dropMenu && (
                        <ChevronDown
                          className={`${
                            indexOpenDropMenu === index && "rotate-180"
                          } group-hover/cac:rotate-180 transition-all duration-300`}
                          size={17}
                        />
                      )}
                    </div>
                  )}
                  {item.dropMenu && (
                    <div
                      className={`border-b ${
                        indexOpenDropMenu === index &&
                        "max-h-[300px] overflow-auto"
                      } border-[#181717] overflow-hidden max-h-0 group-hover/cac:max-h-[300px] group-hover/cac:overflow-auto transition-all duration-300`}
                    >
                      <div className="py-4">
                        {item.dropMenu.map((subItem) => {
                          return (
                            <NavText
                              icon={subItem.icon}
                              href={subItem.href}
                              key={subItem.name}
                              name={subItem.name}
                              subName={subItem.subName}
                              mobile
                            >
                              {subItem.name}
                            </NavText>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {!userStorage ? (
            <div className="py-8 flex flex-col md:flex-row gap-2 justify-between">
              <div
                onClick={() => setIsOpenMobileMenu(false)}
                className="flex-1"
              >
                <ButtonCustom
                  href={routes.signup}
                  className="w-full text-[14px] font-base-bold "
                >
                  Đăng ký
                </ButtonCustom>
              </div>
              <div
                className="flex-1"
                onClick={() => setIsOpenMobileMenu(false)}
              >
                <ButtonCustom
                  className="text-[14px] w-full font-base-bold flex-1"
                  full
                  href={routes.signin}
                >
                  Đăng nhập
                </ButtonCustom>
              </div>
            </div>
          ) : (
            <div className="flex justify-end items-center gap-x-2 mb-10">
              <p>{userStorage.username}</p>
              <div
                onClick={() => {
                  localStorage.removeItem("user");
                  setUserStorage(null);
                }}
                className="cursor-pointer grid w-[35px] h-[35px] rounded-full bg-[#10B981] place-items-center"
              >
                {userStorage.username?.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
