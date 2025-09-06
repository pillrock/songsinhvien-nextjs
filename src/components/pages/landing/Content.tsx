import Introduction from "../../UI/pages/landing/Introduction";
import SlideOver from "@/components/UI/pages/landing/SlideOver";

function Content() {
  return (
    <div className="px-5 pt-9 lg:pt-18 lg:px-[12rem]">
      <Introduction />
      <SlideOver anchors="left" />
      <SlideOver anchors="right" />

      <div className="h-[1000px]">CONTENT</div>
    </div>
  );
}

export default Content;
