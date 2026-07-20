# agsyba-app

Production-ready Expo + TypeScript foundation using Expo Router, NativeWind, TanStack Query, Zustand, React Hook Form, Zod, MMKV, Secure Store, Reanimated, and Gesture Handler.

## Commands

```bash
npm install
npm run start
npm run typecheck
npm run lint
npm test
npm run format:check
```

Set `EXPO_PUBLIC_API_URL` in `.env` before connecting feature services to a backend. Feature modules belong under `src/features`; API methods belong under `src/services/api`; query hooks belong under `src/queries`.
