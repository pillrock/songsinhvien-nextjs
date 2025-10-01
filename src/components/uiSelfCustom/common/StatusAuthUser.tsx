"use client";
import { GithubIcon } from "lucide-react";
import { routes } from "@/lib/constants/routes";
import userService, { User } from "@/lib/api/user";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User_ extends User {
  isLogin: number;
}
const StatusAuthUser = () => {
  const [user, setUser] = useState<User_ | null>(null);
  const { isLogin, updateAuth, username } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const router = useRouter();
  console.log("alallal: ", isLoading, isLogin);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    await userService.logout();
    toast("Đã đăng xuất");
    localStorage.removeItem("user");
    setUser(null);
    router.push(routes.signin);
  };

  useEffect(() => {
    if (!username && localStorage.getItem("user")) {
      updateAuth({ ...JSON.parse(localStorage.getItem("user") as string) });
    }
    (async () => {
      if (isLogin == -1) return;
      if (isLogin == 1) {
        setIsLoading(true);
        console.log("daxxxx");
        return;
      }
      setIsLoading(false);
      const res = await userService.getUser();
      if (res.status == "ok" && res.data) {
        const data = res.data;
        updateAuth({
          isLogin: 1,
          name: data.name,
          username: data.username,
          userId: data.userId,
          roomId: data.roomId,
        });
      }
      setIsLoading(true);
    })();
  }, []);
  if (!user || user.isLogin !== 1) {
    return (
      <div className="hidden md:flex flex-1 justify-end">
        <Link
          className="flex items-center border-r border-gray-700 my-3"
          href={"https://github.com/pillrock"}
          target="_blank"
        >
          <Button variant={"link"}>
            <GithubIcon />
            Github
          </Button>
        </Link>
        <div className="flex items-center gap-x-2 justify-end ">
          <Link href={routes.signin}>
            <Button variant={"link"}>Đăng Nhập</Button>
          </Link>
          <Link href={routes.signup}>
            <Button className="bg-primary-1 hover:bg-primary-1 hover:opacity-90">
              Đăng Ký
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="md:flex hidden flex-1 justify-end items-center gap-x-3">
      {isLoading ? (
        <>
          <p>{user.username}</p>
          <div
            onClick={handleLogout}
            className={`cursor-pointer md:grid hidden w-[35px] h-[35px] rounded-full bg-[#10B981] place-items-center`}
          >
            {user.username?.charAt(0).toUpperCase()}
          </div>
        </>
      ) : (
        <>
          <p
            className={`bg-gray-700 block px-10 py-2 animate-pulse rounded-lg`}
          ></p>
          <div
            className={`bg-gray-700 animate-pulse cursor-pointer md:grid hidden w-[35px] h-[35px] rounded-full `}
          ></div>
        </>
      )}
    </div>
  );
};

export default StatusAuthUser;
