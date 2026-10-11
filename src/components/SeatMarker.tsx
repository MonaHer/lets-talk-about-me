import type { CSSProperties } from "react";
import type { Voice } from "../data/types";

type Props = { voice: Voice; active: boolean; size?: "large" | "small" };

export function SeatMarker({ voice, active, size = "large" }: Props) {
  return (
    <div
      className={`seat seat--${size}${active ? " is-active" : ""}`}
      style={{ "--voice-color": voice.color } as CSSProperties}
    >
      <span className="seat-dot" aria-hidden="true" />
      <span className="seat-name">{voice.name}</span>
    </div>
  );
}
