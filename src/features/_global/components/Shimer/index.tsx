interface SkeletonProps {
  width?: string;
  height?: string;
  aspectRatio?: string;
  borderRadius?: string;
  className?: string;
  // The app is light-only (Tailwind dark: utilities never activate —
  // no code ever adds a .dark ancestor), so a dark surface needs an
  // explicit tone: pass "dark" where the bars sit on a dark
  // background (e.g. the learning sidebar with dark mode on).
  tone?: "light" | "dark";
}

const TONES = {
  light: `linear-gradient(90deg, rgba(200, 200, 200, 1) 25%, rgba(230, 230, 230, 1) 50%, rgba(200, 200, 200, 1) 75%)`,
  dark: `linear-gradient(90deg, rgba(55, 65, 81, 1) 25%, rgba(75, 85, 99, 1) 50%, rgba(55, 65, 81, 1) 75%)`,
} as const;

export const Skeleton: React.FC<SkeletonProps> = ({
  height = "100px",
  width = "100%",
  aspectRatio,
  borderRadius,
  className,
  tone = "light",
}) => {
  return (
    <div
      className={className}
      style={{
        height,
        borderRadius: borderRadius || "0.5rem",
        background: TONES[tone],
        backgroundSize: "200% 100%",
        animation: "loading 2s infinite ease-in-out",
        width,
        aspectRatio,
      }}
    ></div>
  );
};
