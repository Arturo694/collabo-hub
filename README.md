# Collabo Hub

Monorepo unifying **collabo-hub-back** (NestJS) and **collabo-hub-front** (React) under a single repository using pnpm workspaces.

## Structure

```
collabo-hub/
├── collabo-hub-back/       # API backend (NestJS)
├── collabo-hub-front/      # Frontend (React Router)
├── packages/
│   ├── shared/             # Shared DTOs and types (see below)
│   └── emails/             # Email templates (compiled to dist/)
├── pnpm-workspace.yaml     # Workspace config
└── package.json            # Shared scripts
```

## Shared Package (`@collabo-hub/shared`)

DTOs and types shared between back and front live in `packages/shared/`.

```
packages/shared/
├── src/
│   ├── index.ts
│   └── dto/
│       ├── signup-request.ts
│       └── signup-response.ts
├── package.json
└── tsconfig.json
```

### Adding or updating shared types

Edit the files in `packages/shared/src/`. **No extra steps needed** — changes are picked up automatically because `workspace:*` creates a symlink, not a copy.

### Usage in code

```typescript
import { SignupRequest, SignupResponse } from '@collabo-hub/shared';
```

### Adding a new shared package

Create a new folder under `packages/` with a `package.json` containing a `"name": "@collabo-hub/<name>"` and add it to the workspace. No need to edit `pnpm-workspace.yaml` — the `packages/*` glob covers all subdirectories.

## Email Templates (`@collabo-hub/emails`)

Email templates live in `packages/emails/src/templates/` as `.tsx` files and are **compiled to `dist/`** before the backend can use them.

### Updating a template

After editing a template file, rebuild the package:

```bash
pnpm --filter @collabo-hub/emails build
```

> The root `dev:back` and `build:back` scripts already run this automatically, but if you're iterating on emails independently, run the command above.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev:back` | Start backend in watch mode |
| `pnpm dev:front` | Start frontend dev server |
| `pnpm build:back` | Build backend |
| `pnpm build:front` | Build frontend |

## License

MIT — free to use, clone, and modify.
