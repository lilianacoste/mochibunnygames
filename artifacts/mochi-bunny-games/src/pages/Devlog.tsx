import { motion } from "framer-motion";
import { useDevlogs } from "@/hooks/use-mock-api";
import { GlitchText } from "@/components/GlitchText";
import { Loader2, Calendar } from "lucide-react";

export default function Devlog() {
  const { data: devlogs, isLoading } = useDevlogs();

  return (
    <div className="py-12 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Studio <span className="text-primary">Devlog</span></h2>
        <p className="text-muted-foreground text-lg">Updates on Project Lottie and our sanity.</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      ) : (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
          {devlogs?.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Timeline marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Calendar size={16} />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl border-2 border-border/50 shadow-sm hover:shadow-kawaii transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center mb-2">
                  <time className="font-mono text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-md">
                    {log.date}
                  </time>
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {log.isGlitchy ? <GlitchText text={log.title} /> : log.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {log.isGlitchy ? (
                    <GlitchText text={log.excerpt} />
                  ) : (
                    log.excerpt
                  )}
                </p>
                <button className="mt-4 text-primary font-bold text-sm hover:underline flex items-center gap-1 group/btn">
                  Read full entry
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
