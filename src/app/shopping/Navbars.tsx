"use client";
import {
  CalendarCheck,
  HomeIcon,
  ShoppingBag,
  ShoppingCart,
  TextSearch,
} from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

const NavbarsData = [
  {
    id: 1,
    name: "Phòng của tôi",
    icon: <HomeIcon className="" size={24} />,
    href: "/shopping/room-info",
  },
  {
    id: 2,
    name: "Khoản mua",
    icon: <ShoppingCart className="" size={24} />,
    href: "/shopping/buy",
  },
  {
    id: 3,
    name: "Kết toán (tháng)",
    icon: <CalendarCheck className="" size={24} />,
    href: "/shopping/settlement",
  },
  {
    id: 4,
    name: "Phân tích",
    icon: <TextSearch className="" size={24} />,
    href: "/shopping/analysis",
  },
];
const Navbars = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div
      className="md:flex-[0_0_64px] justify-around fixed bottom-[5dvh]  w-[50dvh] flex-none
       md:sticky md:top-[13%] h-min overflow-hidden hover:flex-3 min-h-[60px] 
       flex md:flex-col flex-row pb-3 gap-y-3 border border-[#14524e] 
       bg-[#112933]/80 px-3 pt-3 rounded-2xl transition-all"
    >
      <div className="w-full h-full absolute top-0 left-0 backdrop-blur-[2px] z-[-1]"></div>
      <Link
        onClick={() => setActiveTab(0)}
        href={"/shopping"}
        className="flex gap-x-3 items-center"
      >
        <div className="p-2 bg-[#25C79F] w-min h-min rounded-xl">
          <ShoppingBag className="" size={24} />
        </div>
        <p className="text-lg hidden md:block font-base-bold whitespace-nowrap">
          QUẢN LÝ MUA SẮM
        </p>
      </Link>
      {NavbarsData.map((item) => (
        <NavbarsShopping
          href={item.href}
          id={item.id}
          key={item.id}
          icon={item.icon}
          title={item.name}
          activeId={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
};

export default Navbars;
const NavbarsShopping = ({
  id,
  icon,
  title,
  href,
  activeId,
  setActiveTab,
}: {
  id: number;
  icon: ReactNode;
  href: string;
  title: string;
  activeId: number;
  setActiveTab: (value: number) => void;
}) => {
  return (
    <Link
      href={href}
      onClick={() => setActiveTab(id)}
      className={` ${
        activeId == id && "text-[#25c79f]"
      } flex gap-x-3 items-center hover:ml-3 hover:text-[#25c79f] transition-all cursor-pointer`}
    >
      <div className="p-2  w-min h-min rounded-xl">{icon}</div>
      <p className="text-[15px] hidden md:block  whitespace-nowrap">{title}</p>
    </Link>
  );
};
