import ButtonCustom from "../../common/ButtonCustom";
import GradientText from "../../common/GradientText";
import NavText from "../../common/NavText";

function Introduction() {
  return (
    <div className="flex items-center justify-center flex-col">
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
      <p className="text-[16px] text-[#c9cbcf] lg:text-[18px] text-center">
        Khám phá các tiện ích học tập, giải trí và quản lý dành riêng cho sinh
        viên. Từ lập lịch học tập đến tìm việc làm thêm, chúng tôi có tất cả!
      </p>
      <div className="mt-8 flex items-center gap-6">
        <ButtonCustom href={"/signup"} full className="p-3 px-8 font-base-bold">
          Bắt đầu miễn phí
        </ButtonCustom>
        <NavText
          href={"/feedback"}
          name="Góp ý"
          arrow
          className="cursor-pointer"
        >
          Góp ý
        </NavText>
      </div>
    </div>
  );
}

export default Introduction;
