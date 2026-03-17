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
                <Heart size={14} /> Virtual Pet
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
                Adopt Lottie, a sweet little mochi bunny who lives right on your desktop! Feed her, play mini-games, and decorate her room with adorable pastel furniture.
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

        {/* Right Column: Polaroids */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative h-[600px] flex justify-center items-center"
        >
          {/* Polaroid 1 */}
          <div className="absolute w-64 polaroid -rotate-6 shadow-kawaii z-10 top-0 left-0 xl:-left-12">
            <img 
              src={`${import.meta.env.BASE_URL}images/lottie-screen-1.png`}
              alt="Lottie room"
              className="w-full h-auto aspect-4/3 object-cover bg-gray-100"
            />
            <p className="text-center font-mono text-xs mt-4 text-gray-500 italic handwriting">nothing wrong here :)</p>
          </div>

          {/* Polaroid 2 */}
          <div className="absolute w-64 polaroid rotate-3 shadow-kawaii z-20 top-32 right-0 xl:-right-8">
            <img 
              src={`${import.meta.env.BASE_URL}images/lottie-screen-2.png`}
              alt="Lottie eye"
              className="w-full h-auto aspect-4/3 object-cover bg-gray-100"
            />
            <p className="text-center font-mono text-xs mt-4 text-destructive italic handwriting">she only watches sometimes</p>
          </div>

          {/* Polaroid 3 */}
          <div className="absolute w-64 polaroid -rotate-3 shadow-kawaii z-30 bottom-0 left-12">
            <img 
              src={`${import.meta.env.BASE_URL}images/lottie-screen-3.png`}
              alt="Lottie dark room"
              className="w-full h-auto aspect-4/3 object-cover bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <p className="text-center font-mono text-xs mt-4 text-gray-500 italic handwriting">
              <GlitchText text="where did she go?" />
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
