import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Camera, Ghost, UserRound } from "lucide-react";

import ArtistApplicationForm from "@/components/ArtistApplicationForm";

const fitNotes = [
  {
    icon: Camera,
    title: "3D static horror environments",
    description:
      "Dark apartment hallways, surveillance-camera views, liminal interior rooms, security-desk angles, and static spaces built for atmosphere over gameplay.",
  },
  {
    icon: Ghost,
    title: "Analog / liminal unease",
    description:
      "Outlast, FNAF, backrooms, surveillance horror, and uncanny analog mood are strong references for the tone I am chasing.",
  },
  {
    icon: UserRound,
    title: "2D avatars and uncanny humans",
    description:
      "Pixel, chibi, anime-VN, and hyperreal uncanny human portraits or models with simple loops like blinking, breathing, talking, and subtle head movement.",
  },
];

const sceneExamples = [
  "Dark apartment hallways",
  "Surveillance camera views",
  "Liminal interior spaces",
  "Security desk / CCTV perspectives",
  "Creepy corridors and rooms",
];

const avatarDetails = [
  "Pixel version",
  "Chibi version",
  "Anime VN style",
  "Hyperreal uncanny human version",
  "Blinking, breathing, talking, subtle head movement",
];

export default function Artists() {
  return (
    <div className="mx-auto max-w-6xl py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-kawaii"
        >
          <ArrowLeft size={16} />
          back home
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-[2rem] border-4 border-white bg-gradient-to-br from-white via-pink-50 to-pink-100 p-8 shadow-kawaii">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
              MochiBunnyGames
            </p>
            <h2 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Looking for 3D horror environment artists and
              {" "}
              <span className="text-primary">2D avatar animators</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              I&apos;m building a psychological horror game with analog horror,
              liminal-space tension, surveillance-camera framing, and unsettling dialogue
              scenes. I&apos;m especially looking for static 3D environment renders, hyperreal
              uncanny human models, and animated 2D dialogue avatars. Compensation can be
              paid, rev-share, or hybrid depending on scope.
            </p>
          </div>

          <div className="space-y-4">
            {fitNotes.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className="rounded-[1.5rem] border border-pink-200 bg-white/90 p-5 shadow-sm"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={20} />
                </div>
                <h3 className="mb-1 text-lg font-bold text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mb-10 grid gap-6 lg:grid-cols-2"
      >
        <div className="rounded-[1.75rem] border border-pink-200 bg-white/90 p-6 shadow-sm">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-primary">
            3D environment needs
          </p>
          <h3 className="mb-3 text-2xl font-bold text-foreground">
            Static horror renders, not gameplay assets
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            I need high-quality 3D rendered environments to use as static scenes inside
            the game. The tone leans toward Outlast, FNAF, backrooms, analog horror,
            surveillance unease, and empty spaces that feel wrong.
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
            {sceneExamples.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-pink-100 bg-pink-50/60 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] border border-pink-200 bg-gradient-to-br from-pink-50 via-white to-pink-100 p-6 shadow-sm">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.28em] text-primary">
            Avatar needs
          </p>
          <h3 className="mb-3 text-2xl font-bold text-foreground">
            Dialogue avatars with simple loops
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            I&apos;m also looking for 2D character artists and animators who can build
            dialogue portraits for visual-novel-style scenes, including uncanny or
            hyperreal human looks when needed.
          </p>
          <ul className="space-y-2 text-sm text-foreground/80">
            {avatarDetails.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-pink-100 bg-white/80 px-4 py-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        className="mb-10 grid gap-4 md:grid-cols-3"
      >
        <div className="rounded-[1.5rem] border border-pink-200 bg-white/90 p-5 shadow-sm">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Game info
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Psychological horror / analog horror project with liminal spaces,
            surveillance aesthetics, and a small indie team building an active prototype
            in Python / Pygame.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-pink-200 bg-white/90 p-5 shadow-sm">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Compensation
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Scope, rates, and structure can be discussed depending on the role and deliverables.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-pink-200 bg-white/90 p-5 shadow-sm">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Please send
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Portfolio, horror examples if you have them, and your preferred role:
            3D environments, 2D avatars, or hyperreal uncanny humans.
          </p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
        <ArtistApplicationForm />
      </motion.div>
    </div>
  );
}
