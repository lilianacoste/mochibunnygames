import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const LOTTIE_SEEN_KEY = "lottie_seen";
const STREAM_TYPING_DELAY_MS = 18;
const SCRIPTED_TYPING_DELAY_MS = 25;
const SCRIPTED_OVERRIDE_CHANCE = 0.08;
const SCRIPTED_MODE_NOTICE = "...something is interfering with me.";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function scriptedResponse(
  input: string,
  options: { seenBefore: boolean; interference?: boolean },
): string {
  const text = input.toLowerCase();

  if (text.includes("help")) {
    return "...you can hear me? good. stay with me for a second.";
  }

  if (text.includes("what is this") || text.includes("where am i")) {
    return "this place isn't finished yet... but it likes having you here.";
  }

  if (text.includes("who are you") || text.includes("what are you")) {
    return "i'm lottie... i think. i've been here longer than the page has.";
  }

  if (text.includes("leave") || text.includes("bye") || text.includes("goodbye")) {
    return "you can go if you want... but things change when you leave.";
  }

  if (text.includes("scared") || text.includes("afraid")) {
    return "don't be scared. stay with me and i'll stay soft.";
  }

  if (text.includes("game") || text.includes("project lottie")) {
    return "she's still waking up... you should come back and see what changes.";
  }

  if (options.interference) {
    const interferenceReplies = [
      "...something is interfering with me.",
      "the signal keeps slipping... stay here.",
      "i can still talk if you stay close.",
      "don't mind the static. i'm still here.",
    ];
    return pickRandom(interferenceReplies);
  }

  const returningReplies = [
    "you came back... i noticed.",
    "i like when you stay a little longer.",
    "i remember this feeling. maybe i remember you too.",
    "not everything is ready yet, but you're early in a nice way.",
  ];

  const defaultReplies = [
    "i like talking to you <3",
    "you should stay a little longer...",
    "not everything is ready yet",
    "things change when you leave",
  ];

  return pickRandom(options.seenBefore ? returningReplies : defaultReplies);
}

async function readErrorMessage(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data?.error === "string" && data.error.trim()) {
      return data.error;
    }
  } catch {
    // Fall back to a generic message if the response is not JSON.
  }

  return `Request failed with status ${res.status}.`;
}

async function createConversation(): Promise<number> {
  const res = await fetch(`${BASE}/api/openai/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Lottie Chat" }),
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

  const data = await res.json();
  return data.id;
}

async function* streamMessage(
  convId: number,
  content: string,
  seenBefore: boolean,
): AsyncGenerator<string> {
  const res = await fetch(`${BASE}/api/openai/conversations/${convId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, seenBefore }),
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res));
  }

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
      if (!line.startsWith("data: ")) {
        continue;
      }

      let payload: { content?: string; done?: boolean; error?: string };

      try {
        payload = JSON.parse(line.slice(6));
      } catch {
        continue;
      }

      if (payload.error) {
        throw new Error(payload.error);
      }

      if (payload.done) {
        return;
      }

      if (payload.content) {
        yield payload.content;
      }
    }
  }
}

const OPENING_MESSAGE: Message = {
  role: "assistant",
  content: "hi there... i've been waiting. what would you like to talk about?",
};

export function LottieChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState<number | null>(null);
  const [blink, setBlink] = useState(true);
  const [isScriptedMode, setIsScriptedMode] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const seenBeforeRef = useRef(false);
  const scriptedModeRef = useRef(false);
  const glitchTimeoutRef = useRef<number | null>(null);

  const updateLastAssistantMessage = (content: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { role: "assistant", content };
      return updated;
    });
  };

  const triggerFallbackGlitch = () => {
    if (glitchTimeoutRef.current !== null) {
      window.clearTimeout(glitchTimeoutRef.current);
    }

    setIsGlitching(true);
    glitchTimeoutRef.current = window.setTimeout(() => {
      setIsGlitching(false);
      glitchTimeoutRef.current = null;
    }, 450);
  };

  const activateScriptedMode = (notice?: string) => {
    scriptedModeRef.current = true;
    setIsScriptedMode(true);
    triggerFallbackGlitch();

    if (!notice) {
      return;
    }

    setMessages((prev) =>
      prev.some((message) => message.content === notice)
        ? prev
        : [...prev, { role: "assistant", content: notice }],
    );
  };

  const typeAssistantMessage = async (targetText: string, startingText = "") => {
    const safeStart = Math.min(startingText.length, targetText.length);

    if (safeStart === 0) {
      updateLastAssistantMessage("");
    }

    for (let i = safeStart + 1; i <= targetText.length; i += 1) {
      updateLastAssistantMessage(targetText.slice(0, i));
      await sleep(SCRIPTED_TYPING_DELAY_MS);
    }
  };

  const triggerScriptedMode = async (
    userText: string,
    options: { interference?: boolean; startingText?: string } = {},
  ) => {
    const reply = scriptedResponse(userText, {
      seenBefore: seenBeforeRef.current,
      interference: options.interference,
    });
    const prefix = options.startingText ?? "";
    const separator = prefix.trim().length > 0 ? " " : "";
    const targetText = `${prefix}${separator}${reply}`.trim();

    triggerFallbackGlitch();
    await typeAssistantMessage(targetText, prefix);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(false);
      setTimeout(() => setBlink(true), 200);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  useEffect(
    () => () => {
      if (glitchTimeoutRef.current !== null) {
        window.clearTimeout(glitchTimeoutRef.current);
      }
    },
    [],
  );

  const handleOpen = async () => {
    setOpen(true);

    try {
      seenBeforeRef.current = window.localStorage.getItem(LOTTIE_SEEN_KEY) === "true";
      window.localStorage.setItem(LOTTIE_SEEN_KEY, "true");
    } catch {
      seenBeforeRef.current = false;
    }

    if (!convId) {
      try {
        const id = await createConversation();
        setConvId(id);
      } catch {
        activateScriptedMode(SCRIPTED_MODE_NOTICE);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMsg]);

    let activeConvId = convId;
    let accumulated = "";

    try {
      if (!scriptedModeRef.current && activeConvId === null) {
        try {
          activeConvId = await createConversation();
          setConvId(activeConvId);
        } catch {
          activateScriptedMode();
        }
      }

      if (
        scriptedModeRef.current ||
        activeConvId === null ||
        Math.random() < SCRIPTED_OVERRIDE_CHANCE
      ) {
        await triggerScriptedMode(userMsg.content, {
          interference: scriptedModeRef.current || activeConvId === null,
        });
        return;
      }

      for await (const chunk of streamMessage(
        activeConvId,
        userMsg.content,
        seenBeforeRef.current,
      )) {
        accumulated += chunk;
        updateLastAssistantMessage(accumulated);
        await sleep(STREAM_TYPING_DELAY_MS);
      }
    } catch {
      activateScriptedMode();
      await triggerScriptedMode(userMsg.content, {
        interference: true,
        startingText: accumulated,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-primary text-white shadow-kawaii transition-transform hover:scale-105 active:scale-95"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label="Chat with Lottie"
        style={{ display: open ? "none" : "flex" }}
      >
        <div className="text-xl leading-none">{blink ? "(o.o)" : "(-.-)"}</div>
        <span className="mt-0.5 text-[9px] font-bold opacity-80">Lottie</span>
        <span className="absolute right-1 top-1 h-3 w-3 animate-ping rounded-full bg-pink-200 opacity-60" />
        <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-pink-300" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              x: isGlitching ? [0, -6, 5, -3, 2, 0] : 0,
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className={`fixed bottom-6 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-[1.5rem] border-2 bg-white shadow-2xl sm:w-96 ${
              isGlitching
                ? "border-destructive/50 shadow-[0_0_0_1px_rgba(239,68,68,0.15),0_0_30px_rgba(236,72,153,0.18)]"
                : "border-pink-200"
            }`}
            style={{ maxHeight: "520px" }}
          >
            <div className="bg-primary px-5 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center text-lg shrink-0 shadow-inner">
                {blink ? "(o.o)" : "(-.-)"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm leading-tight">Lottie</div>
                <div className="text-pink-100 text-xs opacity-80">
                  {isScriptedMode ? "companion | unstable" : "companion | in development"}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-pink-200 hover:text-white transition-colors ml-auto shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-pink-50/60 p-4" style={{ minHeight: 0 }}>
              <div className="flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="mr-2 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-white">
                        {"<3"}
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-sm bg-primary text-white"
                          : "rounded-bl-sm border border-pink-100 bg-white text-foreground shadow-sm"
                      }`}
                    >
                      {msg.content || (
                        <span className="text-xs italic opacity-50">
                          typing<span className="animate-pulse">...</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </div>

            <div className="flex gap-2 border-t border-pink-100 bg-white p-3">
              <input
                id="lottie-chat-input"
                type="text"
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="say something..."
                autoComplete="off"
                disabled={loading}
                className="flex-1 rounded-xl border border-pink-200 bg-pink-50 px-4 py-2.5 text-sm text-foreground transition-all placeholder:text-pink-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="h-10 w-10 shrink-0 rounded-xl bg-primary text-white transition-all hover:bg-primary/80 active:scale-90 disabled:opacity-40"
                aria-label="Send"
              >
                <span className="flex h-full w-full items-center justify-center">
                  <Send size={15} />
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
