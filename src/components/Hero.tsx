'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const PARTICLES = [
  { size: 3, x: '15%', y: '25%', delay: 0 },
  { size: 2, x: '75%', y: '15%', delay: 1.2 },
  { size: 4, x: '60%', y: '70%', delay: 0.6 },
  { size: 2, x: '30%', y: '80%', delay: 1.8 },
  { size: 3, x: '85%', y: '55%', delay: 0.9 },
  { size: 2, x: '45%', y: '35%', delay: 2.1 },
  { size: 3, x: '20%', y: '60%', delay: 1.5 },
  { size: 2, x: '90%', y: '80%', delay: 0.3 },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-labelledby="hero-heading"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--charcoal)',
      }}
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ y, scale, position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        {/* Gradient background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 60% at 60% 40%, rgba(184,151,90,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 60% 70% at 20% 70%, rgba(212,184,150,0.07) 0%, transparent 50%),
              linear-gradient(160deg, #1C1A18 0%, #2A2520 40%, #1E1C19 100%)
            `,
          }}
        />

        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(212,184,150,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212,184,150,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            opacity: 0.6,
          }}
        />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: 'rgba(212,184,150,0.5)',
            }}
            animate={{
              y: [0, -12, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5 + i * 0.7,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Decorative rings */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '72%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: '1px solid rgba(212,184,150,0.08)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '72%',
            transform: 'translate(-50%, -50%)',
            width: 280,
            height: 280,
            borderRadius: '50%',
            border: '1px solid rgba(212,184,150,0.12)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glowing accent */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '68%',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,151,90,0.2) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, position: 'relative', zIndex: 2 }}
        className="container"
      >
        <div style={{ maxWidth: '780px' }}>
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--champagne)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 32,
                height: 1,
                background: 'var(--champagne)',
              }}
              aria-hidden="true"
            />
            Mindset · Manifestation · Peak Performance
          </motion.p>

          {/* Main heading */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.08,
              color: 'var(--ivory)',
              marginBottom: '0.5rem',
            }}
          >
            Not just a mindset.
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 500,
              lineHeight: 1.08,
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, var(--champagne), var(--gold), var(--champagne))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '2rem',
            }}
            aria-hidden="true" // Part of same h1 visually — screen reader gets the full one above
          >
            A complete rewire.
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(1rem, 2vw, 1.1875rem)',
              fontWeight: 300,
              lineHeight: 1.75,
              color: 'rgba(250,248,244,0.65)',
              maxWidth: '520px',
              marginBottom: '2.5rem',
            }}
          >
            Agrika Khatri helps high-performing individuals break unconscious behavioral loops, 
            shift identity at the root level, and build the internal architecture that turns 
            ambition into reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <button
              onClick={() => document.querySelector('#program')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-gold"
              id="hero-cta-program"
            >
              Explore the Program
            </button>
            <button
              onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: 'rgba(250,248,244,0.6)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'color 0.2s ease',
                padding: '0.875rem 0',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,248,244,0.9)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(250,248,244,0.6)')}
              id="hero-cta-story"
            >
              Agrika's Story →
            </button>
          </motion.div>

          {/* Brand promise */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            style={{
              marginTop: '4rem',
              display: 'flex',
              gap: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: '80%', detail: 'Behavioral & scientific' },
              { label: '20 Days', detail: 'Initial results protocol' },
              { label: '6 Months', detail: 'Live training access' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.75rem',
                    fontWeight: 500,
                    color: 'var(--champagne)',
                    lineHeight: 1,
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    color: 'rgba(250,248,244,0.45)',
                    marginTop: '4px',
                  }}
                >
                  {stat.detail}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(212,184,150,0.5)',
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6875rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  );
}
