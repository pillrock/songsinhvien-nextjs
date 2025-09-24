import Introduction from "../../UI/pages/landing/Introduction";
import SlideOver from "@/components/UI/pages/landing/SlideOver";
import StatsHighlight from "@/components/UI/pages/landing/StatsHighlight";
import TalkAboutUs from "@/components/UI/pages/landing/TalkAboutUs";

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
