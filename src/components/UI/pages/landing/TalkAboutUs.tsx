"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const TalkAboutUs = () => {
  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="h-screen pt-20 flex relative flex-col">
      <div className="text-4xl text-center mb-10">
        Mọi người nói gì về Sống Sinh Viên
      </div>
      <div>
        <Image
          src={"/images/napoleon.jpg"}
          alt="img"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};
export default TalkAboutUs;
