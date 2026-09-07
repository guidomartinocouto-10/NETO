import { AbsoluteFill, useCurrentFrame } from "remotion";

const grainDataUri = (seed: number) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='${seed}' stitchTiles='stitch'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  )}`;

/**
 * Wraps the whole reel: unifies the per-clip grades with a light global
 * contrast/saturation pass, adds a soft vignette and a flickering film
 * grain layer for a cinematic, non-flat finish.
 */
export const CinematicLook: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ filter: "contrast(1.05) saturate(1.08)" }}>
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage: `url("${grainDataUri(frame % 6)}")`,
          backgroundSize: "200px 200px",
          opacity: 0.06,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
