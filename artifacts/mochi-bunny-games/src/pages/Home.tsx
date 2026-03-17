import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";
import { Sparkle } from "@/components/Sparkle";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-12 md:pt-24">
      {/* Decorative background sparkles */}
      <Sparkle delay={0} size={30} style={{ top: "20%", left: "10%" }} />
      <Sparkle delay={500} size={20} style={{ top: "60%", right: "15%" }} />
      <Sparkle delay={1000} size={40} style={{ top: "15%", right: "20%" }} />
      <Sparkle delay={200} size={25} style={{ top: "70%", left: "20%" }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Crafting <span className="text-primary">cute</span> experiences for your desktop.
        </h2>
        
        <div className="font-mono text-xl md:text-2xl text-muted-foreground mb-12 h-8">
          <GlitchText text="A cozy companion... that's watching you back." />
        </div>

        <div className="relative group mx-auto max-w-4xl mt-12 mb-20">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-white rounded-[2rem] border-4 border-white shadow-kawaii overflow-hidden">
            <img 
              src={`${import.meta.env.BASE_URL}images/hero-desktop.png`}
              alt="Project Lottie.exe desktop environment"
              className="w-full object-cover aspect-video"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
              <div className="flex justify-between items-end">
                <div>
                  <span className="px-3 py-1 bg-primary/90 text-white rounded-full text-xs font-bold tracking-wider mb-3 inline-block">IN DEVELOPMENT</span>
                  <h3 className="text-3xl font-bold text-white mb-2"><GlitchText text="Project Lottie.exe" /></h3>
                  <p className="text-white/80 font-medium">Your new best friend is waiting to play.</p>
                </div>
                
                <Link 
                  href="/games" 
                  className="bg-white text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg"
                >
                  Learn More <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
