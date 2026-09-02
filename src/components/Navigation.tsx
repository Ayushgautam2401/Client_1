'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#qa', label: 'Q & A' },
  { href: '#program', label: 'Program' },
  { href: '#connect', label: 'Connect' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 40);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.classList.remove('mobile-nav-open');
    }
    return () => document.body.classList.remove('mobile-nav-open');
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Small timeout to allow menu close animation
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass shadow-sm'
            : 'bg-transparent'
        }`}
        style={{
          background: isScrolled
            ? 'rgba(250, 248, 244, 0.9)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        <nav
          className="container flex items-center justify-between h-20"
          aria-label="Primary navigation"
        >
          {/* Brand Logo */}
          <a
            href="#"
            className="flex flex-col leading-none focus-visible:outline-gold"
            aria-label="Agrika Khatri - Home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.375rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: isScrolled || mobileOpen ? 'var(--charcoal)' : 'var(--ivory)',
                transition: 'color 0.4s ease',
              }}
            >
              AGRIKA KHATRI
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.625rem',
                fontWeight: 400,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: isScrolled || mobileOpen ? 'var(--gold)' : 'rgba(212,184,150,0.85)',
                transition: 'color 0.4s ease',
                marginTop: '2px',
              }}
            >
              Mindset &amp; Peak Performance
            </span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 list-none" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="nav-link"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isScrolled ? 'var(--text-secondary)' : 'rgba(250,248,244,0.8)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.25s ease',
                    padding: '0.25rem 0',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = isScrolled ? 'var(--charcoal)' : 'var(--ivory)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = isScrolled ? 'var(--text-secondary)' : 'rgba(250,248,244,0.8)';
                  }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick('#connect')}
              className="btn btn-primary"
              style={{
                padding: '0.625rem 1.5rem',
                fontSize: '0.8125rem',
                background: isScrolled ? 'var(--charcoal)' : 'rgba(250,248,244,0.15)',
                color: 'var(--ivory)',
                border: isScrolled ? 'none' : '1px solid rgba(250,248,244,0.4)',
                backdropFilter: isScrolled ? 'none' : 'blur(8px)',
              }}
            >
              Start Your Journey
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            style={{
              color: isScrolled || mobileOpen ? 'var(--charcoal)' : 'var(--ivory)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation menu"
            aria-modal="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '5rem',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--ivory)',
              zIndex: 40,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <ul className="list-none flex flex-col gap-1" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '2rem',
                      fontWeight: 400,
                      color: 'var(--charcoal)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.5rem 0',
                      textAlign: 'left',
                      width: '100%',
                      borderBottom: '1px solid var(--border-light)',
                    }}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.35 }}
              className="mt-8"
            >
              <button
                onClick={() => handleNavClick('#connect')}
                className="btn btn-primary w-full justify-center"
                style={{ width: '100%', fontSize: '0.875rem' }}
              >
                Start Your Journey
              </button>
            </motion.div>

            <div
              style={{
                marginTop: 'auto',
                paddingBottom: '2rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--warm-gray)',
              }}
            >
              Mindset · Manifestation · Peak Performance
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
