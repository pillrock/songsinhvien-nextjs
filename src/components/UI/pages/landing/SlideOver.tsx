"use client";
import GradientBox from "../../common/GradientBox";
import Image from "next/image";
const ListSlide = [
  {
    srcImg: "/images/code.jpg",
    title: "Service 1",
    subTitle: "Description 1",
    cropImage: { x: 0, y: 0, w: 160, h: 200 },
  },
  {
    srcImg:
      "https://images.pexels.com/photos/25626515/pexels-photo-25626515.jpeg",
    title: "Service 2",
    subTitle: "Description 2",
    cropImage: { x: 0, y: 0, w: 160, h: 200 },
  },
  {
    srcImg:
      "https://images.pexels.com/photos/18069695/pexels-photo-18069695.png",
    title: "Service 3",
    subTitle: "Description 3",
    cropImage: { x: 0, y: 0, w: 160, h: 200 },
  },
  {
    srcImg:
      "https://images.pexels.com/photos/33740716/pexels-photo-33740716.jpeg",
    title: "Service 4",
    subTitle: "Description 4",
    cropImage: { x: 0, y: 0, w: 160, h: 200 },
  },
];

const sizeSlide = {
  width: 400,
  height: 300,
  gapX: 4,
};
const SlideOver = ({ anchors }: { anchors: "left" | "right" }) => {
  return (
    <div className="overflow-hidden w-full group relative mt-15">
      <div className={`flex animate-slide-over-${anchors} w-max relative `}>
        <div
          className={`gap-x-${sizeSlide.gapX} flex ${
            anchors == "right" && `relative left-[-1664px]`
          }`}
        >
          {ListSlide.map((item, index) => {
            return (
              <div
                style={{ width: `400px`, height: `300px` }}
                className={` ${
                  index == 0 && "ml-4"
                } overflow-hidden relative rounded-md`}
                key={item.subTitle}
              >
                <Image
                  className="hover:scale-[1.1] transition-all duration-300"
                  fill
                  src={item.srcImg}
                  alt="img1"
                />
              </div>
            );
          })}
        </div>
        <div
          className={`gap-x-${sizeSlide.gapX} flex ${
            anchors == "right" && `absolute left-0`
          }`}
        >
          {ListSlide.map((item, index) => {
            return (
              <div
                style={{ width: `400px`, height: `300px` }}
                className={` ${
                  index == 0 && "ml-4"
                } overflow-hidden relative rounded-md `}
                key={item.subTitle}
              >
                <Image
                  className="hover:scale-[1.1] transition-all duration-300"
                  fill
                  src={item.srcImg}
                  alt="img1"
                />
              </div>
            );
          })}
        </div>
      </div>

      <GradientBox
        anchors="to-r"
        colors={[
          "--background",
          "transparent",
          "transparent",
          "transparent",
          "--background",
        ]}
        className="absolute w-full h-full top-0 left-0 select-none pointer-events-none"
      ></GradientBox>
    </div>
  );
};

export default SlideOver;
