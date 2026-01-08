# Glassmorphic Design - Usage Examples

Complete examples showing how to use all components and styles.

## Basic Setup

### 1. Import Styles

```tsx
// app/globals.css or your main CSS file
@import './styles/glassmorphic.css';
```

### 2. Setup Layout

```tsx
// app/layout.tsx
import Navigation from '@/components/Navigation';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navigation
          logo="/logo.svg"
          links={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' }
          ]}
          cta={{ href: '/signup', label: 'Get Started' }}
        />
        <main className="pt-24">
          {children}
        </main>
      </body>
    </html>
  );
}
```

## Component Examples

### GlassCard

```tsx
import GlassCard from '@/components/GlassCard';

export default function Page() {
  return (
    <div className="container mx-auto p-8">
      {/* Light variant (default) */}
      <GlassCard className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Card Title</h2>
        <p>This is a light glass card with default styling.</p>
      </GlassCard>
      
      {/* Dark variant */}
      <GlassCard variant="dark" className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Dark Card</h2>
        <p className="text-white/90">This is a dark glass card.</p>
      </GlassCard>
      
      {/* Custom padding */}
      <GlassCard className="p-12">
        <h2 className="text-3xl font-bold mb-6">Large Padding</h2>
        <p>Card with custom padding.</p>
      </GlassCard>
    </div>
  );
}
```

### GlassButton

```tsx
import GlassButton from '@/components/GlassButton';

export default function Page() {
  return (
    <div className="container mx-auto p-8 space-y-4">
      {/* Glass variant (default) */}
      <GlassButton variant="glass">
        Glass Button
      </GlassButton>
      
      {/* Primary variant */}
      <GlassButton variant="primary">
        Primary Button
      </GlassButton>
      
      {/* Outline variant */}
      <GlassButton variant="outline">
        Outline Button
      </GlassButton>
      
      {/* As a link */}
      <GlassButton variant="primary" href="/page">
        Link Button
      </GlassButton>
      
      {/* With onClick */}
      <GlassButton variant="glass" onClick={() => alert('Clicked!')}>
        Click Me
      </GlassButton>
    </div>
  );
}
```

### Glass Input Fields

```tsx
export default function ContactForm() {
  return (
    <form className="space-y-4 max-w-md">
      <div>
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          className="glass-input-enhanced w-full px-4 py-3 rounded-full"
          placeholder="Enter your name"
        />
      </div>
      
      <div>
        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          className="glass-input-enhanced w-full px-4 py-3 rounded-full"
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <label className="block mb-2 font-semibold">Message</label>
        <textarea
          className="glass-input-enhanced w-full px-4 py-3 rounded-2xl resize-none"
          rows={5}
          placeholder="Enter your message"
        />
      </div>
      
      <GlassButton variant="primary" type="submit">
        Submit
      </GlassButton>
    </form>
  );
}
```

### Complete Page Example

```tsx
import GlassCard from '@/components/GlassCard';
import GlassButton from '@/components/GlassButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-black text-white mb-6">
            Welcome to Glassmorphic Design
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Beautiful, modern, and accessible design system
          </p>
          <GlassButton variant="primary" href="/signup">
            Get Started
          </GlassButton>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <GlassCard>
            <h3 className="text-xl font-bold mb-3">Feature 1</h3>
            <p>Description of feature 1</p>
          </GlassCard>
          
          <GlassCard>
            <h3 className="text-xl font-bold mb-3">Feature 2</h3>
            <p>Description of feature 2</p>
          </GlassCard>
          
          <GlassCard>
            <h3 className="text-xl font-bold mb-3">Feature 3</h3>
            <p>Description of feature 3</p>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
```

## Customization Examples

### Custom Colors

```css
/* Override CSS variables */
:root {
  --glass-primary: #your-color;
  --glass-primary-dark: #your-dark-color;
  --glass-primary-light: #your-light-color;
}
```

### Custom Blur Intensity

```css
.glass-card {
  backdrop-filter: blur(30px); /* Increase blur */
  background: rgba(255, 255, 255, 0.3); /* Increase opacity */
}
```

### Custom Animations

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="glass-card"
>
  Content
</motion.div>
```

## Best Practices

1. **Use consistent spacing**: Stick to the spacing scale (4px increments)
2. **Maintain contrast**: Ensure text is readable on glass backgrounds
3. **Test on mobile**: All components are mobile-optimized
4. **Use semantic HTML**: Maintain accessibility
5. **Customize colors**: Update CSS variables to match your brand
6. **Layer effects**: Combine multiple glass elements for depth

## Accessibility

- All interactive elements have minimum 44x44px touch targets
- Proper ARIA labels on navigation
- Keyboard navigation support
- Focus states on all inputs and buttons
- Screen reader friendly

