"use client";
import ButtonCustom from "@/components/uiSelfCustom/common/ButtonCustom";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="h-screen flex justify-center relative">
      <div className="relative w-[400px] h-[400px]">
        <Image src={"/images/404.png"} alt="404" fill />
      </div>
      <span
        className="absolute top-[46%] px-4 py-1"
        onClick={() => router.back()}
      >
        <ButtonCustom full>Không tìm thấy trang, quay trở lại</ButtonCustom>
      </span>
    </div>
  );
}
