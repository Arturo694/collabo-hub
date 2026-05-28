# Collabo Hub

Monorepo unifying **collabo-hub-back** (NestJS) and **collabo-hub-front** (React) under a single repository.

## Structure

```
collabo-hub/
├── collabo-hub-back/    # API backend
├── collabo-hub-front/   # Frontend
└── package.json         # Shared scripts
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev:back` | Start backend in watch mode |
| `pnpm dev:front` | Start frontend dev server |
| `pnpm build:back` | Build backend |
| `pnpm build:front` | Build frontend |

## License

MIT — free to use, clone, and modify.
