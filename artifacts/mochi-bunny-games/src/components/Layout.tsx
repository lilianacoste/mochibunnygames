import { NavButton } from "./NavButton";
import { Mascot } from "./Mascot";
import { CursorParticles } from "./CursorParticles";
import { LottieChat } from "./LottieChat";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/30">
      <CursorParticles />
      
      <header className="w-full py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center z-50 relative">
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <Mascot className="w-16 h-16" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-primary tracking-tight">MochiBunny<span className="text-foreground">Games</span></h1>
            <p className="text-sm text-muted-foreground font-mono -mt-1">est. 2024</p>
          </div>
        </div>
        
        <nav className="flex gap-2 bg-white/40 p-2 rounded-full backdrop-blur-sm border border-white/60 shadow-sm">
          <NavButton href="/">Home</NavButton>
          <NavButton href="/games">Games</NavButton>
          <NavButton href="/devlog">Devlog</NavButton>
          <NavButton href="/community">Community</NavButton>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-12 relative z-10 pb-24">
        {children}
      </main>

      <footer className="w-full py-8 text-center text-muted-foreground border-t border-primary/10 mt-auto bg-white/30 backdrop-blur-md">
        <p className="text-sm">© {new Date().getFullYear()} MochiBunnyGames. All rights reserved.</p>
        <p className="text-xs font-mono mt-2 opacity-50">She is always watching.</p>
      </footer>

      <LottieChat />
    </div>
  );
}
