import { useEffect, useRef, useState } from "react";
import { fuerstin } from "./data/fuerstin";
import { ObjectImage } from "./components/ObjectImage";
import { DialogPanel } from "./components/DialogPanel";
import "./App.css";

export default function App() {
  const dialog = fuerstin;
  const [stepId, setStepId] = useState(dialog.start);
  const [visited, setVisited] = useState<Set<string>>(() => new Set());
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousStep = useRef(stepId);

  // Auf dem Handy nach jedem Klick zum Anfang der neuen Antwort scrollen
  useEffect(() => {
    if (previousStep.current === stepId) return;
    previousStep.current = stepId;
    if (!window.matchMedia("(max-width: 819px)").matches) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    dialogRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  }, [stepId]);

  const step = dialog.steps[stepId];
  if (!step) {
    return <p>Schritt „{stepId}“ fehlt in den Daten.</p>;
  }

  const choose = (nextId: string) => {
    setVisited((prev) => new Set(prev).add(nextId));
    setStepId(nextId);
  };

  return (
    <div className="page">
      <header className="topbar">
        <span className="brand">Ein Gespräch mit R 537</span>
      </header>

      <main className="stage">
        <div className="portrait">
          <ObjectImage iiifBase={dialog.iiifBase} alt={dialog.title} />
          <p className="caption">
            {dialog.title}, {dialog.date}
          </p>
        </div>

        <div ref={dialogRef} className="dialog-wrap">
          <DialogPanel
            step={step}
            voices={dialog.voices}
            visited={visited}
            onChoose={choose}
          />
        </div>
      </main>

      <footer className="credit">
        <p>{dialog.credit}</p>
        <p>
          Privater Bewerbungsprototyp, kein Angebot des Badischen Landesmuseums.
        </p>
      </footer>
    </div>
  );
}
