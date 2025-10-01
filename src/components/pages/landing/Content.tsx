import Introduction from "../../uiSelfCustom/pages/landing/Introduction";
import SlideOver from "@/components/uiSelfCustom/pages/landing/SlideOver";
import StatsHighlight from "@/components/uiSelfCustom/pages/landing/StatsHighlight";
import TalkAboutUs from "@/components/uiSelfCustom/pages/landing/TalkAboutUs";

function LandingPage() {
  return (
    <>
      <Introduction />
      <div className="mb-20">
        <SlideOver anchors="left" />
        <SlideOver anchors="right" />
      </div>
      <StatsHighlight />
      <TalkAboutUs />
    </>
  );
}

export default LandingPage;
