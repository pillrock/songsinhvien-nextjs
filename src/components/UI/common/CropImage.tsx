import Image, { StaticImageData } from "next/image";

type CropImageProps = {
  src: StaticImageData | string; // ảnh lớn (sprite hoặc ảnh bất kỳ)
  x: number; // toạ độ X (px) từ góc trái trên
  y: number; // toạ độ Y (px) từ góc trái trên
  w: number; // chiều rộng vùng cắt
  h: number; // chiều cao vùng cắt
  alt?: string;
};

const CropImage = ({
  src,
  x,
  y,
  w,
  h,
  alt = "cropped image",
}: CropImageProps) => {
  return (
    <div
      style={{ width: w, height: h, overflow: "hidden", position: "relative" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{
          objectFit: "none",
          objectPosition: `-${x}px -${y}px`,
        }}
      />
    </div>
  );
};

export default CropImage;
