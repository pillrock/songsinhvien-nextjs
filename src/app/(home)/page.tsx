"use client";
import Content from "@/components/pages/landing/Content";
import { hasCookie, getCookie } from "cookies-next/client";
import { useEffect, useState } from "react";
export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (hasCookie("auth-token")) setToken(getCookie("auth-token") as string);
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
