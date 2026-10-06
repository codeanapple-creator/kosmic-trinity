---
name: VPS deploys of this pnpm monorepo (non-Replit host)
description: Why the root `pnpm build` script fails on a bare VPS for this artifacts-monorepo template, and what to run instead.
---

## Root `pnpm build` is not safe to run on a non-Replit host

The root `package.json` `build` script is `pnpm run typecheck && pnpm -r --if-present run build` — it recursively builds **every** workspace package, including Replit-only dev tooling (e.g. a `mockup-sandbox` canvas-preview artifact). Those tooling packages' Vite configs hard-require `PORT` and `BASE_PATH` env vars that only exist inside Replit's own workflow system. On a bare VPS these are unset, so `vite build` throws immediately and `pnpm -r` fail-fasts — meaning the actually-deployed artifact (e.g. the main web app) may never even reach its own build step, silently leaving stale `dist/` output in place while every other step (git pull, pm2 restart) appears to succeed.

**Why:** the monorepo template is designed around Replit's artifact/workflow system, which injects `PORT`/`BASE_PATH` per-service. A generic VPS deploy script has no equivalent, and there's no visible error unless you read pnpm's per-package build log carefully.

**How to apply:** for VPS/non-Replit deploys, never run the bare root `pnpm build`. Instead, typecheck normally (safe, no env vars needed) then build only the artifacts actually served in production:

```bash
pnpm run typecheck
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/<frontend-artifact> --filter @workspace/<api-artifact> run build
```

`PORT` only gates the Vite dev/preview server config validation for that build invocation — any positive integer works, it is not embedded in the output. `BASE_PATH` **is** embedded (as the app's base URL for assets); use `/` for a root-mounted domain.

## Peer-only devDependencies can silently differ across environments

A type package that is only pulled in transitively (e.g. `@types/three`, present only as another package's `peerDependency` in the lockfile, never declared directly) can resolve fine under one pnpm environment (e.g. the Replit dev container) but fail `tsc` on another host (e.g. VPS) with "Could not find a declaration file for module" — because hoisting/resolution isn't guaranteed for peer-only entries across different pnpm versions/node-linker settings.

**Why:** pnpm's strict node_modules only guarantees resolution for a package's own declared dependencies, not transitively-inherited peer resolutions.

**How to apply:** if a workspace package imports something whose types only appear in the lockfile as a peer dependency of another package, add the `@types/*` package as an explicit `devDependency` in that workspace package's own `package.json`, even though it "works" without it locally.

## Production VPS directory

For this site's Hostinger VPS, deploy from `/var/www/kosmic-trinity` using `bash deploy.sh`. Do not deploy from `~/kosmic-trinity` (`/root/kosmic-trinity`).

**Why:** the user supplied nginx's active configuration and terminal output confirming two separate clones. Nginx serves the `/var/www` clone; rebuilding the `/root` clone left the live site unchanged.

**How to apply:** give the full command `cd /var/www/kosmic-trinity && bash deploy.sh`. Treat nginx's active configuration as the authority if the server setup later changes. Preserve local server edits before resolving any pull conflict; do not assume a hard reset only touches the files mentioned by git's error.
