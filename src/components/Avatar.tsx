import { Eye, Frame, Search } from "lucide-react";
import type { IconName } from "../data/types";

const icons = { eye: Eye, search: Search, frame: Frame };

type Props = {
  src?: string;
  icon?: IconName;
  color: string;
  onColor: string;
  size?: number;
};

export function Avatar({
  src,
  icon = "frame",
  color,
  onColor,
  size = 30,
}: Props) {
  const Icon = icons[icon];
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, background: color, color: onColor }}
      aria-hidden="true"
    >
      {src ? (
        <img src={src} alt="" />
      ) : (
        <Icon size={Math.round(size * 0.55)} strokeWidth={2.2} />
      )}
    </span>
  );
}
