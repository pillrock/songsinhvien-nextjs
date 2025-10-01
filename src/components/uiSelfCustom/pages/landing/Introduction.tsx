import { Button } from "@/components/ui/button";
import GradientText from "../../common/GradientText";
import Link from "next/link";
import { routes } from "@/lib/constants/routes";
import { MoveRightIcon } from "lucide-react";

function Introduction() {
  return (
    <div className="flex items-center justify-center flex-col pt-2 md:pt-10">
      <div className="text-center">
        <GradientText
          className="text-xs md:text[14px] lg:text-[16px]"
          anchors="to-r"
          colors={["#ec4899", "#a855f7", "#6366f1"]}
        >
          Nền tảng #1 dành cho sinh viên Việt Nam
        </GradientText>
      </div>
      <h1 className="text-4xl font-logo sm:text-[56px] lg:text-[64px] xl:text-[72px]">
        Sống Sinh Viên
      </h1>
      <p className="text-xs text-[#c9cbcf] lg:text-[18px] md:px-[20%] text-center">
        Khám phá các tiện ích học tập, giải trí và quản lý dành riêng cho sinh
        viên. Từ lập lịch học tập đến tìm việc làm thêm, chúng tôi có tất cả!
      </p>
      <div className="mt-8 flex items-center gap-6">
        <Link href={routes.signup}>
          <Button
            size={"lg"}
            className="bg-primary-1 hover:bg-primary-1/90 hover:opacity-90"
          >
            Bắt đầu miễn phí
          </Button>
        </Link>

        <Link href={routes.signup}>
          <Button size={"icon"} variant={"link"}>
            Góp ý
            <MoveRightIcon size={19} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Introduction;
