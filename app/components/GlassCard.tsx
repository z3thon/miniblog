import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * GlassCard Component
 * 
 * A versatile card component with glassmorphic styling.
 * 
 * @example
 * ```tsx
 * <GlassCard variant="light" className="p-8">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </GlassCard>
 * ```
 */
export default function GlassCard({
  children,
  className = '',
  variant = 'light',
}: GlassCardProps) {
  const baseClasses = variant === 'light' ? 'glass-card' : 'glass-card-dark';
  const combinedClassName = `${baseClasses} rounded-3xl p-8 ${className}`.trim();
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
}

