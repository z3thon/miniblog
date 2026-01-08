'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLink {
  href: string;
  label: string;
}

interface NavigationProps {
  logo: string;
  logoAlt?: string;
  links: NavLink[];
  cta?: {
    href: string;
    label: string;
  };
  primaryColor?: string;
}

/**
 * Navigation Component
 * 
 * Complete navigation component with glassmorphic styling, mobile menu,
 * and smooth animations.
 * 
 * @example
 * ```tsx
 * <Navigation
 *   logo="/logo.svg"
 *   logoAlt="Company Logo"
 *   links={[
 *     { href: '/', label: 'Home' },
 *     { href: '/about', label: 'About' },
 *     { href: '/contact', label: 'Contact' }
 *   ]}
 *   cta={{ href: '/signup', label: 'Sign Up' }}
 *   primaryColor="#26A9E0"
 * />
 * ```
 */
export default function Navigation({
  logo,
  logoAlt = 'Logo',
  links,
  cta,
  primaryColor = 'rgba(38, 169, 224, 0.9)',
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div 
      className="fixed left-1/2 -translate-x-1/2 z-50 max-w-6xl w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)]" 
      style={{ top: scrolled ? '0.5rem' : '0.75rem' }}
    >
      <motion.nav
        initial={{ y: -100 }}
        animate={{ 
          y: isHovered ? 2 : 0,
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="glass-nav-blue w-full"
        style={{
          borderRadius: '2rem',
          transformOrigin: 'center',
          transition: 'box-shadow 0.2s ease-out',
          boxShadow: isHovered 
            ? `0 12px 40px 0 ${primaryColor}66, 0 0 0 1px rgba(255, 255, 255, 0.2) inset`
            : `0 8px 32px 0 ${primaryColor}4d, 0 0 0 1px rgba(255, 255, 255, 0.15) inset`
        }}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex items-center justify-between min-h-12 sm:min-h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center group min-h-[44px] min-w-[44px] flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-10 sm:h-12 md:h-14 w-auto"
              >
                <Image
                  src={logo}
                  alt={logoAlt}
                  width={200}
                  height={56}
                  className="h-full w-auto object-contain max-w-[140px] sm:max-w-[180px] md:max-w-none"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-3">
              {links.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-5 py-2 rounded-full text-base font-bold transition-all duration-200 text-white/90 hover:text-white relative group cursor-pointer"
                  >
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
              
              {/* CTA Button */}
              {cta && (
                <Link href={cta.href} className="ml-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button className="px-5 py-2.5 rounded-full text-base font-semibold bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:border-white/40 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer">
                      {cta.label}
                      <motion.svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </button>
                  </motion.div>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 active:bg-white/40 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <motion.svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden py-3 sm:py-4 space-y-2 overflow-hidden"
              >
                {links.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3.5 sm:py-3 rounded-full text-base font-bold transition-all relative min-h-[44px] flex items-center cursor-pointer ${
                          active 
                            ? 'text-white' 
                            : 'text-white/90 active:text-white'
                        }`}
                      >
                        {item.label}
                        {active && (
                          <div className="absolute bottom-2 left-4 right-4 h-0.5 bg-white rounded-full" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {cta && (
                  <div className="pt-3 sm:pt-4 border-t border-white/20">
                    <Link href={cta.href} onClick={() => setIsOpen(false)} className="block">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-3.5 sm:py-3 rounded-full text-base font-semibold bg-white/20 backdrop-blur-md border border-white/30 text-white active:bg-white/30 transition-all shadow-lg flex items-center justify-center gap-2 group min-h-[44px] cursor-pointer"
                      >
                        {cta.label}
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </motion.button>
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}

