export type Seat = "left" | "right" | "bottom";
export type IconName = "eye" | "search" | "frame";

export type Voice = {
  id: string;
  name: string;
  role: string;
  imagined?: boolean;
  seat: Seat;
  color: string;
  onColor: string;
  avatar?: string; // Bild-URL; wenn leer, wird das Symbol gezeigt
  icon?: IconName; // Ersatz-Symbol
};

export type Option = {
  label: string;
  next: string;
  kind?: "question" | "switch";
  voice?: string;
};

export type Step = {
  id: string;
  voice: Voice["id"] | "objekt";
  question?: string;
  text: string;
  region?: string;
  options: Option[];
};

export type ObjectDialog = {
  title: string;
  inventoryNumber: string;
  date: string;
  iiifBase: string;
  credit: string;
  voices: Voice[];
  start: string;
  steps: Record<string, Step>;
};
