# Project Context

## Environment
- Language: TypeScript (Node.js)
- Runtime: Node.js (via npx)
- Build: `npx next build` (production build with `NEXT_TURBOPACK=0`)
- Test: `npm run lint`, `npm run typecheck`
- Package Manager: npm
- Web Framework: Next.js 15.3.8 (App Router)

## Project Type
- Application (Portfolio/CV site)
- Single-page marketing site with routes: `/`, `/cv`, `/portfolio/gamedesign-animation`, `/portfolio/pdf`

## Infrastructure
- Container: None detected (apphosting.yaml present for Google App Hosting)
- Orchestration: None
- CI/CD: .github/workflows exists
- Cloud: Google App Hosting (apphosting.yaml)

## Structure
- Source: `src/` (app/, components/, ai/, hooks/, lib/)
- Build: `.next/` (output directory)
- Entry: Next.js App Router (`src/app/`)
- Port: 9002 (dev), default (prod)

## Conventions (OBSERVED from existing code)
- Naming: PascalCase for components, camelCase for variables
- Styling: Tailwind CSS with Radix UI primitives
- Imports: Absolute imports with `@/` alias (components/, hooks/, lib/)
- TypeScript strict mode (with ignoreBuildErrors in next.config.ts)

## Notes
- Turbopack has Wasm binding issues on this macOS environment; use `NEXT_TURBOPACK=0` for builds
- The SWC binary (`@next/swc-darwin-arm64`) gives dlopen errors but server still works via JS fallback
- Production build succeeds with warnings (missing opentelemetry jaeger exporter, handlebars require.extensions)
- Server started via `nohup npx next start -p 9002` (PID 7176)
