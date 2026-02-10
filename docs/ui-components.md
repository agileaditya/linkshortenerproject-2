# UI Components: shadcn/ui Standards

All UI elements in this project use **shadcn/ui** components. Never create custom components—always use shadcn.

## Core Rules

### ✅ DO
- Use shadcn/ui components for all UI elements
- Import from `@/components/ui/[component]`
- Extend components via `className` prop with TailwindCSS
- Use responsive prefixes: `md:`, `lg:`, etc.
- Support dark mode with `dark:` utilities
- Check lucide-react for icons

### ❌ DON'T
- Create custom UI components
- Build buttons, inputs, dialogs, etc. from scratch
- Use component libraries other than shadcn
- Style with inline styles—use Tailwind only
- Ignore accessibility features in shadcn components

## Adding Components

When you need a new shadcn component:

```bash
npx shadcn@latest add [component-name]
```

This copies the component into `components/ui/[component-name].tsx` for full control and zero runtime dependencies.

### Common Components

| Use Case | Component | Import |
|----------|-----------|--------|
| Buttons | `Button` | `@/components/ui/button` |
| Text input | `Input` | `@/components/ui/input` |
| Forms | `Form` | `@/components/ui/form` |
| Modals | `Dialog` | `@/components/ui/dialog` |
| Alerts | `Alert` | `@/components/ui/alert` |
| Cards | `Card` | `@/components/ui/card` |
| Dropdowns | `DropdownMenu` | `@/components/ui/dropdown-menu` |
| Tables | `Table` | `@/components/ui/table` |
| Tooltips | `Tooltip` | `@/components/ui/tooltip` |
| Loading | `Skeleton` | `@/components/ui/skeleton` |

## Basic Patterns

### Button

```typescript
import { Button } from '@/components/ui/button';

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button disabled>Disabled</Button>
<Button className="md:w-full">Full on mobile</Button>
```

### Input

```typescript
import { Input } from '@/components/ui/input';

<Input 
  type="url" 
  placeholder="https://example.com" 
  value={url}
  onChange={(e) => setUrl(e.target.value)}
/>
```

### Card

```typescript
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Dialog

```typescript
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogHeader>
    <Button onClick={handleConfirm}>Confirm</Button>
  </DialogContent>
</Dialog>
```

## Styling with TailwindCSS

Extend shadcn components using the `className` prop:

```typescript
// Size variants
<Button className="px-8 py-6 text-lg">Large button</Button>
<Button className="px-2 py-1 text-xs">Small button</Button>

// Responsive styles
<Button className="w-full md:w-auto">Mobile full-width, desktop auto</Button>

// Dark mode
<Button className="dark:bg-slate-900 dark:text-white">Dark support</Button>

// Combine with variants
<Button variant="outline" className="border-2 rounded-lg">
  Custom styled outline
</Button>
```

### TailwindCSS v4 Helpers

- **Colors**: Use standard palette (`bg-blue-600`, `text-red-500`)
- **Spacing**: `gap-4`, `p-6`, `mt-2`, `mb-8`
- **Flexbox**: `flex`, `flex-col`, `gap-2`, `justify-between`, `items-center`
- **Grid**: `grid`, `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3`
- **Responsive**: `md:`, `lg:`, `xl:` prefixes for breakpoints
- **Dark mode**: `dark:bg-slate-900`, `dark:text-white`

## Icons

Use **lucide-react** for icons in shadcn components:

```typescript
import { Copy, Trash2, ExternalLink, Loader2 } from 'lucide-react';

<Button size="icon">
  <Copy className="w-4 h-4" />
</Button>

<Trash2 className="w-5 h-5 text-red-500" />

// Loading state
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Loading...
</Button>
```

## Form Patterns

### Using shadcn Form Component

```typescript
'use client';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function UrlForm() {
  const form = useForm({
    defaultValues: { url: '' },
  });

  const onSubmit = async (data: { url: string }) => {
    const res = await fetch('/api/links/create', {
      method: 'POST',
      body: JSON.stringify({ originalUrl: data.url }),
    });
    if (res.ok) form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input type="url" placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
```

## Accessibility

shadcn components include built-in accessibility:

- **Headings**: Use semantic HTML (`<h1>`, `<h2>`, etc.)
- **Labels**: Connect inputs to labels via `htmlFor`
- **ARIA**: shadcn handles this automatically
- **Focus**: Components support keyboard navigation by default
- **Contrast**: Use dark mode utilities for readability

## Common File Structure

```
components/
├── ui/                    # shadcn components (auto-generated)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
└── LinkCard.tsx          # Custom page-level component using shadcn
```

## Client vs Server Components

- **Client components**: Use shadcn components in `'use client'` components
- **Server components**: Use shadcn components normally (they're headless)
- **Hydration**: shadcn components handle client-side hydration safely

```typescript
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function InteractiveLink({ link }: { link: Link }) {
  const [copying, setCopying] = useState(false);
  
  const handleCopy = async () => {
    setCopying(true);
    await navigator.clipboard.writeText(link.shortUrl);
    setTimeout(() => setCopying(false), 2000);
  };

  return <Button onClick={handleCopy}>{copying ? 'Copied!' : 'Copy'}</Button>;
}
```

## Testing

Mock interactions with shadcn components:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyComponent } from '@/components/MyComponent';

test('button click', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  const button = screen.getByRole('button', { name: /click/i });
  await user.click(button);
  
  expect(screen.getByText('clicked')).toBeInTheDocument();
});
```

---

**Key Takeaway**: Every UI element comes from shadcn. If you can't find what you need, add it via CLI. Never write custom CSS or components.
