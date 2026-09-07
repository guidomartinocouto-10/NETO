import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { ClipDef } from "./clips";

/**
 * Renders a video clip filling the whole 1080x1920 frame. Every source
 * clip is landscape (~16:9), so a blurred, scaled-up copy of the same
 * clip fills the background and the real footage stays fully visible
 * (object-fit: contain) on top instead of being cropped to a thin
 * center strip. A subtle continuous Ken Burns zoom adds motion energy
 * even on static-ish shots.
 */
export const FullBleedClip: React.FC<{
  clip: ClipDef;
  startFrom?: number;
  volume?: number;
  durationInFrames?: number;
  zoomDirection?: "in" | "out";
}> = ({ clip, startFrom = 0, volume = 1, durationInFrames, zoomDirection = "in" }) => {
  const src = staticFile(clip.src);
  const frame = useCurrentFrame();

  const scale = durationInFrames
    ? interpolate(
        frame,
        [0, durationInFrames],
        zoomDirection === "in" ? [1, 1.07] : [1.07, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ filter: "blur(45px) brightness(0.5)", transform: `scale(${scale * 1.2})` }}>
        <OffthreadVideo
          src={src}
          startFrom={startFrom}
          volume={0}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${scale})`,
        }}
      >
        <OffthreadVideo
          src={src}
          startFrom={startFrom}
          volume={volume}
          style={{ width: "100%", objectFit: "contain" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
