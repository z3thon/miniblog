# Glassmorphic Design Starter Pack

A complete starter pack for implementing Apple-inspired glassmorphic design in your Next.js projects. This pack includes reusable components, styles, animations, and design tokens.

## 📦 What's Included

- **Design Tokens** - Color palette, spacing, typography
- **Reusable Components** - GlassCard, GlassButton, GlassInput, Navigation
- **CSS Utilities** - Pre-built glassmorphic classes
- **Motion Effects** - Framer Motion animations and transitions
- **Documentation** - Complete usage guide and examples

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install framer-motion next react react-dom
# or
yarn add framer-motion next react react-dom
```

### 2. Copy Files

Copy the following folders/files to your project:

```
glassmorphic-starter-pack/
├── components/          → Copy to your components folder
├── styles/              → Copy to your styles folder
├── config/              → Copy to your config folder
└── docs/                → Reference documentation
```

### 3. Import Styles

Add to your `globals.css` or main CSS file:

```css
@import './styles/glassmorphic.css';
```

### 4. Use Components

```tsx
import GlassCard from '@/components/GlassCard';
import GlassButton from '@/components/GlassButton';
import Navigation from '@/components/Navigation';

export default function Page() {
  return (
    <div>
      <Navigation />
      <GlassCard>
        <h1>Hello Glassmorphic!</h1>
        <GlassButton>Click Me</GlassButton>
      </GlassCard>
    </div>
  );
}
```

## 🎨 Design System

### Color Palette

The starter pack uses a flexible color system that you can customize:

- **Primary Colors**: Customize in `config/colors.ts`
- **Glass Effects**: Adjustable opacity and blur values
- **Neutral Colors**: Grays and blacks for text

### Typography

- **Font**: Lato (or your preferred font)
- **Weights**: 300, 400, 700, 900
- **Scale**: Responsive type scale included

### Spacing

- **Base Unit**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64px

## 📚 Components

### GlassCard

A versatile card component with glassmorphic styling.

```tsx
<GlassCard variant="light" className="p-8">
  Content here
</GlassCard>
```

**Props:**
- `variant`: `'light' | 'dark'` - Card style variant
- `className`: Additional CSS classes

### GlassButton

Button component with glassmorphic effects.

```tsx
<GlassButton variant="glass" href="/page">
  Button Text
</GlassButton>
```

**Props:**
- `variant`: `'primary' | 'glass' | 'outline'`
- `href`: Optional link URL
- `className`: Additional CSS classes

### GlassInput

Input field with glassmorphic styling.

```tsx
<input 
  type="text" 
  className="glass-input-enhanced"
  placeholder="Enter text..."
/>
```

### Navigation

Complete navigation component with mobile menu.

```tsx
<Navigation 
  logo="/logo.svg"
  links={[
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' }
  ]}
  cta={{ href: '/signup', label: 'Sign Up' }}
/>
```

## 🎭 Motion Effects

All components use Framer Motion for smooth animations:

- **Hover Effects**: Scale and translate transforms
- **Transitions**: Smooth cubic-bezier easing
- **Mobile Menu**: Animated expand/collapse
- **Active States**: Spring animations for nav items

## 🎨 Customization

### Adjusting Glass Effect Intensity

Edit `styles/glassmorphic.css`:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.2); /* Adjust opacity */
  backdrop-filter: blur(20px); /* Adjust blur */
}
```

### Changing Colors

Edit `config/colors.ts`:

```typescript
export const colors = {
  primary: '#26A9E0',
  // ... customize your palette
};
```

### Modifying Animations

Components use Framer Motion - adjust in component files:

```tsx
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
```

## 📱 Responsive Design

All components are mobile-first and include:

- Touch-friendly targets (44x44px minimum)
- Responsive typography
- Mobile menu with animations
- Optimized for all screen sizes

## 🛠️ Browser Support

- Chrome/Edge: Full support
- Safari: Full support (with `-webkit-` prefixes)
- Firefox: Full support
- Mobile browsers: Optimized

## 📖 Examples

See `docs/examples.md` for complete usage examples.

## 🤝 Contributing

Feel free to customize and extend this starter pack for your needs!

## 📄 License

Free to use in your projects.

