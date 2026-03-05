interface CornerAccentProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: "sm" | "md" | "lg";
  opacity?: number;
}

export default function CornerAccent({
  position,
  size = "md",
  opacity = 50
}: CornerAccentProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const positionClasses = {
    "top-left": "top-8 left-8 border-l-2 border-t-2",
    "top-right": "top-8 right-8 border-r-2 border-t-2",
    "bottom-left": "bottom-8 left-8 border-l-2 border-b-2",
    "bottom-right": "bottom-8 right-8 border-r-2 border-b-2",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} border-[#c45a32]`}
      style={{ opacity: opacity / 100 }}
    />
  );
}