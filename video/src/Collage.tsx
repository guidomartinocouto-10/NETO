import { AbsoluteFill, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { ClipDef } from "./clips";

type Card = {
  clip: ClipDef;
  startFrom: number;
  offsetX: number;
  offsetY: number;
  rotate: number;
  width: number;
  height: number;
  delay: number;
};

const CARDS: Card[] = [
  { clip: { src: "videos/2_pool.mp4" }, startFrom: 30, offsetX: -50, offsetY: -220, rotate: -9, width: 660, height: 840, delay: 0 },
  { clip: { src: "videos/3_beach_night.mp4" }, startFrom: 40, offsetX: 70, offsetY: -50, rotate: 6, width: 660, height: 840, delay: 8 },
  { clip: { src: "videos/8_concert.mp4" }, startFrom: 20, offsetX: -80, offsetY: 150, rotate: -5, width: 660, height: 840, delay: 16 },
  { clip: { src: "videos/10_yard.mp4" }, startFrom: 15, offsetX: 40, offsetY: 330, rotate: 10, width: 660, height: 840, delay: 24 },
];

const CollageCard: React.FC<{ card: Card }> = ({ card }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - card.delay;

  const enter = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 110 },
  });
  const opacity = interpolate(localFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(enter, [0, 1], [0.6, 1]);
  const settleY = interpolate(enter, [0, 1], [80, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(50% + ${card.offsetX}px)`,
        top: `calc(50% + ${card.offsetY}px)`,
        width: card.width,
        height: card.height,
        transform: `translate(-50%, -50%) translateY(${settleY}px) rotate(${card.rotate}deg) scale(${scale})`,
        opacity,
        boxShadow: "0 20px 45px rgba(0,0,0,0.55)",
        border: "10px solid #fff",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <OffthreadVideo
        src={staticFile(card.clip.src)}
        startFrom={card.startFrom}
        volume={0}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export const Collage: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      {CARDS.map((card, i) => (
        <CollageCard key={i} card={card} />
      ))}
    </AbsoluteFill>
  );
};
