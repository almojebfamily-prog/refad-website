# صندوق رفاد العائلي — Refad Family Fund Website

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4, Arabic RTL, Supabase backend.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connecting Supabase

The public pages that show board members, initiatives, and reports, plus the
entire private portal (`/portal/*`), read from Supabase. Without it configured,
those pages/actions will error at request time — everything else works.

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.local.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Project Settings → API.
   - `SUPABASE_SERVICE_ROLE_KEY` — same page. **Server-only, never expose to the client.**
3. In the Supabase SQL Editor, run `supabase/migrations/0001_init.sql`, then `supabase/seed.sql`.
4. Create two demo accounts (Authentication → Users → Add user) so you can test both roles:
   - a **member** account
   - an **admin** account
5. For each, run this in the SQL editor to attach a profile (replace the UUID with the user's id from step 4):
   ```sql
   insert into profiles (id, full_name, role)
   values ('<user-id>', 'اسم العضو', 'member'); -- or 'admin'
   ```
6. Regenerate typed table definitions once the schema is live (optional — `types/database.types.ts` is hand-written to match the migration):
   ```bash
   npx supabase gen types typescript --project-id <your-project-id> > types/database.types.ts
   ```

## Deployment

Deploy to [Vercel](https://vercel.com/new), setting the same three environment
variables from `.env.local` in the project's dashboard.
