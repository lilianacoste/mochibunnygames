import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function createConversation(): Promise<number> {
  const res = await fetch(`${BASE}/api/openai/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Lottie Chat" }),
  });
  const data = await res.json();
  return data.id;
}

async function* streamMessage(convId: number, content: string): AsyncGenerator<string> {
  const res = await fetch(`${BASE}/api/openai/conversations/${convId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });

  if (!res.body) return;

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const payload = JSON.parse(line.slice(6));
          if (payload.content) yield payload.content;
          if (payload.done) return;
        } catch {}
      }
    }
  }
}

const OPENING_MESSAGE: Message = {
  role: "assistant",
  content: "hi there... i've been waiting ♡ what would you like to talk about?",
};

export function LottieChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState<number | null>(null);
  const [blink, setBlink] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Creepy slow blink on the open button
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(false);
      setTimeout(() => setBlink(true), 200);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = async () => {
    setOpen(true);
    if (!convId) {
      const id = await createConversation();
      setConvId(id);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading || !convId) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    let accumulated = "";
    for await (const chunk of streamMessage(convId, userMsg.content)) {
      accumulated += chunk;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: accumulated };
        return updated;
      });
    }

    setLoading(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary shadow-kawaii flex flex-col items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Chat with Lottie"
        style={{ display: open ? "none" : "flex" }}
      >
        <div className="text-xl leading-none">
          {blink ? "◉ω◉" : "—ω—"}
        </div>
        <span className="text-[9px] font-bold mt-0.5 opacity-80">Lottie</span>
        {/* Notification pulse */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-pink-200 rounded-full animate-ping opacity-60" />
        <span className="absolute top-1 right-1 w-3 h-3 bg-pink-300 rounded-full" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-[1.5rem] overflow-hidden shadow-2xl border-2 border-pink-200 bg-white"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="bg-primary px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-lg shrink-0 shadow-inner">
                {blink ? "◉ω◉" : "—ω—"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm leading-tight">Lottie</div>
                <div className="text-pink-100 text-xs opacity-80">companion • in development</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-pink-200 hover:text-white transition-colors ml-auto shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-pink-50/60" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 shrink-0 mt-0.5">
                      ♡
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-white text-foreground border border-pink-100 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.content || (
                      <span className="opacity-50 italic text-xs">
                        typing<span className="animate-pulse">...</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-pink-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="say something..."
                disabled={loading}
                className="flex-1 px-4 py-2.5 bg-pink-50 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-pink-300 text-foreground"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/80 active:scale-90 transition-all disabled:opacity-40 shrink-0"
                aria-label="Send"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
