import { useState } from "react";
import { motion } from "framer-motion";
import { useSubscribe } from "@/hooks/use-mock-api";
import { GlitchText } from "@/components/GlitchText";
import { Mail, MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import confetti from "canvas-confetti";

export default function Community() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useSubscribe();
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    mutate(email, {
      onSuccess: () => {
        // Fire creepy confetti (dark reds and blacks mixed with pink)
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ffb6c1', '#ff69b4', '#8b0000', '#000000']
        });
        
        toast({
          title: "You are on the list.",
          description: "She knows your email now. Thank you.",
          variant: "default",
        });
        setEmail("");
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Invalid format. She couldn't read it.",
          variant: "destructive",
        });
      }
    });
  };

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
          
          <button 
            onClick={() => window.open('https://discord.com', '_blank')}
            className="w-full bg-white text-[#5865F2] hover:bg-gray-100 font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
          >
            Join Server
          </button>
        </motion.div>

        {/* Newsletter Card */}
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
            Sign up for the newsletter to get exclusive beta access and updates. We promise not to spam you.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              className="px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-foreground"
            />
            <button 
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-kawaii hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:transform-none disabled:hover:shadow-none flex justify-center items-center gap-2"
            >
              {isPending ? (
                <><Loader2 className="animate-spin" size={20}/> Processing...</>
              ) : (
                'Subscribe to updates'
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}
