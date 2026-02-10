# Authentication Instructions

## Overview
All authentication in this application is **exclusively handled by Clerk**. No other authentication methods should be used under any circumstances.

## Core Rules

### 1. Clerk is the Only Auth Provider
- All user authentication flows must use Clerk
- Do not implement custom auth, OAuth providers, or alternative auth methods
- All routes requiring authentication must validate via Clerk's `auth()` function

### 2. Route Protection

#### Protected Routes
- `/dashboard` and all nested routes under `/dashboard/*` **require** authenticated users
- Use `auth()` from `@clerk/nextjs` in Route Handlers to verify user identity
- Return 401 status if user is not authenticated

**Pattern for Route Handlers**:
```typescript
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session?.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Protected logic here
}
```

#### Homepage Redirect Logic
- When authenticated users access `/` (homepage), redirect them to `/dashboard`
- When unauthenticated users access `/`, show the public homepage
- Implement in `app/page.tsx` using Clerk's `<SignedIn>` and `<SignedOut>` components

**Pattern**:
```typescript
import { SignedIn, SignedOut, redirect } from '@clerk/nextjs';

export default function HomePage() {
  return (
    <>
      <SignedIn>
        {redirect('/dashboard')}
      </SignedIn>
      <SignedOut>
        {/* Public homepage content */}
      </SignedOut>
    </>
  );
}
```

### 3. Sign In / Sign Up Modals
- Both sign-in and sign-up flows **must** use Clerk modals, not full-page forms
- Use `<SignInButton>` and `<SignUpButton>` components with `mode="modal"`
- Modals should be triggered from buttons on the public homepage or navigation

**Pattern**:
```typescript
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function PublicNav() {
  return (
    <div>
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button>Sign Up</button>
      </SignUpButton>
    </div>
  );
}
```

### 4. User Data Scoping
- All database queries must be scoped to the authenticated user's ID
- Extract `userId` from `auth()` and use it as a filter condition
- Never return data for users other than the authenticated user

**Pattern**:
```typescript
const session = await auth();
const userId = session?.userId;

const userLinks = await db.select()
  .from(links)
  .where(eq(links.userId, userId));
```

### 5. Conditional Rendering
- Use `<SignedIn>` for content only authenticated users should see
- Use `<SignedOut>` for public content
- Use `<UserButton>` for user profile/logout menu in authenticated areas

**Pattern**:
```typescript
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header>
      <SignedOut>
        {/* Navigation for unauthenticated users */}
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

## Environment Setup
Ensure the following environment variables are configured in `.env.local`:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Public Clerk key
- `CLERK_SECRET_KEY` - Secret Clerk key
- Configure Clerk dashboard with your application's URLs (localhost for development)

## Testing Protected Routes
- Test unauthenticated access to `/dashboard` - should be blocked
- Test authenticated user accessing `/` - should redirect to `/dashboard`
- Test sign-in and sign-up modals - should appear on public pages
- Verify user data is properly scoped in database queries

## References
- [Clerk Next.js Documentation](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Protect Routes](https://clerk.com/docs/nextjs/protect-routes)
