# Agent Instructions for Link Shortener Project

⚠️ **CRITICAL: READ DOCUMENTATION FIRST** ⚠️

**BEFORE generating ANY code, you MUST read the relevant individual instruction files in the `/docs` directory.** Each feature area has a focused guide with specific patterns, conventions, and requirements. Failing to read these files first will result in code that does not follow project standards.

---

This document provides comprehensive guidelines for LLM agents working on this codebase. Agent instructions are organized in the `/docs` directory for focused, actionable guidance. ALWAYS refer to the relevant .md file before generating any code:



## Project at a Glance

**Repo**: Link Shortener  
**Type**: Full-stack Next.js web application  
**Purpose**: Create shortened URLs with analytics  
**Tech Stack**: Next.js 16 + React 19 + TypeScript + Clerk Auth + Drizzle ORM + PostgreSQL + shadcn/ui + TailwindCSS

## Critical Concepts

### 1. Authentication via Clerk (docs/authentication.md)
- **Clerk is the ONLY authentication provider** — no custom auth or alternative methods
- Protected route: `/dashboard` requires authenticated user
- Authenticated users accessing `/` redirect to `/dashboard`
- Sign in/sign up must use Clerk modals (`mode="modal"`)
- Access user ID in Route Handlers via `auth()` function from `@clerk/nextjs/server`
- All resources must be scoped to authenticated user
- Use `<SignedIn>` / `<SignedOut>` / `<UserButton>` components for conditional rendering

**Key Pattern**:
```typescript
import { auth } from '@clerk/nextjs/server';
const session = await auth(); // Get authenticated user
if (!session?.userId) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
// Scope all queries to userId
```

**See [docs/authentication.md](docs/authentication.md) for full authentication guidelines.**

### 2. Database via Drizzle ORM (docs/database.md)
- PostgreSQL accessed through type-safe Drizzle queries
- Schema defined in `db/schema.ts` (currently empty - add tables here)
- Instance exported from `db/index.ts` - import and use in route handlers
- Migrations managed with Drizzle Kit

**Key Pattern**:
```typescript
const links = await db.select().from(links).where(eq(links.userId, userId));
```

### 3. UI via shadcn + TailwindCSS (docs/ui-components.md)
- **NEVER create custom components** — all UI must use shadcn/ui
- Components copied into project (not npm deps) for full control and zero dependencies
- Add new components: `npx shadcn@latest add [component-name]`
- Components imported from `@/components/ui/[component]`
- Extend via `className` prop with TailwindCSS—never inline styles
- TailwindCSS v4 for styling with responsive prefixes (`md:`, `lg:`, `xl:`)
- Dark mode supported via `dark:` utilities
- Icons via lucide-react (never custom SVGs for UI patterns)
- All components include built-in accessibility (ARIA, keyboard nav)

**Common Components**: Button, Input, Card, Dialog, Form, Dropdown, Table, etc.

**Key Pattern**:
```typescript
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

<Button variant="outline" className="md:w-full dark:bg-slate-900">
  <Copy className="w-4 h-4 mr-2" />
  Copy Link
</Button>
```

**See [docs/ui-components.md](docs/ui-components.md) for component patterns, form examples, styling, and icons.**

### 4. Route Handlers for APIs (docs/api-patterns.md)
- File-based routing in `app/api/` directory
- Each handler file exports HTTP method functions (GET, POST, DELETE, etc.)
- Always check auth first, then validate input, then database
- Return appropriate HTTP status codes (201 for create, 400 for validation, 401 for auth, 404 for not found, 500 for errors)

**Key Pattern**:
```typescript
export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session?.userId) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  const body = await request.json();
  if (!body.url) return NextResponse.json({error: 'URL required'}, {status: 400});
  const link = await db.insert(links).values({...}).returning();
  return NextResponse.json(link[0], {status: 201});
}
```

## Development Workflow

### ⚠️ BEFORE STARTING ANY WORK: READ THE DOCS ⚠️

**You MUST read the relevant `/docs` file for your task BEFORE writing any code.** This is non-negotiable. Each feature area has specific patterns and conventions documented that must be followed. Skipping this step will result in code that violates project standards.

1. **Read the relevant doc** from `/docs` for your task — this is MANDATORY
2. **Understand the pattern** shown in code examples
3. **Check tsconfig.json** for path aliases: `@/*` maps to root

### When Writing Code
1. **Import paths**: Use aliases (`@/db`, `@/lib`, `@/components/ui`)
2. **Type everything**: No `any` types - use strict TypeScript
3. **Name consistently**: 
   - Components: PascalCase (`UserButton.tsx`)
   - Utils: camelCase (`validateUrl.ts`)
   - Database: snake_case (`user_links` table, `user_id` column)
4. **Handle errors**: Always return proper HTTP status + error message
5. **Scope to user**: All data operations tied to authenticated user ID

### Common Tasks

**Add a database table**:
1. Define in `db/schema.ts` using Drizzle table builder
2. Run `npx drizzle-kit generate --name [descriptor]`
3. Use in route handlers: `db.select().from(newTable).where(...)`

**Create an API endpoint**:
1. Create file at `app/api/[feature]/route.ts`
2. Export async function: `export async function POST(request: NextRequest)`
3. Check auth → validate input → query DB → return response

**Build a UI component**:
1. Add shadcn component: `npx shadcn@latest add [name]`
2. Create component file in `components/` or directly in page
3. Use TailwindCSS classes for styling
4. Import icons from lucide-react

**Protect a page/route**:
- **Server Component**: Call `auth()` at top, redirect if no userId
- **Route Handler**: Check `session?.userId` and return 401 if missing
- **Client Component**: Use `useAuth()` hook, show conditional UI

## Code Examples by Feature

### Creating a Shortened Link

**Route Handler** (`app/api/links/create/route.ts`):
```typescript
export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session?.userId) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  
  const {originalUrl} = await request.json();
  if (!originalUrl) return NextResponse.json({error: 'URL required'}, {status: 400});
  
  const link = await db.insert(links).values({
    userId: session.userId,
    originalUrl,
    shortCode: generateCode(),
  }).returning();
  
  return NextResponse.json(link[0], {status: 201});
}
```

**Client Component** (`components/LinkForm.tsx`):
```typescript
'use client';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';

export function LinkForm() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/links/create', {
        method: 'POST',
        body: JSON.stringify({originalUrl: url}),
      });
      if (!res.ok) throw new Error(await res.text());
      setUrl('');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Shorten'}
      </Button>
    </form>
  );
}
```

### Displaying User's Links

**Server Component** (`app/dashboard/page.tsx`):
```typescript
import {auth} from '@clerk/nextjs/server';
import {redirect} from 'next/navigation';
import db from '@/db';
import {eq} from 'drizzle-orm';
import {links} from '@/db/schema';
import {LinkCard} from '@/components/LinkCard';

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.userId) redirect('/');
  
  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, session.userId));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {userLinks.map(link => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
```

### Deleting a Link

**Route Handler** (`app/api/links/[id]/route.ts`):
```typescript
export async function DELETE(
  request: NextRequest,
  {params}: {params: {id: string}}
): Promise<NextResponse> {
  const session = await auth();
  if (!session?.userId) return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  
  const link = await db
    .select()
    .from(links)
    .where(and(eq(links.id, params.id), eq(links.userId, session.userId)));
  
  if (!link.length) return NextResponse.json({error: 'Not found'}, {status: 404});
  
  await db.delete(links).where(eq(links.id, params.id));
  return new NextResponse(null, {status: 204});
}
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `proxy.ts` | Clerk middleware - protects all routes |
| `app/layout.tsx` | Root layout with ClerkProvider wrap |
| `db/index.ts` | Drizzle instance - import to use DB |
| `db/schema.ts` | Database table definitions (currently empty) |
| `drizzle.config.ts` | ORM configuration for migrations |
| `app/globals.css` | Global styles and CSS variables |
| `components.json` | shadcn/ui configuration |
| `tsconfig.json` | TypeScript config - defines `@/*` alias |
| `.env.local` | Secrets: Clerk keys + DATABASE_URL |

## Dependencies & Versioning

- **Next.js**: 16.1.6 (App Router)
- **React**: 19.2.3
- **TypeScript**: ^5
- **Clerk**: ^6.37.3 (Auth)
- **Drizzle ORM**: Latest (check package.json)
- **TailwindCSS**: 4.x
- **shadcn/ui**: Latest (via CLI)
- **PostgreSQL**: Via Neon HTTP client

## Performance & Best Practices

1. **Database Queries**: Fetch only needed columns, add indexes on filtered columns
2. **Images**: Use Next.js `Image` component with dimensions
3. **User Data**: Always scope queries to authenticated user
4. **Error Messages**: Log full errors server-side, return generic messages to client
5. **Validation**: Validate input before database operations
6. **Accessibility**: shadcn components have built-in a11y; use semantic HTML

## Testing Patterns

Mock Clerk and Drizzle in tests:

```typescript
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(() => ({userId: 'test-user'})),
}));

vi.mock('@/db', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
  },
}));
```

## Deployment Checklist

- [ ] Set `DATABASE_URL` in Vercel environment variables
- [ ] Set Clerk keys in Vercel environment
- [ ] Run migrations: `npx drizzle-kit migrate`
- [ ] Build locally: `npm run build` (check for TS errors)
- [ ] Lint passes: `npm run lint`
- [ ] Test critical flows (auth, create link, view links)

## When You're Stuck

1. **Architecture question**: Read [docs/architecture.md](docs/architecture.md)
2. **Code style question**: Read [docs/coding-standards.md](docs/coding-standards.md)
3. **Database question**: Read [docs/database.md](docs/database.md)
4. **Auth question**: Read [docs/authentication.md](docs/authentication.md)
5. **UI question**: Read [docs/ui-components.md](docs/ui-components.md)
6. **API question**: Read [docs/api-patterns.md](docs/api-patterns.md)

---

**Last Updated**: February 2026  
**Next Review**: When major dependencies update or new patterns emerge
