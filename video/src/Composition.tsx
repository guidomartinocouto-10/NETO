import { Composition } from "remotion";
import { ReelComposition, REEL_DURATION_IN_FRAMES } from "./ReelComposition";
import { FPS, WIDTH, HEIGHT } from "./clips";

export const Reel = () => {
  return (
    <Composition
      id="Reel"
      component={ReelComposition}
      durationInFrames={REEL_DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
