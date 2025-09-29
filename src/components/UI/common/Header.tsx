"use client";
import { useEffect, useState } from "react";
import NavBars from "./NavBars";
import GradientBox from "./GradientBox";
import StatusAuthUser from "./StatusAuthUser";
function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentStick = window.scrollY > 0;
      if (currentStick != isSticky) setIsSticky(currentStick);
    };
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
      <StatusAuthUser />
    </div>
  );
}

export default Header;
