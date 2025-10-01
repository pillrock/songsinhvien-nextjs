import React from "react";

type GradientTextProps = {
  anchors: "to-r" | "to-l" | "to-b" | "to-t" | "br" | "bl" | "tl" | "tr";
  colors: string[];
  children?: React.ReactNode;
  className?: string;
};

const anchorMap: Record<GradientTextProps["anchors"], string> = {
  "to-r": "to right",
  "to-l": "to left",
  "to-b": "to bottom",
  "to-t": "to top",
  br: "to bottom right",
  bl: "to bottom left",
  tl: "to top left",
  tr: "to top right",
};

function parseColor(color: string) {
  if (color === "transparent") return "transparent";
  if (color.startsWith("--")) return `var(${color})`;
  return color;
}

const GradientText = ({
  className,
  anchors,
  colors,
  children,
}: GradientTextProps) => {
  const direction = anchorMap[anchors];
  const parsedColors = colors.map(parseColor);

  const gradientStyle = {
    background: `linear-gradient(${direction}, ${parsedColors.join(", ")})`,
    backgroundClip: "text" as const,
    WebkitBackgroundClip: "text" as const,
    color: "transparent",
  };

  return (
    <span className={className} style={gradientStyle}>
      {children}
    </span>
  );
};

export default GradientText;
