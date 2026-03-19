import { NavButton } from "./NavButton";
import { Mascot } from "./Mascot";
import { CursorParticles } from "./CursorParticles";
import { LottieChat } from "./LottieChat";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col selection:bg-primary/30">
      <CursorParticles />

      <header className="relative z-50 flex w-full flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-12 md:py-6">
        <div className="flex w-full items-center justify-center gap-4 md:w-auto md:justify-start">
          <Mascot className="h-16 w-16" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              MochiBunny<span className="text-foreground">Games</span>
            </h1>
            <p className="-mt-1 font-mono text-sm text-muted-foreground">est. 2025</p>
          </div>
        </div>

        <nav className="flex w-full flex-wrap justify-center gap-2 rounded-[1.75rem] border border-white/60 bg-white/40 p-2 shadow-sm backdrop-blur-sm md:w-auto md:rounded-full">
          <NavButton href="/">Home</NavButton>
          <NavButton href="/games">Games</NavButton>
          <NavButton href="/devlog">Devlog</NavButton>
          <NavButton href="/community">Community</NavButton>
        </nav>
      </header>

      <main className="relative z-10 mx-auto flex-1 w-full max-w-7xl px-4 pb-20 sm:px-6 md:px-12 md:pb-24">
        {children}
      </main>

      <footer className="mt-auto w-full border-t border-primary/10 bg-white/30 py-8 text-center text-muted-foreground backdrop-blur-md">
        <p className="text-sm">© {new Date().getFullYear()} MochiBunnyGames. All rights reserved.</p>
        <p className="mt-2 font-mono text-xs opacity-50">She is always watching.</p>
      </footer>

      <LottieChat />
    </div>
  );
}
