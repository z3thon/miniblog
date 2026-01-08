import Link from 'next/link';
import GlassCard from './components/GlassCard';
import GlassButton from './components/GlassButton';

export default function NotFound() {
  return (
    <main className="min-h-screen pt-16 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <GlassCard className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-[var(--glass-black-dark)]">
          404
        </h1>
        <p className="text-xl text-[var(--glass-gray-dark)] mb-8">
          Page not found
        </p>
        <GlassButton href="/" variant="primary">
          Go Home
        </GlassButton>
      </GlassCard>
    </main>
  );
}

