type GradientBoxProps = {
  anchors: "to-r" | "to-l" | "to-b" | "to-t" | "br" | "bl" | "tl" | "tr";
  colors: string[];
  children?: React.ReactNode;
  className?: string;
};

const anchorMap: Record<GradientBoxProps["anchors"], string> = {
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

const GradientBox = ({
  className,
  anchors,
  colors,
  children,
}: GradientBoxProps) => {
  const direction = anchorMap[anchors];
  const parsedColors = colors.map(parseColor);

  const gradientStyle = {
    background: `linear-gradient(${direction}, ${parsedColors.join(", ")})`,
  };

  return (
    <div className={className} style={gradientStyle}>
      {children}
    </div>
  );
};

export default GradientBox;
