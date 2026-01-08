# Quick Start Guide

Get up and running with glassmorphic design in 5 minutes!

## Step 1: Copy Files

Copy these folders to your Next.js project:

```
glassmorphic-starter-pack/
├── components/     → Copy to your app/components/ or components/
├── styles/         → Copy to your app/ or public/styles/
└── config/         → Copy to your app/config/ or config/
```

## Step 2: Install Dependencies

```bash
npm install framer-motion
# or
yarn add framer-motion
```

## Step 3: Import Styles

Add to your `app/globals.css` or main CSS file:

```css
@import './styles/glassmorphic.css';
```

## Step 4: Use Components

```tsx
// app/page.tsx
import GlassCard from '@/components/GlassCard';
import GlassButton from '@/components/GlassButton';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div>
      <Navigation
        logo="/logo.svg"
        links={[
          { href: '/', label: 'Home' },
          { href: '/about', label: 'About' }
        ]}
        cta={{ href: '/signup', label: 'Sign Up' }}
      />
      
      <main className="pt-24">
        <GlassCard>
          <h1>Hello Glassmorphic!</h1>
          <GlassButton variant="primary">Click Me</GlassButton>
        </GlassCard>
      </main>
    </div>
  );
}
```

## Step 5: Customize Colors

Edit `styles/glassmorphic.css`:

```css
:root {
  --glass-primary: #your-color;
  --glass-primary-dark: #your-dark-color;
}
```

That's it! You're ready to build beautiful glassmorphic interfaces.

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [examples.md](./docs/examples.md) for more usage examples
- Customize colors in `config/colors.ts`

