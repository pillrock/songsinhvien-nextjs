"use client";

import { BadgeCheck, CopyIcon, CrownIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type DataTest = {
  id: string;
  name: string;
  data: {
    capacity?: string;
    color?: string;
  };
};

export default function RoomInfo({ data }: { data: DataTest[] }) {
  return (
    <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-x-4">
      <div className="p-4 rounded-xl">
        <h1 className="text-gray-400">THÔNG TIN PHÒNG</h1>
        <div className="mt-5 flex gap-5 flex-wrap justify-center lg:justify-start">
          <div className="relative overflow-hidden w-[100px] lg:w-[200px] h-[100px] lg:h-[200px] rounded-full ring-2 ring-[#10B981] ring-offset-6 ring-offset-[#050505]">
            <Image
              src={
                "https://images.pexels.com/photos/5483071/pexels-photo-5483071.jpeg"
              }
              fill
              alt="roomImage"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center">
              <span className="text-gray-400 text-sm mr-1">Mã phòng: </span>
              <span className="text-base font-base-bold"> 2172717</span>
              <span className="inline-block ml-2 cursor-pointer text-[#10B981]">
                <CopyIcon size={15} />
              </span>
            </p>
            <div className="h-[1px] bg-gray-700"></div>
            <p>
              <span className="text-gray-400 text-sm">Tên phòng: </span>
              <span className="text-base font-base-bold">TÌNH ANH EM</span>
            </p>
            <p>
              <span className="text-gray-400 text-sm">Ghi chú: </span>
              <span className="text-base font-base-bold">
                Phòng dành cho anh em sinh viên
              </span>
            </p>
            <p>
              <span className="text-gray-400 text-sm">Ngày tạo: </span>
              <span className="text-base font-base-bold">20/10/2023</span>
            </p>
            <div className="h-[1px] bg-gray-700"></div>

            <p className="flex items-center">
              <span className="text-gray-400 text-sm mr-1">Người tạo: </span>
              <span className="text-base font-base-bold flex items-center">
                pillrock06
                <span className="text-blue-500 ml-2 inline-block">
                  <BadgeCheck size={19} />
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl">
        <h1 className="text-gray-400">THÀNH VIÊN (4)</h1>
        <div className="flex gap-2 flex-col mt-5">
          <User
            dataUser={{
              username: "Thanhdat",
              colorAvatar: "#10B981",
              isCreatorRoom: true,
            }}
          />
          <User dataUser={{ username: "Anhkhoa", colorAvatar: "#B203FC" }} />
          <User dataUser={{ username: "duong", colorAvatar: "#F37679" }} />
          <User dataUser={{ username: "nguyendat", colorAvatar: "#124AA6" }} />
        </div>
      </div>
    </div>
  );
}

type User = {
  username: string;
  colorAvatar: string;
  isCreatorRoom?: boolean;
};
const User = ({ dataUser }: { dataUser: User }) => {
  return (
    <div className="flex relative gap-x-2 px-2 py-4 hover:bg-[#0F222A] rounded-xl">
      <div
        style={{ backgroundColor: dataUser.colorAvatar }}
        className={`w-[35x] h-[35px] rounded-full p-2  max-w-min aspect-square flex justify-center items-center`}
      >
        {dataUser.username.charAt(0).toUpperCase()}
      </div>
      <span className="flex items-center">
        {dataUser.username}
        {dataUser.isCreatorRoom && (
          <CrownIcon className="text-yellow-400 ml-2" size={15} />
        )}
      </span>
      {!dataUser.isCreatorRoom && (
        <div className="absolute right-5 hover:bg-red-600 hover:text-foreground rounded-lg flex cursor-pointer justify-end items-center p-2 text-red-500">
          <LogOutIcon size={19} />
        </div>
      )}
    </div>
  );
};
