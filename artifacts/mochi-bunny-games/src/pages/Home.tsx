import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";
import { Sparkle } from "@/components/Sparkle";
import { ArrowRight, Brush, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-8 sm:pt-12 md:pt-24">
      <Sparkle delay={0} size={30} style={{ top: "20%", left: "10%" }} />
      <Sparkle delay={500} size={20} style={{ top: "60%", right: "15%" }} />
      <Sparkle delay={1000} size={40} style={{ top: "15%", right: "20%" }} />
      <Sparkle delay={200} size={25} style={{ top: "70%", left: "20%" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl"
      >
        <div className="text-center">
          <h2 className="mb-5 text-4xl font-bold leading-tight text-foreground sm:text-5xl md:mb-6 md:text-7xl">
            Crafting <span className="text-primary">cute</span> experiences for your desktop.
          </h2>

          <div className="mb-8 min-h-10 font-mono text-base text-muted-foreground sm:mb-12 sm:text-xl md:h-8 md:text-2xl">
            <GlitchText text="A cozy companion... that's watching you back." />
          </div>
        </div>

        <div className="group relative mx-auto mt-8 mb-14 max-w-4xl sm:mt-12 sm:mb-20">
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-primary via-secondary to-primary opacity-25 blur transition duration-1000 group-hover:opacity-50 group-hover:duration-200"></div>

          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-kawaii">
            <img
              src={`${import.meta.env.BASE_URL}images/Lottiedesktop.png`}
              alt="Project Lottie.exe desktop environment"
              className="aspect-video w-full object-cover"
            />

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 sm:p-8">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="mb-3 inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-bold tracking-wider text-white">
                    IN DEVELOPMENT
                  </span>
                  <h3 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                    <GlitchText text="Project Lottie.exe" />
                  </h3>
                  <p className="font-medium text-white/80">Your new best friend is waiting to play.</p>
                </div>

                <Link
                  href="/games"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-primary shadow-lg transition-colors hover:bg-primary hover:text-white sm:w-auto"
                >
                  Learn More <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-12 grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-pink-200 bg-white p-6 text-left shadow-kawaii sm:p-8">
            <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-xs font-mono uppercase tracking-[0.3em] text-primary">
                <Brush size={14} />
                Looking for artists
              </div>

              <h3 className="mb-4 max-w-2xl text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
                Looking for artists who can build <span className="text-primary">uncanny</span> spaces and faces.
              </h3>
              <p className="mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                I&apos;m currently looking for 3D environment artists creating static horror
                scenes, as well as 2D avatar animators and character artists for dialogue.
                Think liminal hallways, surveillance-camera angles, and environments that
                feel wrong even when nothing is moving, alongside characters that range
                from soft and kawaii to subtly unsettling and uncanny. Inspired by FNAF,
                Outlast, and backrooms-style unease, with a focus on both environments and
                faces that don&apos;t feel quite right.
              </p>

              <Link
                href="/artists"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-kawaii"
              >
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-pink-200 bg-white/90 p-5 shadow-sm">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Sparkles size={20} />
              </div>
              <h4 className="mb-2 text-lg font-bold text-foreground">Mood first</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I&apos;m chasing analog horror, liminal interiors, dark apartment corridors,
                and surveillance-style camera spaces. At the same time, character visuals
                are just as important, from cute, expressive 2D avatars to uncanny,
                almost-real faces used in horror moments. Everything should feel slightly
                off, even when nothing is happening.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-pink-200 bg-gradient-to-br from-pink-50 via-white to-pink-100 p-5 shadow-sm">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Ideal fits
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground/80">
                <li>3D artists creating static horror environments, liminal spaces, surveillance views, and interiors.</li>
                <li>2D avatar animators building blinking, subtle motion, and dialogue portraits.</li>
                <li>VN-style character artists working in chibi, anime, or pixel styles.</li>
                <li>Artists who can create hyperreal or uncanny human faces.</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                If your work sits anywhere between cute and unsettling, you&apos;ll likely fit
                this project well.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mb-16 max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-to-br from-white via-pink-50 to-pink-100 p-6 shadow-kawaii sm:p-8 md:p-10">
            <div className="absolute -left-8 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-primary">
                About Me
              </p>
              <h3 className="mb-4 text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
                Hello &lt;3
              </h3>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m a computer science graduate student and solo indie developer focused
                  on creating games that feel meaningful, unsettling, and memorable.
                </p>
                <p>
                  I&apos;m especially drawn to projects that blend strong narrative design with
                  interactive systems: games where the experience stays with you even after
                  you&apos;ve closed them. My work explores psychological horror, liminal
                  spaces, and the relationship between player and system.
                </p>
                <p>
                  I handle everything from design and programming to implementation,
                  building projects from concept to playable experience.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
