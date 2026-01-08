import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'glass' | 'outline';
  className?: string;
}

/**
 * GlassButton Component
 * 
 * Button component with glassmorphic effects and optional link functionality.
 * 
 * @example
 * ```tsx
 * // As a button
 * <GlassButton variant="glass" onClick={handleClick}>
 *   Click Me
 * </GlassButton>
 * 
 * // As a link
 * <GlassButton variant="primary" href="/page">
 *   Go to Page
 * </GlassButton>
 * ```
 */
export default function GlassButton({
  children,
  href,
  variant = 'glass',
  className = '',
  ...props
}: GlassButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 cursor-pointer';
  
  const variantClasses = {
    primary: 'bg-[var(--glass-primary)] text-white hover:bg-[var(--glass-primary-dark)] shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    glass: 'glass-button text-[var(--glass-black-dark)]',
    outline: 'border-2 border-[var(--glass-primary)] text-[var(--glass-primary)] hover:bg-[var(--glass-primary)]/10 hover:border-[var(--glass-primary-dark)] transition-all',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

