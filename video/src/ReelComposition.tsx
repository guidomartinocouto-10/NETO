import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { FullBleedClip } from "./FullBleedClip";
import { Collage } from "./Collage";
import { CinematicLook } from "./CinematicLook";
import { clips } from "./clips";

export const REEL_DURATION_IN_FRAMES = 790;

const Beat: React.FC<{
  clipKey: keyof typeof clips;
  startFrom: number;
  durationInFrames: number;
  zoomDirection?: "in" | "out";
}> = ({ clipKey, startFrom, durationInFrames, zoomDirection = "in" }) => (
  <FullBleedClip
    clip={clips[clipKey]}
    startFrom={startFrom}
    durationInFrames={durationInFrames}
    zoomDirection={zoomDirection}
  />
);

const fadeT = (frames: number) => (
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: frames })} />
);

const Timeline: React.FC = () => (
  <TransitionSeries>
    {/* hook */}
    <TransitionSeries.Sequence durationInFrames={70}>
      <Beat clipKey="scooter" startFrom={0} durationInFrames={70} zoomDirection="in" />
    </TransitionSeries.Sequence>
    {fadeT(10)}

    <TransitionSeries.Sequence durationInFrames={55}>
      <Beat clipKey="pool" startFrom={20} durationInFrames={55} zoomDirection="in" />
    </TransitionSeries.Sequence>
    {fadeT(10)}

    <TransitionSeries.Sequence durationInFrames={50}>
      <Beat clipKey="beachNight" startFrom={30} durationInFrames={50} zoomDirection="out" />
    </TransitionSeries.Sequence>
    {fadeT(10)}

    <TransitionSeries.Sequence durationInFrames={55}>
      <Beat clipKey="roadWalk" startFrom={10} durationInFrames={55} zoomDirection="in" />
    </TransitionSeries.Sequence>

    {/* hard-cut whip-pan beat, no crossfade in or out */}
    <TransitionSeries.Sequence durationInFrames={20}>
      <Beat clipKey="marketBlur" startFrom={0} durationInFrames={20} zoomDirection="in" />
    </TransitionSeries.Sequence>

    <TransitionSeries.Sequence durationInFrames={60}>
      <Beat clipKey="drinking" startFrom={10} durationInFrames={60} zoomDirection="in" />
    </TransitionSeries.Sequence>
    {fadeT(10)}

    <TransitionSeries.Sequence durationInFrames={70}>
      <Beat clipKey="poolsideShoot" startFrom={5} durationInFrames={70} zoomDirection="out" />
    </TransitionSeries.Sequence>
    {fadeT(10)}

    <TransitionSeries.Sequence durationInFrames={55}>
      <Beat clipKey="concert" startFrom={20} durationInFrames={55} zoomDirection="in" />
    </TransitionSeries.Sequence>
    {fadeT(10)}

    <TransitionSeries.Sequence durationInFrames={60}>
      <Beat clipKey="marketGuy" startFrom={0} durationInFrames={60} zoomDirection="in" />
    </TransitionSeries.Sequence>
    {fadeT(12)}

    {/* scattered collage recap moment */}
    <TransitionSeries.Sequence durationInFrames={95}>
      <Collage />
    </TransitionSeries.Sequence>
    {fadeT(14)}

    <TransitionSeries.Sequence durationInFrames={55}>
      <Beat clipKey="scooter" startFrom={180} durationInFrames={55} zoomDirection="in" />
    </TransitionSeries.Sequence>
    {fadeT(8)}

    <TransitionSeries.Sequence durationInFrames={50}>
      <Beat clipKey="roadWalk" startFrom={140} durationInFrames={50} zoomDirection="out" />
    </TransitionSeries.Sequence>
    {fadeT(8)}

    <TransitionSeries.Sequence durationInFrames={45}>
      <Beat clipKey="drinking" startFrom={90} durationInFrames={45} zoomDirection="in" />
    </TransitionSeries.Sequence>
    {fadeT(8)}

    <TransitionSeries.Sequence durationInFrames={50}>
      <Beat clipKey="beachNight" startFrom={180} durationInFrames={50} zoomDirection="out" />
    </TransitionSeries.Sequence>
    {fadeT(10)}

    <TransitionSeries.Sequence durationInFrames={50}>
      <Beat clipKey="concert" startFrom={150} durationInFrames={50} zoomDirection="in" />
    </TransitionSeries.Sequence>
    {fadeT(10)}

    {/* finale */}
    <TransitionSeries.Sequence durationInFrames={80}>
      <Beat clipKey="yard" startFrom={10} durationInFrames={80} zoomDirection="out" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

const FadeToBlackOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const opacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return <AbsoluteFill style={{ backgroundColor: "#000", opacity, pointerEvents: "none" }} />;
};

export const ReelComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <CinematicLook>
        <Timeline />
      </CinematicLook>
      <FadeToBlackOutro />
    </AbsoluteFill>
  );
};
