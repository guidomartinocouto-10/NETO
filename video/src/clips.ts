export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

export type ClipDef = {
  src: string;
};

// All 10 source clips are landscape (~16:9) once correctly rotated - none
// are native portrait - so every clip gets the blurred-background fill
// treatment in FullBleedClip to avoid over-cropping subjects.
export const clips = {
  scooter: { src: "videos/1_scooter.mp4" },
  pool: { src: "videos/2_pool.mp4" },
  beachNight: { src: "videos/3_beach_night.mp4" },
  marketBlur: { src: "videos/4_market_blur.mp4" },
  roadWalk: { src: "videos/5_road_walk.mp4" },
  drinking: { src: "videos/6_drinking.mp4" },
  poolsideShoot: { src: "videos/7_poolside_shoot.mp4" },
  concert: { src: "videos/8_concert.mp4" },
  marketGuy: { src: "videos/9_market_guy.mp4" },
  yard: { src: "videos/10_yard.mp4" },
  friendsBench: { src: "videos/11_friends_bench.mp4" },
} as const satisfies Record<string, ClipDef>;

export type ClipKey = keyof typeof clips;
