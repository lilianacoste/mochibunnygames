import { motion } from "framer-motion";
import { GlitchText } from "@/components/GlitchText";
import { Mail, MessageSquare, Heart } from "lucide-react";

export default function Community() {
  return (
    <div className="py-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Join the <span className="text-primary">Mochi Club</span></h2>
        <p className="text-muted-foreground text-lg">We're building a community of very happy, very safe players.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Discord Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-[#5865F2] text-white p-8 rounded-[2rem] shadow-lg relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 group-hover:scale-110 transition-transform duration-500"></div>
          
          <MessageSquare className="w-12 h-12 mb-6" />
          <h3 className="text-2xl font-bold mb-2">Discord Server</h3>
          <p className="text-white/80 mb-8">
            Chat with other players, share fan art, and report "bugs". The devs are always listening. So is she.
          </p>

          <div className="w-full rounded-xl bg-white/15 px-6 py-4 text-center font-bold tracking-wide">
            coming soon
          </div>
        </motion.div>

        {/* Updates Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-[2rem] border-4 border-primary/20 shadow-kawaii relative"
        >
          <Mail className="w-12 h-12 mb-6 text-primary" />
          <h3 className="text-2xl font-bold mb-2 text-foreground">
            Get notified when <GlitchText text="Lottie wakes up" />
          </h3>
          <p className="text-muted-foreground mb-8">
            Email signups are paused for now while I rework how updates and beta access will be handled.
          </p>

          <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 px-6 py-8 text-center">
            <p className="text-lg font-bold text-foreground">coming soon</p>
            <p className="mt-2 text-sm text-muted-foreground">
              follow-up updates will come back once the community rollout is ready.
            </p>
          </div>
        </motion.div>

      </div>

      {/* Ko-fi Support Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <div className="relative rounded-[2rem] overflow-hidden border-4 border-pink-200 shadow-kawaii bg-gradient-to-br from-pink-50 via-white to-pink-100 p-10 text-center">
          {/* Decorative floating hearts */}
          <div className="absolute top-4 left-8 text-pink-300 text-3xl select-none animate-bounce" style={{ animationDelay: '0s', animationDuration: '2.5s' }}>♡</div>
          <div className="absolute top-6 right-12 text-pink-200 text-2xl select-none animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3s' }}>♡</div>
          <div className="absolute bottom-5 left-16 text-pink-200 text-xl select-none animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '2.8s' }}>♡</div>
          <div className="absolute bottom-4 right-8 text-pink-300 text-3xl select-none animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.3s' }}>♡</div>

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-xl mx-auto">
            <div className="bg-pink-100 border-2 border-pink-200 rounded-full p-4">
              <Heart className="w-10 h-10 text-pink-500 fill-pink-400" />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-foreground mb-3">Support the Studio</h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                If you like what I'm building and want to support development,<br />
                you can help me bring this world to life 🌸
              </p>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                Every little bit helps me create more weird, cozy, and slightly unsettling experiences 💕
              </p>
            </div>

            <a
              href="https://ko-fi.com/mochibunny26328"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#FF5E5B] hover:bg-[#e84d4a] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 text-lg"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682-.86-1.682-.86V7.635c1.26.527 1.923 1.44 1.923 1.44s.731 1.229-.241 2.862z"/>
              </svg>
              Support on Ko-fi
            </a>

            <p className="text-xs text-muted-foreground font-mono opacity-60">she sees your kindness. she appreciates it.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
