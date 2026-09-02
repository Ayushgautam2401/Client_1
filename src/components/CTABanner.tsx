'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CTABannerProps {
  heading: string;
  subheading?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  dark?: boolean;
}

export default function CTABanner({
  heading,
  subheading,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  dark = false,
}: CTABannerProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      aria-label={heading}
      style={{
        background: dark ? 'var(--charcoal-mid)' : 'var(--beige)',
        padding: '5rem 2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      {dark && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 500,
            height: 300,
            background: 'radial-gradient(ellipse, rgba(184,151,90,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(1.875rem, 4vw, 2.75rem)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: dark ? 'var(--ivory)' : 'var(--charcoal)',
            marginBottom: subheading ? '0.875rem' : '2rem',
          }}
        >
          {heading}
        </motion.p>

        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: dark ? 'rgba(250,248,244,0.5)' : 'var(--text-secondary)',
              marginBottom: '2rem',
              maxWidth: '480px',
              margin: '0 auto 2rem',
              lineHeight: 1.7,
            }}
          >
            {subheading}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => scrollTo(primaryHref)}
            className="btn btn-primary"
            style={dark ? {} : { background: 'var(--charcoal)' }}
          >
            {primaryLabel}
          </button>

          {secondaryLabel && secondaryHref && (
            <button
              onClick={() => scrollTo(secondaryHref)}
              className="btn btn-outline"
              style={dark ? { borderColor: 'rgba(212,184,150,0.3)', color: 'var(--champagne)' } : {}}
            >
              {secondaryLabel}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
