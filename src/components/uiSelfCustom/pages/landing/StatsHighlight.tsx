import GradientBox from "../../common/GradientBox";

const StatsHighlight = () => {
  return (
    <>
      <GradientBox
        className="absolute w-full flex flex-wrap gap-4 text-[#00E599] justify-around left-0 h-[200px] p-10"
        anchors="to-r"
        colors={["transparent", "#415257", "#181920", "transparent"]}
      >
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl text-center font-base-bold">
            50K+
          </h1>
          <h1 className=" text-xs md:text-base text-foreground/50">
            Sinh viên tin dùng
          </h1>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl text-center font-base-bold">
            100+
          </h1>
          <h1 className="text-xs md:text-base text-foreground/50">
            Trường đại học
          </h1>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl text-center font-base-bold">
            1M+
          </h1>
          <h1 className="text-xs md:text-base text-foreground/50">
            Tài liệu chia sẻ
          </h1>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl text-center font-base-bold">
            99%
          </h1>
          <h1 className="text-xs md:text-base text-foreground/50">
            Độ hài lòng
          </h1>
        </div>
      </GradientBox>
      <div className="h-[200px]"></div>
    </>
  );
};
export default StatsHighlight;
