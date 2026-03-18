import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

type DevlogEntry = {
  date: string;
  title: string;
  paragraphs: string[];
  inspirations?: string[];
};

const DEVLOG_ENTRIES: DevlogEntry[] = [
  {
    date: "September 16, 2025",
    title: "The First Prototype",
    paragraphs: [
      "Got the idea randomly to make a game and started experimenting in Pygame.",
      "The original concept was an AI assistant that would help players learn how to code, more of a helpful, educational tool than anything else.",
    ],
  },
  {
    date: "October 2025",
    title: "Narrative Shift",
    paragraphs: [
      "Shifted toward a more narrative-driven direction. Started writing the story, planning branching paths, and exploring UI concepts.",
      "The setting evolved into a prestigious university, and the tone began to change as I leaned into psychological horror elements.",
      "Major inspirations during this phase included:",
    ],
    inspirations: [
      "Doki Doki Literature Club",
      "Five Nights at Freddy's",
      "Outlast",
      "No, I'm Not Human",
      "Backrooms and liminal spaces",
    ],
  },
  {
    date: "November 2025",
    title: "Flowchart and Structure",
    paragraphs: [
      "Locked in the final story direction and created a full game flowchart.",
      "This solidified the structure of the experience, including progression, major beats, and endings.",
    ],
  },
  {
    date: "December 2025 - Present",
    title: "UI, Final Acts, and Polish",
    paragraphs: [
      "Focused on refining the UI and implementing the final acts and endings.",
      "Continuing to polish the experience and bring everything together.",
    ],
  },
];

export default function Devlog() {
  return (
    <div className="py-12 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Studio <span className="text-primary">Devlog</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Development notes from the first prototype to the current build.
        </p>
      </motion.div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
        {DEVLOG_ENTRIES.map((entry, index) => (
          <motion.div
            key={entry.date}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <Calendar size={16} />
            </div>

            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border-2 border-border/50 shadow-sm hover:shadow-kawaii transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-2">
                <time className="font-mono text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-md">
                  {entry.date}
                </time>
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground">{entry.title}</h3>

              <div className="space-y-3 text-sm leading-relaxed text-foreground/70">
                {entry.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {entry.inspirations ? (
                  <ul className="space-y-2 pt-1 font-medium text-foreground/80">
                    {entry.inspirations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
