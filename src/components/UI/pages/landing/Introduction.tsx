import ButtonCustom from "../../common/ButtonCustom";
import NavText from "../../common/NavText";

function Introduction() {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-4xl font-logo sm:text-[56px] lg:text-[64px] xl:text-[72px]">
        Sống Sinh Viên
      </h1>
      <p className="text-[16px] text-[#c9cbcf] lg:text-[18px] text-center">
        Khám phá thế giới tiện ích dành riêng cho sinh viên.
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
