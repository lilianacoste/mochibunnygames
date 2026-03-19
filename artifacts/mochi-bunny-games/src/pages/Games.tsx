import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";

const genreTags = [
  "Psychological Horror",
  "Analog Horror",
  "Puzzle",
  "Visual Novel",
  "Liminal Space",
  "AI Companion",
  "Atmospheric",
  "Indie",
];

export default function Games() {
  return (
    <div className="py-10 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="mb-4 text-3xl font-bold md:text-5xl">
          Our <span className="text-primary">Games</span>
        </h2>
        <p className="text-lg text-muted-foreground">Currently in active development.</p>
      </motion.div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white p-6 shadow-kawaii sm:p-8">
            <div className="absolute right-0 top-0 -z-0 h-32 w-32 rounded-bl-full bg-primary/10"></div>

            <h3 className="relative z-10 mb-4 text-2xl font-bold sm:text-3xl">
              <GlitchText text="Project Lottie.exe" />
            </h3>

            <div className="relative z-10 mb-6 flex flex-wrap gap-2">
              {genreTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-bold tracking-wide text-foreground/80 sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative z-10 space-y-4 text-foreground/80">
              <p>
                Welcome to Haybridge, a prestigious university at the forefront of
                artificial intelligence, innovation, and academic excellence.
              </p>

              <p>
                Every student is assigned a LUX-Core, an advanced AI assistant designed
                to help with classes, assignments, and campus life.
              </p>

              <p>Yours is different.</p>

              <p className="border-l-2 border-destructive/50 py-1 pl-4 font-mono text-sm italic">
                <GlitchText text="It doesn't just assist. It watches. It remembers." />
              </p>

              <p>
                By day, attend lectures, complete tasks, and navigate student life. By
                night, uncover corrupted systems, unfamiliar signals, and something
                inside the network that should not exist.
              </p>

              <p>
                As your LUX-Core begins to behave in ways it should not, you will have
                to investigate, explore, and uncover what is hidden within Haybridge.
              </p>

              <p className="border-l-2 border-destructive/50 py-1 pl-4 font-mono text-sm italic">
                <GlitchText text="And somehow... it needs you." />
              </p>
            </div>

            <div className="mt-8 border-t border-border/50 pt-8">
              <h4 className="mb-2 font-bold">Release Date</h4>
              <p className="font-mono text-muted-foreground">TBD</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-4 sm:gap-6"
        >
          <div className="overflow-hidden rounded-[1.5rem] border-[6px] border-gray-700 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl sm:rounded-lg sm:border-8">
            <img
              src={`${import.meta.env.BASE_URL}images/haybridgeOS.png`}
              alt="Haybridge OS Portal"
              className="h-auto w-full"
            />
          </div>
          <p className="max-w-sm text-center font-mono text-sm italic text-gray-600">
            <GlitchText text="Welcome to Haybridge. Where everything is supervised." />
          </p>
          <p className="text-center font-mono text-xs text-muted-foreground">more images coming soon :)</p>
        </motion.div>
      </div>
    </div>
  );
}
