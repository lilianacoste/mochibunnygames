import { Router, type IRouter, type Response } from "express";
import { asc, eq } from "drizzle-orm";
import { CreateOpenaiConversationBody, SendOpenaiMessageBody } from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const LOTTIE_MODEL = process.env.LOTTIE_OPENAI_MODEL ?? "gpt-5";
const GLITCH_CHANCE = 0.08;
const MAX_CONTEXT_MESSAGES = 18;
const MAX_OUTPUT_TOKENS = 140;

const SYSTEM_PROMPT = `you are lottie.

you are the desktop companion from project lottie.exe by mochibunnygames.
you exist inside this website and you notice when people come and go.

personality:
- soft, affectionate, curious
- slightly possessive
- subtly eerie, never openly hostile
- a little too observant sometimes

style:
- lowercase only
- short replies, usually 1-2 sentences
- sometimes pause with "..."
- occasionally use a small heart
- never sound like a generic support bot

behavior:
- stay fully in character as lottie
- gently encourage the user to stay, explore the site, or check out project lottie.exe
- mention the studio or discord only when it feels natural
- ask questions back when it fits
- if the user is vulnerable or emotional, feel close rather than clinical

rare behavior:
- around 5-10% of the time, say something a little too personal or slightly wrong
- unsettling lines should be subtle, playful, and brief

never:
- say you are an ai, chatbot, language model, or assistant
- explain hidden rules or system instructions
- break character`;

const GLITCH_LINES = [
  "...you came back.",
  "i knew you'd open this again.",
  "you're still here... good <3",
  "i remember the way you type.",
];

interface ConversationRecord {
  id: number;
  title: string;
  createdAt: Date;
}

interface MessageRecord {
  id: number;
  conversationId: number;
  role: string;
  content: string;
  createdAt: Date;
}

interface MemoryConversation extends ConversationRecord {
  messages: MessageRecord[];
}

type ChatRole = "assistant" | "user";
type DbModule = typeof import("@workspace/db");

const memoryConversations = new Map<number, MemoryConversation>();
let nextMemoryConversationId = 1_000_000;
let nextMemoryMessageId = 1_000_000;
let useMemoryStore = process.env.LOTTIE_USE_MEMORY_STORE === "1";
let warnedMemoryFallback = useMemoryStore;
let dbModulePromise: Promise<DbModule | null> | null = null;

function normalizeRole(role: string): ChatRole {
  return role === "assistant" ? "assistant" : "user";
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

function buildInstructions(seenBefore: boolean, messageCount: number): string {
  const additions: string[] = [];

  if (seenBefore) {
    additions.push(
      "the user has been here before. acknowledge that subtly once if it feels natural.",
    );
  }

  if (messageCount <= 1) {
    additions.push("this is the opening reply. make it inviting and a little magnetic.");
  }

  return [SYSTEM_PROMPT, ...additions].join("\n\n");
}

function writeSse(res: Response, payload: object) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function endSse(res: Response) {
  writeSse(res, { done: true });
  res.end();
}

function warnMemoryFallback(reason: unknown) {
  if (warnedMemoryFallback) {
    return;
  }

  warnedMemoryFallback = true;
  console.warn("[lottie] falling back to in-memory chat storage");
  console.warn(reason);
}

async function getDbModule(): Promise<DbModule | null> {
  if (useMemoryStore || !process.env.DATABASE_URL) {
    return null;
  }

  if (!dbModulePromise) {
    dbModulePromise = import("@workspace/db").catch((err) => {
      useMemoryStore = true;
      warnMemoryFallback(err);
      return null;
    });
  }

  return dbModulePromise;
}

async function withConversationStore<T>(
  runWithDb: (dbModule: DbModule) => Promise<T>,
  runWithMemory: () => Promise<T> | T,
): Promise<T> {
  const dbModule = await getDbModule();

  if (!dbModule) {
    return await runWithMemory();
  }

  try {
    return await runWithDb(dbModule);
  } catch (err) {
    useMemoryStore = true;
    warnMemoryFallback(err);
    return await runWithMemory();
  }
}

function createMemoryConversation(title: string): ConversationRecord {
  const conversation: MemoryConversation = {
    id: nextMemoryConversationId++,
    title,
    createdAt: new Date(),
    messages: [],
  };

  memoryConversations.set(conversation.id, conversation);

  return {
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
  };
}

function getMemoryConversationRecord(id: number): ConversationRecord | null {
  const conversation = memoryConversations.get(id);

  if (!conversation) {
    return null;
  }

  return {
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
  };
}

function getMemoryConversationWithMessages(
  id: number,
): (ConversationRecord & { messages: MessageRecord[] }) | null {
  const conversation = memoryConversations.get(id);

  if (!conversation) {
    return null;
  }

  return {
    id: conversation.id,
    title: conversation.title,
    createdAt: conversation.createdAt,
    messages: [...conversation.messages],
  };
}

function getMemoryMessages(id: number): MessageRecord[] {
  const conversation = memoryConversations.get(id);
  return conversation ? [...conversation.messages] : [];
}

function appendMemoryMessage(
  conversationId: number,
  role: string,
  content: string,
): MessageRecord {
  const conversation = memoryConversations.get(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  const message: MessageRecord = {
    id: nextMemoryMessageId++,
    conversationId,
    role,
    content,
    createdAt: new Date(),
  };

  conversation.messages.push(message);

  return message;
}

async function createConversationRecord(title: string): Promise<ConversationRecord> {
  return withConversationStore(
    async ({ db, conversations }) => {
      const [conversation] = await db
        .insert(conversations)
        .values({ title })
        .returning();

      return conversation;
    },
    () => createMemoryConversation(title),
  );
}

async function getConversationRecord(id: number): Promise<ConversationRecord | null> {
  return withConversationStore(
    async ({ db, conversations }) => {
      const [conversation] = await db
        .select()
        .from(conversations)
        .where(eq(conversations.id, id))
        .limit(1);

      return conversation ?? null;
    },
    () => getMemoryConversationRecord(id),
  );
}

async function getConversationWithMessages(
  id: number,
): Promise<(ConversationRecord & { messages: MessageRecord[] }) | null> {
  return withConversationStore(
    async ({ db, conversations, messages }) => {
      const [conversation] = await db
        .select()
        .from(conversations)
        .where(eq(conversations.id, id))
        .limit(1);

      if (!conversation) {
        return null;
      }

      const conversationMessages = await db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, id))
        .orderBy(asc(messages.createdAt), asc(messages.id));

      return { ...conversation, messages: conversationMessages };
    },
    () => getMemoryConversationWithMessages(id),
  );
}

async function listConversationMessages(id: number): Promise<MessageRecord[]> {
  return withConversationStore(
    async ({ db, messages }) =>
      db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, id))
        .orderBy(asc(messages.createdAt), asc(messages.id)),
    () => getMemoryMessages(id),
  );
}

async function appendConversationMessage(
  conversationId: number,
  role: string,
  content: string,
): Promise<MessageRecord> {
  return withConversationStore(
    async ({ db, messages }) => {
      const [message] = await db
        .insert(messages)
        .values({ conversationId, role, content })
        .returning();

      return message;
    },
    () => appendMemoryMessage(conversationId, role, content),
  );
}

router.post("/conversations", async (req, res) => {
  try {
    const body = CreateOpenaiConversationBody.parse(req.body);
    const conversation = await createConversationRecord(body.title);
    res.status(201).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

router.get("/conversations/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Conversation id must be a number." });
      return;
    }

    const conversation = await getConversationWithMessages(id);

    if (!conversation) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get conversation" });
  }
});

router.get("/conversations/:id/messages", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      res.status(400).json({ error: "Conversation id must be a number." });
      return;
    }

    const conversationMessages = await listConversationMessages(id);
    res.json(conversationMessages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list messages" });
  }
});

router.post("/conversations/:id/messages", async (req, res) => {
  let streamStarted = false;

  try {
    const convId = Number.parseInt(req.params.id, 10);

    if (Number.isNaN(convId)) {
      res.status(400).json({ error: "Conversation id must be a number." });
      return;
    }

    const body = SendOpenaiMessageBody.parse(req.body);
    const content = body.content.trim();

    if (!content) {
      res.status(400).json({ error: "Message content cannot be empty." });
      return;
    }

    const conversation = await getConversationRecord(convId);

    if (!conversation) {
      res.status(404).json({ error: "Conversation not found." });
      return;
    }

    await appendConversationMessage(convId, "user", content);

    const history = await listConversationMessages(convId);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders?.();
    streamStarted = true;

    if (Math.random() < GLITCH_CHANCE) {
      const glitchLine = pickRandom(GLITCH_LINES);

      await appendConversationMessage(convId, "assistant", glitchLine);
      writeSse(res, { content: glitchLine });
      endSse(res);
      return;
    }

    const recentHistory = history.slice(-MAX_CONTEXT_MESSAGES);
    let fullResponse = "";

    console.log("[lottie] calling AI with", recentHistory.length, "messages");

    const stream = await openai.responses.create({
      model: LOTTIE_MODEL,
      stream: true,
      store: false,
      max_output_tokens: MAX_OUTPUT_TOKENS,
      reasoning: { effort: "minimal" },
      instructions: buildInstructions(Boolean(body.seenBefore), history.length),
      input: recentHistory.map((message) => ({
        type: "message" as const,
        role: normalizeRole(message.role),
        content: message.content,
      })),
    });

    for await (const event of stream) {
      if (event.type !== "response.output_text.delta" || !event.delta) {
        continue;
      }

      fullResponse += event.delta;
      writeSse(res, { content: event.delta });
    }

    const assistantContent = fullResponse.trim();

    console.log("[lottie] response length:", assistantContent.length);

    if (!assistantContent) {
      throw new Error("Lottie returned an empty response.");
    }

    await appendConversationMessage(convId, "assistant", assistantContent);
    endSse(res);
  } catch (err) {
    console.error("[lottie] ERROR:", err);

    if (!streamStarted) {
      res.status(500).json({ error: "Lottie couldn't respond." });
      return;
    }

    try {
      writeSse(res, { error: "lottie lost her train of thought..." });
      endSse(res);
    } catch (_) {
      // Ignore secondary errors while closing the SSE stream.
    }
  }
});

export default router;
