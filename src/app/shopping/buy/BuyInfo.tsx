"use client";
import InputCustom from "@/components/uiSelfCustom/common/InputCustom";
import InputCustom2 from "@/components/uiSelfCustom/common/InputCustom2";
import { useState } from "react";

type DataBuy = {
  time: string;
  price: number;
  note: string;
  helpBuy: boolean;

  idsUserDevide: number[];

  idCategory: number;
  idUserCreator: number;
  idRoom: number;
};

const initDataBuy: DataBuy = {
  time: "",
  price: 0,
  note: "",
  helpBuy: false,
  idsUserDevide: [],
  idCategory: 0,
  idUserCreator: 0,
  idRoom: 0,
};
const BuyInfo = () => {
  const [dataBuy, setDataBuy] = useState<DataBuy>(initDataBuy);
  return (
    <div className="grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-x-4">
      <div className="p-4 rounded-xl">
        <h1 className="text-gray-400">TẠO KHOẢN MUA</h1>
        <div className="mt-5 flex gap-5">
          <InputCustom2 label="xinchao" />
        </div>
      </div>
      <div className="p-4 rounded-xl">
        <h1 className="text-gray-400">KHOẢN MUA ĐÃ TẠO</h1>
        <div className="flex gap-2 flex-col mt-5"></div>
      </div>
    </div>
  );
};

export default BuyInfo;
