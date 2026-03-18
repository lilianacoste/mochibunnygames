import { Router, type IRouter } from "express";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);

const hasOpenAIRouteDependencies =
  Boolean(process.env.AI_INTEGRATIONS_OPENAI_BASE_URL) &&
  Boolean(process.env.AI_INTEGRATIONS_OPENAI_API_KEY);

if (hasOpenAIRouteDependencies) {
  let openaiRouterPromise: Promise<IRouter> | null = null;

  const loadOpenAIRouter = () => {
    openaiRouterPromise ??= import("./openai/index").then(
      (module) => module.default,
    );
    return openaiRouterPromise;
  };

  router.use("/openai", async (req, res, next) => {
    try {
      const openaiRouter = await loadOpenAIRouter();
      return openaiRouter(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
} else {
  router.use("/openai", (_req, res) => {
    res.status(503).json({
      error:
        "OpenAI chat is unavailable until AI_INTEGRATIONS_OPENAI_BASE_URL and AI_INTEGRATIONS_OPENAI_API_KEY are set.",
    });
  });
}

export default router;
