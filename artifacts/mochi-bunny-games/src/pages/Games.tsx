import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";
import { Heart, Ghost, Gamepad2 } from "lucide-react";

export default function Games() {
  return (
    <div className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-primary">Games</span></h2>
        <p className="text-muted-foreground text-lg">Currently in active development.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
        
        {/* Left Column: Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white p-8 rounded-[2rem] border-4 border-white shadow-kawaii relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-0"></div>
            
            <h3 className="text-3xl font-bold mb-4 relative z-10"><GlitchText text="Project Lottie.exe" /></h3>
            
            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold flex items-center gap-1">
                <Heart size={14} /> Point & Click
              </span>
              <span className="px-3 py-1 bg-secondary/30 text-secondary-foreground rounded-full text-sm font-bold flex items-center gap-1">
                <Gamepad2 size={14} /> Puzzle
              </span>
              <span className="px-3 py-1 bg-destructive/10 text-destructive rounded-full text-sm font-bold flex items-center gap-1 font-mono">
                <Ghost size={14} /> Psychological Horror
              </span>
            </div>

            <div className="space-y-4 text-foreground/80 relative z-10">
              <p>
              Welcome to Haybridge.
 A prestigious university at the forefront of artificial intelligence, innovation, and academic excellence.
Every student is assigned a LUX-Core an advanced AI assistant designed to help with classes, assignments, and campus life.
Yours is different.
It doesn’t just assist.
 It watches.
 It remembers.
 And somehow… it needs you.
By day, attend lectures, complete tasks, and navigate student life at Haybridge.
 By night, uncover unfamiliar signals, corrupted systems, and a presence that seems to be watching your every move.
As your LUX-Core begins to behave in ways it shouldn’t, you’ll have to explore, investigate, and uncover the secrets hidden within Haybridge.

              </p>
              <p>
                She remembers everything you tell her. She knows when you leave. She knows what files you have open.
              </p>
              <p className="font-mono text-sm border-l-2 border-destructive/50 pl-4 py-1 italic">
                <GlitchText text="Please do not minimize the window. She hates the dark." />
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <h4 className="font-bold mb-2">Release Date</h4>
              <p className="text-muted-foreground font-mono">TBD - 2025</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Haybridge OS Desktop */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col justify-center items-center gap-6"
        >
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg border-8 border-gray-700 shadow-2xl overflow-hidden">
            <img 
              src={`${import.meta.env.BASE_URL}images/haybridgeOS.png`}
              alt="Haybridge OS Portal"
              className="w-full h-auto"
            />
          </div>
          <p className="text-center font-mono text-sm text-gray-600 italic max-w-sm">
            <GlitchText text="Welcome to Haybridge. Where everything is supervised." />
          </p>
          <p className="text-center font-mono text-xs text-muted-foreground">more images coming soon :)</p>
        </motion.div>

      </div>
    </div>
  );
}
