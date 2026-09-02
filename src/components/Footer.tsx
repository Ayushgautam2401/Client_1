'use client';

import { motion } from 'framer-motion';

const FOOTER_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Q & A', href: '#qa' },
  { label: 'Program', href: '#program' },
  { label: 'Connect', href: '#connect' },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--charcoal)',
        borderTop: '1px solid rgba(212,184,150,0.1)',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
      }}
      role="contentinfo"
    >
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr',
            gap: '3rem',
            paddingBottom: '3rem',
            borderBottom: '1px solid rgba(212,184,150,0.08)',
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.375rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--ivory)',
                  marginBottom: '2px',
                }}
              >
                AGRIKA KHATRI
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.625rem',
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--champagne)',
                  opacity: 0.7,
                }}
              >
                Mindset · Manifestation · Peak Performance
              </p>
            </div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                color: 'rgba(250,248,244,0.4)',
                lineHeight: 1.75,
                maxWidth: '280px',
              }}
            >
              Building India's most authoritative brand ecosystem for 
              mindset training and peak performance coaching.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--champagne)',
                marginBottom: '1.25rem',
                opacity: 0.7,
              }}
            >
              Navigate
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      color: 'rgba(250,248,244,0.45)',
                      padding: 0,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,248,244,0.85)')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,248,244,0.45)')}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Philosophy */}
          <div>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--champagne)',
                marginBottom: '1.25rem',
                opacity: 0.7,
              }}
            >
              Principles
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                'Identity over tactics',
                '80% behavioral, 20% spiritual',
                'Real results, not affirmations',
                'Discipline over motivation',
                'Internal shifts first',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8125rem',
                    color: 'rgba(250,248,244,0.3)',
                    lineHeight: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: 'var(--champagne)',
                      opacity: 0.4,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              color: 'rgba(250,248,244,0.2)',
            }}
          >
            &copy; {currentYear} Agrika Khatri. All rights reserved.
          </p>

          <div
            style={{ display: 'flex', gap: '1.5rem' }}
          >
            {['Privacy Policy', 'Terms of Use'].map((item) => (
              <button
                key={item}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  color: 'rgba(250,248,244,0.2)',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,248,244,0.5)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,248,244,0.2)')}
                aria-label={`${item} (placeholder)`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Scroll to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            style={{
              background: 'rgba(212,184,150,0.1)',
              border: '1px solid rgba(212,184,150,0.15)',
              borderRadius: '4px',
              cursor: 'pointer',
              padding: '0.5rem 0.875rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(250,248,244,0.35)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = 'rgba(212,184,150,0.18)';
              el.style.color = 'rgba(250,248,244,0.65)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = 'rgba(212,184,150,0.1)';
              el.style.color = 'rgba(250,248,244,0.35)';
            }}
          >
            <span aria-hidden="true">↑</span> Top
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
}
