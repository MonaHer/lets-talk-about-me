import type { ObjectDialog, Option, Step } from "./types";

const IIIF =
  "https://data.landesmuseum.de/iiif/3/F479C4AF4938F40B480FE291593D6D81_000";

// Inhalte auf Basis der Recherche. Unsicheres ist bewusst als unsicher formuliert.

const voiceIds = ["fuerstin", "kunsthistorikerin", "provenienz"] as const;
type VoiceId = (typeof voiceIds)[number];
type QA = { id: string; question: string; answer: string };

// ---------- Fragen und Antworten pro Stimme ----------

const questions: Record<VoiceId, QA[]> = {
  fuerstin: [
    {
      id: "f-wer",
      question: "Wer bist du?",
      answer:
        "Hinten auf meinem Bild steht der Name Dorothea Friederike, aber das Museum glaubt nicht, dass ich das bin. Vielleicht bin ich Magdalena Claudia, Pfalzgräfin von Zweibrücken-Birkenfeld, geboren 1668. Mit zwanzig habe ich in Hanau meinen Cousin geheiratet, Graf Philipp Reinhard.",
    },
    {
      id: "f-name",
      question: "Warum steht ein anderer Name auf deinem Bild?",
      answer:
        "Hinten steht „Dorothea Friederike“. Sie war mit dem Bruder meines Mannes verheiratet, also meine Schwägerin. Zwei Gräfinnen aus demselben Haus Hanau - vielleicht hat man uns deshalb verwechselt.",
    },
    {
      id: "f-maler",
      question: "Hast du dem Maler Modell gesessen?",
      answer:
        "Nein. Ich bin Ende 1704 gestorben, und dieses Bild wurde erst um 1775 gemalt. Der Maler kann mich nur von einem älteren Bild gekannt haben, falls ich es überhaupt bin.",
    },
    {
      id: "f-leben",
      question: "Was erwartete man von dir als Gräfin?",
      answer:
        "Von einer Gräfin erwartete man vor allem einen Erben. Zwei meiner Kinder kamen tot zur Welt, meine Tochter Magdalene Katharine lebte nur ein halbes Jahr. Deshalb ging die Grafschaft später an die Familie meines Schwagers.",
    },
    {
      id: "f-tod",
      question: "Was geschah nach deinem Tod?",
      answer:
        "Man hat mich in der Gruft der lutherischen Kirche in Hanau begraben, bei meinen Kindern. Man erzählt, beim Trauergeläut sei die große Glocke zersprungen, die ich gestiftet hatte. Die Gruft wurde im Zweiten Weltkrieg zerstört.",
    },
  ],

  kunsthistorikerin: [
    {
      id: "k-mantel",
      question: "Was trägt sie da?",
      answer:
        "Über ihrem Kleid liegt ein Fürstenmantel. Den trug man nicht im Alltag, er zeigt ihren Rang an. Auch die Fürsten in derselben Bildergalerie tragen ihn. So wird aus einzelnen Menschen eine Ahnenreihe.",
    },
    {
      id: "k-malweise",
      question: "Wie ist das Bild gemalt?",
      answer:
        "Schau mal auf den Hintergrund: Er ist dunkel und ruhig gehalten, so tritt ihr Gesicht umso heller hervor. Die Übergänge sind weich gezeichnet, ohne harte Konturen. Das schmeichelt, denn ein Hofporträt sollte idealisieren und nicht jede Unebenheit zeigen.",
    },
    {
      id: "k-frisur",
      question: "Woher weiß man, wann das Bild gemalt wurde?",
      answer:
        "Es gehört zu einer Serie von Bildnissen, die um 1775 für die Bildergalerie im Karlsruher Schloss entstand. Seltsam ist nur die Frisur: Hochgekämmtes Haar mit langen Locken trug man um 1700. Meine Deutung: Der Maler hat eine ältere Vorlage kopiert.",
    },
    {
      id: "k-maler",
      question: "Wer hat das Bild gemalt?",
      answer:
        "Das wissen wir nicht sicher. Ähnliche Bilder derselben Serie schreibt das Museum der Karlsruher Hofmalerwerkstatt Kisling zu. Die hatte Übung darin: 1759 ließ der Markgraf 27 beschädigte Ahnenbilder komplett neu malen.",
    },
    {
      id: "k-caroline",
      question: "Für wen wurde das Bild gemalt?",
      answer:
        "Für Markgräfin Caroline Luise von Baden. Sie malte selbst und sammelte leidenschaftlich. Ihre rund 200 Gemälde bilden heute den Grundstock der Staatlichen Kunsthalle Karlsruhe.",
    },
  ],

  provenienz: [
    {
      id: "p-zimmer",
      question: "Wo hing das Bild ursprünglich?",
      answer:
        "Im Familienzimmer des Karlsruher Schlosses, eingerichtet von Caroline Luise. Ein Inventar von 1787 zählt dort 23 ovale Bildnisse: neun Fürsten und 14 Fürstinnen aus ihren Familien in Baden und Hessen-Darmstadt.",
    },
    {
      id: "p-inschrift",
      question: "Was steht auf der Rückseite des Bildes?",
      answer:
        "Eine Inschrift nennt Dorothea Friederike, Fürstin zu Hanau, geborene Markgräfin von Brandenburg-Ansbach. Ein Bild von ihr, der Großmutter Caroline Luises, gehörte nachweislich zur Galerie. Das Museum hält die Inschrift auf diesem Bild trotzdem für eine Verwechslung.",
    },
    {
      id: "p-verwechslung",
      question: "Wie kann man Bilder überhaupt verwechseln?",
      answer:
        "Im 19. Jahrhundert wurden die Bilder mehrfach abgehängt und restauriert, dabei hat man Dargestellte öfter vertauscht.",
    },
    {
      id: "p-plan",
      question: "Woher weiß man, wie die Bilder hingen?",
      answer:
        "Caroline Luise hat die Hängung selbst skizziert. Auf ihrem Plan steht „Hana“ – gemeint ist ihre Großmutter aus Hanau. Dazu kommen Inventare und eine Fotografie aus der Zeit nach 1921.",
    },
    {
      id: "p-krieg",
      question: "Wie hat das Bild den Krieg überstanden?",
      answer:
        "Ab 1939 wurden die Sammlungen ausgelagert. Im September 1944 brannte das Schloss bis auf die Außenmauern nieder. Die Bilder aus dem Familienzimmer haben nur überlebt, weil sie nicht mehr dort hingen.",
    },
  ],
};

// ---------- Einstieg in jede Stimme ----------

const menuText: Record<VoiceId, string> = {
  fuerstin:
    "Endlich fragt mal jemand! Ich hänge hier schließlich nicht nur zur Dekoration.",
  kunsthistorikerin:
    "Ein Porträt ist nie nur ein Abbild. Was möchtest du darüber wissen?",
  provenienz:
    "Inventare, Rückseiten, alte Fotos: Hier bin ich der Detektiv. Frag mich!",
};

const switchLabel: Record<VoiceId, string> = {
  fuerstin: "Die Dargestellte",
  kunsthistorikerin: "Die Kunsthistorikerin",
  provenienz: "Den Provenienzforscher",
};

// ---------- Automatisch erzeugte Seiten ----------

function switchOptions(current: VoiceId | null): Option[] {
  return voiceIds
    .filter((v) => v !== current)
    .map((v) => ({
      label: switchLabel[v],
      next: `${v}-menu`,
      kind: "switch",
      voice: v,
    }));
}

function questionOptions(voice: VoiceId, exclude?: string): Option[] {
  return questions[voice]
    .filter((q) => q.id !== exclude)
    .map((q) => ({ label: q.question, next: q.id, kind: "question" }));
}

const generated: Record<string, Step> = {};
for (const v of voiceIds) {
  generated[`${v}-menu`] = {
    id: `${v}-menu`,
    voice: v,
    text: menuText[v],
    options: [...questionOptions(v), ...switchOptions(v)],
  };
  for (const q of questions[v]) {
    generated[q.id] = {
      id: q.id,
      voice: v,
      question: q.question,
      text: q.answer,
      options: [...questionOptions(v, q.id), ...switchOptions(v)],
    };
  }
}

// ---------- Das ganze Objekt ----------

export const fuerstin: ObjectDialog = {
  title: "Bildnis einer unbekannten Fürstin",
  inventoryNumber: "R 537",
  date: "um 1775",
  iiifBase:
    "https://data.landesmuseum.de/iiif/3/F479C4AF4938F40B480FE291593D6D81_000",
  credit:
    "Bildnis einer unbekannten Fürstin, um 1775, Öl auf Leinwand. Badisches Landesmuseum Karlsruhe, Inv.-Nr. R 537",

  voices: [
    {
      id: "fuerstin",
      name: "Die Dargestellte",
      role: "So könnte sie erzählt haben",
      imagined: true,
      seat: "left",
      color: "#7a1a78",
      onColor: "#ffffff",
      avatar: `${IIIF}/pct:35,33,30,20.5/300,/0/default.jpg`, // Gesichtsausschnitt, siehe Hinweis unten
    },
    {
      id: "kunsthistorikerin",
      name: "Die Kunsthistorikerin",
      role: "Schaut darauf, wie das Bild gemacht ist",
      seat: "right",
      color: "#1d5c5e",
      onColor: "#ffffff",
      icon: "eye",
    },
    {
      id: "provenienz",
      name: "Der Provenienzforscher",
      role: "Verfolgt, woher das Bild kommt",
      seat: "bottom",
      color: "#f2b84b",
      onColor: "#3a1236",
      icon: "search",
    },
  ],

  start: "auswahl",

  steps: {
    auswahl: {
      id: "auswahl",
      voice: "objekt",
      question: "Let’s talk about me!",
      text: "Mit wem möchtest du sprechen?",
      options: switchOptions(null).map((o) => ({ ...o, kind: "question" })),
    },

    ...generated,
  },
};
