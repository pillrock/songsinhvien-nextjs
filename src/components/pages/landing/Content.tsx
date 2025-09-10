import GradientBox from "@/components/UI/common/GradientBox";
import Introduction from "../../UI/pages/landing/Introduction";
import SlideOver from "@/components/UI/pages/landing/SlideOver";
import StatsHighlight from "@/components/UI/pages/landing/StatsHighlight";
import TalkAboutUs from "@/components/UI/pages/landing/TalkAboutUs";

function Content() {
  return (
    <div className="px-5 pt-9 lg:pt-18 lg:px-[12rem]">
      <Introduction />
      <div className="mb-20">
        <SlideOver anchors="left" />
        <SlideOver anchors="right" />
      </div>
      <StatsHighlight />
      <TalkAboutUs />
    </div>
  );
}

export default Content;
