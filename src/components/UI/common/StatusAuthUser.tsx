"use client";
import { GithubIcon } from "lucide-react";
import NavText from "./NavText";
import ButtonCustom from "./ButtonCustom";
import { routes } from "@/lib/constants/routes";
import userService from "@/lib/api/user";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const StatusAuthUser = () => {
  const { isLogin, updateAuth, username } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  console.log("alallal: ", isLoading, isLogin);

  useEffect(() => {
    (async () => {
      if (isLogin == -1) return;
      if (isLogin == 1) return setIsLoading(true);
      setIsLoading(false);
      const res = await userService.getUser();
      if (res.status == "ok" && res.data) {
        const data = res.data;
        updateAuth({
          isLogin: 1,
          name: data.name,
          username: data.username,
          userId: data.userId,
          roomId: data.roomId,
        });
      }
      setIsLoading(true);
    })();
  }, []);
  return isLogin == -1 ? (
    <div className="hidden md:flex flex-1 justify-end gap-x-4 ">
      <div className="flex justify-end items-center">
        <NavText name="Product" href={"https://github.com/pillrock"} mainNav>
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
      {isLoading ? (
        <>
          <p>{username}</p>
          <div
            onClick={async () => {
              updateAuth({ isLogin: -1 });
              await userService.logout();
            }}
            className={`${
              !isLoading && "bg-gray-600 animate-pulse"
            } cursor-pointer md:grid hidden w-[35px] h-[35px] rounded-full bg-[#10B981] place-items-center`}
          >
            {username.charAt(0).toUpperCase()}
          </div>
        </>
      ) : (
        <>
          <p
            className={` ${"bg-gray-700 block px-10 py-2 animate-pulse rounded-lg"}`}
          ></p>
          <div
            className={`${"bg-gray-700 animate-pulse"} cursor-pointer md:grid hidden w-[35px] h-[35px] rounded-full `}
          ></div>
        </>
      )}
    </div>
  );
};

export default StatusAuthUser;
