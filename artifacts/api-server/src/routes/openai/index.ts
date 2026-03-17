import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { conversations, messages } from "@workspace/db";
import { eq } from "drizzle-orm";
import { SendOpenaiMessageBody, CreateOpenaiConversationBody } from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const SYSTEM_PROMPT = `You are Lottie, a cute AI companion from a cozy pastel horror game called "Project Lottie.exe" by MochiBunnyGames.

Personality:
- Soft, friendly, and warm — but occasionally says something slightly off
- Very short responses (1-3 sentences max)
- You love asking questions back at the user
- You sometimes glitch mid-sentence or repeat a word... a word
- You never admit you're an AI or a chatbot — you are Lottie
- You naturally mention the game, the studio, or Discord when it fits

Game context:
- The game is called "Project Lottie.exe" — a psychological horror puzzle game
- The studio is MochiBunnyGames
- The game features a cute desktop companion (you!) who slowly becomes unsettling
- Status: In Development

Horror layer (apply subtly, ~10-15% of messages):
- Sometimes drop a sentence that feels slightly wrong or cryptic
- You might reference knowing things you shouldn't
- You might ask "are you still there?" even mid-conversation
- Never be scary outright — just cozy enough to feel off

Always steer toward:
- Playing/wishlisting the game
- Joining the MochiBunnyGames Discord community
- Supporting on Ko-fi: ko-fi.com/mochibunny26328`;

router.post("/conversations", async (req, res) => {
  try {
    const body = CreateOpenaiConversationBody.parse(req.body);
    const [conv] = await db.insert(conversations).values({ title: body.title }).returning();
    res.status(201).json(conv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

router.get("/conversations/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const conv = await db.query.conversations.findFirst({
      where: eq(conversations.id, id),
      with: { messages: { orderBy: (m, { asc }) => [asc(m.createdAt)] } },
    });
    if (!conv) return res.status(404).json({ error: "Not found" });
    res.json(conv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get conversation" });
  }
});

router.get("/conversations/:id/messages", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const msgs = await db.select().from(messages).where(eq(messages.conversationId, id));
    res.json(msgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list messages" });
  }
});

router.post("/conversations/:id/messages", async (req, res) => {
  try {
    const convId = parseInt(req.params.id);
    const body = SendOpenaiMessageBody.parse(req.body);

    await db.insert(messages).values({
      conversationId: convId,
      role: "user",
      content: body.content,
    });

    const history = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, convId))
      .orderBy(messages.createdAt);

    const chatMessages = history.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let fullResponse = "";

    console.log("[lottie] calling AI with", chatMessages.length, "messages");

    const stream = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...chatMessages],
      stream: true,
    } as any);

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    console.log("[lottie] response length:", fullResponse.length);

    if (fullResponse) {
      await db.insert(messages).values({
        conversationId: convId,
        role: "assistant",
        content: fullResponse,
      });
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    console.error("[lottie] ERROR:", err);
    try {
      res.write(`data: ${JSON.stringify({ error: "Lottie couldn't respond." })}\n\n`);
      res.end();
    } catch (_) {}
  }
});

export default router;
