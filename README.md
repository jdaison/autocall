# AutoCall

Landing y onboarding para la SaaS AutoCall: captura de datos, preferencias en Supabase y disparo de llamada de prueba vía Twilio.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** + componentes tipo Shadcn/UI
- **Supabase** (PostgreSQL + Auth)
- **Twilio** (trigger de llamada con TwiML)
- Despliegue: **Vercel**

## Desarrollo

```bash
cp .env.example .env.local
# Editar .env.local con tus claves de Supabase y Twilio

npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Modo mocks (sin Base de Datos ni Twilio)

Para probar la app sin configurar Supabase ni Twilio, usa variables de entorno de mocks:

- **`USE_MOCKS=true`** (solo servidor): la página de onboarding usa una lista fija de empresas y la acción "Iniciar Llamada" responde éxito sin llamar a Supabase ni Twilio.
- **`NEXT_PUBLIC_USE_MOCKS=true`** (cliente): el wizard no requiere sesión (no se llama a `signInAnonymously`).

Pon ambas en `true` en `.env.local` para un flujo completo sin backend:

```env
USE_MOCKS=true
NEXT_PUBLIC_USE_MOCKS=true
```

## Configuración

### 1. Supabase

- Crea un proyecto en [Supabase](https://supabase.com).
- En **SQL Editor**, ejecuta el contenido de `supabase/migrations/001_initial_schema.sql`.
- En **Authentication → Providers**, activa **Anonymous sign-in** para que el onboarding "Probar Gratis" funcione sin registro por email.
- Añade en `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`

### 2. Twilio

- Crea una cuenta y un número de voz en [Twilio](https://www.twilio.com).
- Añade a `.env.local`:
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_PHONE_NUMBER` (ej: +573001234567)
- Para probar en local, la URL de TwiML debe ser accesible por Twilio (ej. túnel con ngrok y `NEXT_PUBLIC_APP_URL=https://xxx.ngrok.io`).

### 3. PWA (opcional)

- Añade `public/icon-192.png` y `public/icon-512.png` para los iconos del manifest.
- El manifest está en `public/manifest.json`.

## Estructura relevante

```
src/
├── app/
│   ├── layout.tsx, page.tsx
│   ├── onboarding/page.tsx
│   └── api/twiml/outbound/route.ts   # TwiML para la llamada de prueba
├── components/
│   ├── landing/                      # Hero, Navbar, Pricing, etc.
│   ├── onboarding/                   # Wizard 4 pasos
│   └── ui/                           # Button, Input, Card, RadioGroup
├── lib/
│   ├── supabase/client.ts, server.ts
│   ├── twilio.ts
│   └── validations/onboarding.ts     # Zod
├── actions/call.ts                   # initiateCallAction
└── types/database.ts
```

## Deploy en Vercel

Conecta el repo y configura las mismas variables de entorno. La URL de TwiML usará `VERCEL_URL` automáticamente.
