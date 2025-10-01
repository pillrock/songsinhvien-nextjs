"use client";
import GradientBox from "@/components/uiSelfCustom/common/GradientBox";
import GradientText from "@/components/uiSelfCustom/common/GradientText";
import InputCustom from "@/components/uiSelfCustom/common/InputCustom";
import { routes } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import userService from "@/lib/api/user";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/zustand/userStore";
import { getCookie } from "cookies-next/client";
import { useAuth } from "@/contexts/AuthContext";
export interface Auth {
  username: string;
  password: string;
  confirmPassword: string;
}

const InitAuth = {
  username: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const router = useRouter();
  const [auth, setAuth] = useState<Auth>(InitAuth);
  const isMatchPassword = auth.password === auth.confirmPassword;
  const [isSignupFail, setIsSignupFail] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const { isLogin } = JSON.parse(user);
      if (isLogin == 1) router.push(routes.home);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isMatchPassword) return;
    const dataResponse = await userService.registerUser({
      username: auth.username,
      password: auth.password,
    });
    if (dataResponse.status === "ok" && dataResponse.data) {
      const userData = { isLogin: 1, ...dataResponse.data };
      localStorage.setItem("user", JSON.stringify(userData));
      router.push(routes.home);
    } else setIsSignupFail(true);

    setAuth(InitAuth);
  };

  return (
    <div className="flex lg:mt-10 h-screen">
      <div className="flex-1 relative hidden md:block">
        <div className="absolute w-[200px] blur-lg h-[200px] left-[50%] top-[20%] bg-[#476EAE]"></div>
        <div className="absolute w-[200px]  blur-lg h-[200px] aspect-square left-[30%] top-[50%] rounded-full bg-[#A7E399] "></div>
        <div
          className="w-0 h-0 absolute top-[20%] blur-lg left-[10%]
            border-l-[100px] border-l-transparent
            border-r-[100px] border-r-transparent
            border-b-[150px] border-[#48B3AF]"
        ></div>
        <div className=" relative h-[30rem] ">
          <Image src={"/svgs/Launch.svg"} alt="auth" fill />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-1 items-center justify-center flex md:m-0"
        method="post"
      >
        <div className="p-5 md:p-10 md:pt-0 w-full md:w-[90%] flex flex-col gap-y-5 md:gap-y-7 lg:w-[80%] h-full">
          <div className="">
            <h1 className="text-4xl">Đăng ký</h1>
            <span>Chào mừng đến với </span>
            <GradientText
              className="  font-base-bold"
              anchors="to-r"
              colors={["#00CEDC", "#77D858"]}
            >
              Sống Sinh Viên
            </GradientText>
            {"!"}
          </div>
          <div>
            <InputCustom
              value={auth.username}
              onChangeValue={(value) =>
                setAuth((prev) => ({ ...prev, username: value }))
              }
              label="Tên người dùng*"
              id="username"
              required
              maxLength={20}
            />
            <InputCustom
              value={auth.password}
              onChangeValue={(value) =>
                setAuth((prev) => ({ ...prev, password: value }))
              }
              label="Mật khẩu*"
              id="password"
              type="password"
              required
            />
            <InputCustom
              value={auth.confirmPassword}
              onChangeValue={(value) =>
                setAuth((prev) => ({ ...prev, confirmPassword: value }))
              }
              label="Nhập lại mật khẩu*"
              id="confirm-password"
              type="password"
              required
            />
            <div
              className={`overflow-hidden transition-all max-h-0 duration-300 ${
                !isMatchPassword && "max-h-full"
              } `}
            >
              <p className={`text-sm text-yellow-600 py-2 transition-all `}>
                Mật khẩu không khớp
              </p>
            </div>
            <div
              className={`overflow-hidden transition-all max-h-0 duration-300 ${
                isSignupFail && !auth.password && "max-h-full"
              } `}
            >
              <p className={`text-sm text-red-800 py-2 transition-all `}>
                Tên người dùng đã tồn tại
              </p>
            </div>
            <button type="submit">
              <GradientBox
                anchors="to-r"
                colors={["transparent", "#00E599"]}
                className="w-full text-center rounded-md! opacity-90 hover:opacity-100 duration-300 transition-all cursor-pointer font-base-bold text-lg md:text-xl mt-5 p-2"
              >
                Đăng ký
              </GradientBox>
            </button>
            <div className="text-sm mt-2 text-right">
              <span>Đã có tài khoản? </span>
              <span className="text-[#00E599] underline">
                <Link href={routes.signin}>Đăng nhập</Link>
              </span>
            </div>
          </div>

          <div className="bg-foreground/20 h-[1px] relative ">
            <span className="absolute top-[-14px] bg-background left-[50%] translate-x-[-50%] text-foreground/30">
              or
            </span>
          </div>
          <div className="flex gap-x-2 px-4 py-3 hover:border-[#18a89f] border rounded-md font-base-bold text-foreground/70 hover:text-foreground/100 border-[#0B4F4A] transition-all duration-300 cursor-pointer  justify-center">
            <Image
              src={"/svgs/google.svg"}
              alt="ggIcon"
              width={24}
              height={24}
            />
            Đăng ký với Google
          </div>
        </div>
      </form>
    </div>
  );
}
