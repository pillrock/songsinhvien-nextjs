"use client";
import ButtonCustom from "@/components/UI/common/ButtonCustom";
import GradientBox from "@/components/UI/common/GradientBox";
import GradientText from "@/components/UI/common/GradientText";
import InputCustom from "@/components/UI/common/InputCustom";
import { routes } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface Auth {
  username: string;
  password: string;
  confirmPassword: string;
}

const InutAuth = {
  username: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [auth, setAuth] = useState<Auth>(InutAuth);
  console.log(auth);

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
            />
            <InputCustom
              value={auth.password}
              onChangeValue={(value) =>
                setAuth((prev) => ({ ...prev, password: value }))
              }
              label="Mật khẩu*"
              id="password"
              type="password"
            />
            <InputCustom
              value={auth.confirmPassword}
              onChangeValue={(value) =>
                setAuth((prev) => ({ ...prev, confirmPassword: value }))
              }
              label="Nhập lại mật khẩu*"
              id="confirm-password"
              type="password"
            />
            <GradientBox
              anchors="to-r"
              colors={["transparent", "#00E599"]}
              className="w-full text-center rounded-md! opacity-90 hover:opacity-100 duration-300 transition-all cursor-pointer font-base-bold text-lg md:text-xl mt-5 p-2"
            >
              Đăng ký
            </GradientBox>
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
