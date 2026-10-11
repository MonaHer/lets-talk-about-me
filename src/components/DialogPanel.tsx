import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import type { Option, Step, Voice } from "../data/types";
import { Avatar } from "./Avatar";

// Farben, wenn das Bild selbst spricht
const OBJEKT = { color: "#ffffff", onColor: "#7a1a78" };

type Props = {
  step: Step;
  voices: Voice[];
  visited: Set<string>;
  onChoose: (nextId: string) => void;
};

export function DialogPanel({ step, voices, visited, onChoose }: Props) {
  const voice = voices.find((v) => v.id === step.voice);
  const color = voice?.color ?? OBJEKT.color;
  const onColor = voice?.onColor ?? OBJEKT.onColor;

  const colors = {
    "--voice-color": color,
    "--on-voice": onColor,
  } as CSSProperties;

  const questions = step.options.filter((o) => o.kind !== "switch");
  const switches = step.options.filter((o) => o.kind === "switch");

  const targetVoice = (o: Option) => voices.find((v) => v.id === o.voice);

  return (
    <section className="dialog" style={colors} aria-live="polite">
      <div key={step.id} className="dialog-inner">
        {voice && (
          <div className="voice anim">
            <span className="voice-name">
              <Avatar
                src={voice.avatar}
                icon={voice.icon}
                color={color}
                onColor={onColor}
              />
              {voice.name}
            </span>
            <span className="voice-role">
              {voice.role}
              {voice.imagined && " · Erfundene Annäherung"}
            </span>
          </div>
        )}

        {step.question ? (
          <>
            <p className="speech speech--question anim anim-2">
              {step.question}
            </p>
            <p className="answer anim anim-3">{step.text}</p>
          </>
        ) : (
          <p className="speech anim anim-2">{step.text}</p>
        )}

        {questions.length > 0 && (
          <div className="options anim anim-4">
            {questions.map((o) => {
              const seen = visited.has(o.next);
              const t = targetVoice(o);
              const style = t
                ? ({
                    "--voice-color": t.color,
                    "--on-voice": t.onColor,
                  } as CSSProperties)
                : undefined;
              return (
                <button
                  key={o.label}
                  className={seen ? "option is-visited" : "option"}
                  style={style}
                  onClick={() => onChoose(o.next)}
                >
                  <span className="option-label">
                    {t && (
                      <Avatar
                        src={t.avatar}
                        icon={t.icon}
                        color={t.color}
                        onColor={t.onColor}
                        size={32}
                      />
                    )}
                    {o.label}
                  </span>
                  {seen && (
                    <Check
                      size={18}
                      strokeWidth={3}
                      aria-label="bereits gefragt"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {switches.length > 0 && (
          <div className="switches anim anim-5">
            {questions.length > 0 && (
              <p className="switch-label">Jemand anderen fragen</p>
            )}
            <div className="switch-row">
              {switches.map((o) => {
                const t = targetVoice(o);
                const style = t
                  ? ({
                      "--voice-color": t.color,
                      "--on-voice": t.onColor,
                    } as CSSProperties)
                  : undefined;
                return (
                  <button
                    key={o.label}
                    className="switch"
                    style={style}
                    onClick={() => onChoose(o.next)}
                  >
                    {t && (
                      <Avatar
                        src={t.avatar}
                        icon={t.icon}
                        color={t.color}
                        onColor={t.onColor}
                        size={24}
                      />
                    )}
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
