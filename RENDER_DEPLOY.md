# Render Deploy

This repo is set up to deploy on Render as a single web service.

The frontend is built with Vite, and the Node API serves the built frontend plus `/api` routes from the same service.

## Files

- `render.yaml`: Render Blueprint config
- `artifacts/mochi-bunny-games`: frontend
- `artifacts/api-server`: API server

## Before You Start

Make sure your latest code is pushed to GitHub on the branch you want Render to deploy.

## Deploy Steps

1. Open the Render dashboard.
2. Click `New` -> `Blueprint`.
3. Connect the GitHub repo that contains this project.
4. Select the `main` branch.
5. Render should detect `render.yaml` at the repo root.
6. Review the service config and create the Blueprint.

## Environment Variables

After the service is created, open the service in Render and set:

```text
AI_INTEGRATIONS_OPENAI_BASE_URL=https://api.openai.com/v1
AI_INTEGRATIONS_OPENAI_API_KEY=your-openai-key
```

Optional for persistent chat history:

```text
DATABASE_URL=your-postgres-connection-string
```

If `DATABASE_URL` is omitted, chat can still run with in-memory fallback storage, but conversations will not persist across restarts or deploys.

## What Render Runs

Build command:

```bash
corepack enable && pnpm install --frozen-lockfile && pnpm --filter @workspace/mochi-bunny-games build && pnpm --filter @workspace/api-server build
```

Start command:

```bash
node artifacts/api-server/dist/index.cjs
```

Health check:

```text
/api/healthz
```

## After Deploy

1. Open the deployed Render service.
2. Go to `Settings` -> `Custom Domains` if you want your own domain.
3. Use the default `onrender.com` URL first to confirm:
   - the homepage loads
   - `/api/healthz` returns success
   - Lottie chat works after env vars are set

## Notes

- `PORT` is provided automatically by Render.
- If you change dependencies, commit the updated `pnpm-lock.yaml` before deploying.
- The service name in `render.yaml` is `mochi-bunny-games`. You can rename it in the file before first deploy if you want a different Render service name.
