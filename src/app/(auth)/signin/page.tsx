"use client";
import GradientBox from "@/components/UI/common/GradientBox";
import GradientText from "@/components/UI/common/GradientText";
import InputCustom from "@/components/UI/common/InputCustom";
import userService from "@/lib/api/user";
import { routes } from "@/lib/constants/routes";
import { useUserStore } from "@/lib/zustand/userStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

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
  const [isLoginFail, setIsLoginFail] = useState(false);
  const setUser = useUserStore((s) => s.setUser);
  //check token exists
  useEffect(() => {
    const tokenStoraged = localStorage.getItem("token");
    if (tokenStoraged) router.push(routes.home);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const dataResponse = await userService.loginUser(auth);
    if (dataResponse.status === "ok") {
      console.log(dataResponse);

      //save
      localStorage.setItem(
        "token",
        dataResponse.data ? dataResponse.data.access_token : ""
      );
      localStorage.setItem(
        "user",
        dataResponse.data ? JSON.stringify(dataResponse.data) : ""
      );
      setUser((prev) => ({
        ...prev,
        token: dataResponse.data ? dataResponse.data.access_token : "",
      }));

      router.push(routes.home);
    } else setIsLoginFail(true);

    setAuth(InitAuth);
  };

  return (
    <div className="flex lg:mt-10 h-screen">
      <div className="flex-1 relative hidden md:block">
        <div className="absolute w-[200px] blur-xl h-[200px] left-[50%] top-[20%] bg-[#476EAE]"></div>
        <div className="absolute w-[200px]  blur-xl h-[200px] aspect-square left-[30%] top-[50%] rounded-full bg-[#A7E399] "></div>
        <div
          className="w-0 h-0 absolute top-[20%] blur-xl left-[10%]
            border-l-[100px] border-l-transparent
            border-r-[100px] border-r-transparent
            border-b-[150px] border-[#48B3AF]"
        ></div>
        <div className=" relative h-[30rem]">
          <Image src={"/svgs/Launch.svg"} alt="auth" fill />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 items-center justify-center flex md:m-0"
        method="post"
      >
        <div className="p-5 md:p-10 md:pt-0 w-full md:w-[90%] flex flex-col gap-y-5 md:gap-y-7 lg:w-[80%] h-full">
          <div className="relative">
            <h1 className="text-4xl">Đăng nhập</h1>
            <span>Chào mừng trở lại </span>
            <GradientText
              className="  font-base-bold"
              anchors="to-r"
              colors={["#00CEDC", "#77D858"]}
            >
              Sống Sinh Viên
            </GradientText>
            {"!"}
            <div className="absolute block md:hidden w-full h-full top-0 left-0 blur-md z-[-1]">
              <Image
                src={"/images/bgauth.jpg"}
                alt="logo"
                fill
                className="z-[-1] object-cover "
              />
            </div>
          </div>
          <div>
            <InputCustom
              className={`${isLoginFail && !auth.username && "border-red-600"}`}
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
              className={`${isLoginFail && !auth.password && "border-red-600"}`}
              value={auth.password}
              onChangeValue={(value) =>
                setAuth((prev) => ({ ...prev, password: value }))
              }
              label="Mật khẩu*"
              id="password"
              type="password"
              required
            />
            <div
              className={`overflow-hidden transition-all max-h-0 duration-300 ${
                isLoginFail && !auth.password && "max-h-full"
              } `}
            >
              <p className={`text-sm text-red-800 py-2 transition-all `}>
                Tên người dùng hoặc mật khẩu không chính xác
              </p>
            </div>
            {/* {true && (
              <div className="flex my-2 p-4 bg-[#FFEE58] text-[#9b7616] border border-[#F2B705]">
                <AlertOctagon size={24} />
                <p className="text-sm ">Đăng nhập không thành công</p>
              </div>
            )} */}
            <button className="w-full">
              <GradientBox
                anchors="to-r"
                colors={["transparent", "#00E599"]}
                className="w-full text-center rounded-md! opacity-90 hover:opacity-100 duration-300 transition-all cursor-pointer font-base-bold text-lg md:text-xl mt-5 p-2"
              >
                Đăng nhập
              </GradientBox>
            </button>
            <div className="text-sm mt-2 text-right">
              <span>Chưa có tài khoản? </span>
              <span className="text-[#00E599] underline">
                <Link href={routes.signup}>Đăng ký</Link>
              </span>
            </div>
          </div>

          <div className="bg-foreground/20 h-[1px] relative transition-all ">
            <span className="absolute top-[-14px] bg-background left-[50%] translate-x-[-50%] text-foreground/30">
              or
            </span>
          </div>
          <div className="flex gap-x-2 px-4 py-3  border rounded-md font-base-bold text-foreground/70 hover:text-foreground/100 border-[#2b2b2b] transition-all duration-300 cursor-pointer  justify-center">
            <Image
              src={"/svgs/google.svg"}
              alt="ggIcon"
              width={24}
              height={24}
            />
            Đăng nhập với Google
          </div>
        </div>
      </form>
    </div>
  );
}
