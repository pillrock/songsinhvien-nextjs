"use client";
import Content from "@/components/pages/landing/Content";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const tokenStoraged = localStorage.getItem("token");
    if (tokenStoraged) setToken(tokenStoraged);
  }, []);
  return (
    <div className="">
      {token ? (
        <div className="py-10 flex justify-center">
          <img src="https://placewaifu.com/image/200" alt="cc" />
        </div>
      ) : (
        <Content />
      )}
    </div>
  );
}
