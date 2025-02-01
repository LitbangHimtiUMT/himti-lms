interface SkeletonProps {
  width?: string;
  height?: string;
  aspectRatio?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height = "100px",
  width = "100%",
  aspectRatio,
}) => {
  return (
    <div
      className="rounded-lg bg-gray-300"
      style={{
        height,
        background: `linear-gradient(90deg, rgba(200, 200, 200, 1) 25%, rgba(230, 230, 230, 1) 50%, rgba(200, 200, 200, 1) 75%)`,
        backgroundSize: "200% 100%",
        animation: "loading 2s infinite ease-in-out",
        width,
        aspectRatio,
      }}
    ></div>
  );
};
