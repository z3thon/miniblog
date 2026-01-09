import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * GlassCard Component
 * 
 * A versatile card component with glassmorphic styling (light mode only).
 * 
 * @example
 * ```tsx
 * <GlassCard className="p-8">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here</p>
 * </GlassCard>
 * ```
 */
export default function GlassCard({
  children,
  className = '',
}: GlassCardProps) {
  const combinedClassName = `glass-card rounded-3xl p-8 ${className}`.trim();
  
  return (
    <div className={combinedClassName}>
      {children}
    </div>
  );
}

