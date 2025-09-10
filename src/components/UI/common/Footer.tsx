import Link from "next/link";
import Image from "next/image";
import GradientBox from "./GradientBox";

const ListFooter = [
  {
    title: "về chúng tôi",
    items: [
      { text: "Blogs", href: "/" },
      { text: "Tuyển dụng", href: "/" },
      { text: "Liên hệ", href: "/" },
      { text: "Đối tác", href: "/" },
      { text: "Bảo mật", href: "/" },
      { text: "Điều khoản sử dụng", href: "/" },
    ],
  },
  {
    title: "Tài nguyên",
    items: [
      { text: "Hướng dẫn sử dụng", href: "/" },
      { text: "Hỗ trợ sinh viên", href: "/" },
      { text: "Nhật ký cập nhật", href: "/" },
      { text: "Bí kíp học tập", href: "/" },
      { text: "Chia sẻ phòng trọ", href: "/" },
      { text: "Quản lý chi tiêu", href: "/" },
      { text: "Tài liệu, eBook, đề cương", href: "/" },
    ],
  },
  {
    title: "Tiện ích",
    items: [
      { text: "Quản lý deadline", href: "/" },
      { text: "Ghi chú & To-do List", href: "/" },
      { text: "Quản lý mua sắm", href: "/shopping" },
      { text: "Góc giải trí - memes", href: "/" },
    ],
  },
];

function Footer() {
  return (
    <>
      <GradientBox
        className="w-screen relative left-0 h-[1px]"
        anchors="to-r"
        colors={["transparent", "gray", "transparent"]}
      />
      <div className="px-5 pt-8 pb-10 md:pt-10 md:px-8 lg:pt-9 lg:px-7 lg:pb-13 flex flex-col md:flex-row gap-y-5">
        <div className="flex flex-col justify-between">
          <Link className="flex items-center gap-x-1" href={"/"}>
            <Image
              className="w-[40px] h-[30px]"
              src={"/images/logo.png"}
              width={40}
              height={30}
              alt="img-neon-temp"
            />
            <div className="font-logo flex text-2xl gap-x-[2px]">
              <span className="text-[#00C7CC]">S</span>
              <span className="text-[#00C7CC]">S</span>
              <span className="text-[#42D75B]">V</span>
            </div>
          </Link>
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} Sống Sinh Viên. All rights
            reserved.
          </p>
        </div>
        <div className="flex justify-around flex-1">
          {ListFooter.map((item) => {
            return (
              <div key={item.title}>
                <h1 className="text-xs md:text-sm font-base-bold mb-4">
                  {item.title.toUpperCase()}
                </h1>
                <div className="md:text-[15px]  text-xs text-foreground/60 flex flex-col gap-y-3">
                  {item.items.map((info) => {
                    return (
                      <Link
                        key={info.text}
                        href={info.href}
                        className="hover:text-[#01C483]"
                      >
                        {info.text}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Footer;
