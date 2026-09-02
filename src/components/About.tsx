'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

/* ─── Journey data ─────────────────────────────────────────────── */
const MILESTONES = [
  {
    num: '01',
    year: '2010',
    title: 'The Crucible Begins',
    body: 'First CA attempt. A young Agrika steps into the arena — not yet knowing that failure would become the most profound teacher of his life.',
    side: 'right' as const,
  },
  {
    num: '02',
    year: '2015',
    title: 'Seven Falls, One Rise',
    body: 'After failing seven times, Agrika passed — not by luck, but through a forged mental architecture that most people never discover.',
    side: 'left' as const,
  },
  {
    num: '03',
    year: '2018',
    title: 'Ventures & Validation',
    body: 'Launched successful business ventures. The methodology was no longer theory — it was battle-tested in the real, unforgiving world.',
    side: 'right' as const,
  },
  {
    num: '04',
    year: '2021',
    title: 'The System Emerges',
    body: 'Formalized the Peak Performance framework. Unconscious loops mapped, confronted, and rewritten. A science of transformation born from lived experience.',
    side: 'left' as const,
  },
  {
    num: '05',
    year: '2024',
    title: 'Building the Movement',
    body: 'Physical centers. Associate trainers. A global brand ecosystem built exclusively for serious people who demand real, lasting results.',
    side: 'right' as const,
  },
];

/* ─── Ambient particles config ─────────────────────────────────── */
const PARTICLES = [
  { top: '12%', left: '8%', size: 6, delay: '0s', duration: '7s' },
  { top: '35%', right: '6%', size: 4, delay: '2s', duration: '9s' },
  { top: '58%', left: '14%', size: 5, delay: '1s', duration: '8s' },
  { top: '80%', right: '10%', size: 3, delay: '3s', duration: '6s' },
];

/* ─── Single milestone card ─────────────────────────────────────── */
function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isRight = milestone.side === 'right';

  const initial = {
    opacity: 0,
    x: isRight ? 60 : -60,
    rotateY: isRight ? 18 : -18,
    translateZ: -180,
  };
  const animate = isInView
    ? { opacity: 1, x: 0, rotateY: 0, translateZ: 0 }
    : initial;

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        alignItems: 'center',
        gap: '0 1.5rem',
        marginBottom: '4rem',
        position: 'relative',
      }}
      className="milestone-row"
    >
      {/* Left slot */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {!isRight && (
          <motion.div
            className="journey-card"
            initial={initial}
            animate={animate}
            transition={{
              duration: 0.85,
              delay: 0.08 * index,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ maxWidth: 380, transformStyle: 'preserve-3d' }}
          >
            <CardContent milestone={milestone} />
          </motion.div>
        )}
      </div>

      {/* Center track dot */}
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <motion.div
          className="journey-dot"
          style={{ position: 'relative', transform: 'none', left: 'auto', top: 'auto' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.08 * index + 0.3, type: 'spring', stiffness: 260, damping: 20 }}
        />
      </div>

      {/* Right slot */}
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {isRight && (
          <motion.div
            className="journey-card"
            initial={initial}
            animate={animate}
            transition={{
              duration: 0.85,
              delay: 0.08 * index,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ maxWidth: 380, transformStyle: 'preserve-3d' }}
          >
            <CardContent milestone={milestone} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function CardContent({ milestone }: { milestone: (typeof MILESTONES)[number] }) {
  return (
    <>
      {/* Large numeral watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-0.5rem',
          right: '1.25rem',
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: '5.5rem',
          fontWeight: 700,
          lineHeight: 1,
          color: 'rgba(184,151,90,0.08)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {milestone.num}
      </div>

      {/* Year badge */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6875rem',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '0.5rem',
        }}
      >
        {milestone.year}
      </p>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
          fontWeight: 400,
          color: 'var(--ivory)',
          lineHeight: 1.2,
          marginBottom: '0.875rem',
        }}
      >
        {milestone.title}
      </h3>

      {/* Divider */}
      <div
        style={{
          width: 40,
          height: 1,
          background: 'linear-gradient(90deg, var(--gold), transparent)',
          marginBottom: '0.875rem',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />

      {/* Body */}
      <p
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          lineHeight: 1.75,
          color: 'rgba(250,248,244,0.65)',
        }}
      >
        {milestone.body}
      </p>
    </>
  );
}

/* ─── Journey Timeline section ──────────────────────────────────── */
function JourneyTimeline() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress to track fill height %
  const trackScaleY = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  return (
    <div
      style={{
        marginTop: '7rem',
        paddingTop: '5rem',
        borderTop: '1px solid var(--border-light)',
        position: 'relative',
      }}
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        A Journey Through Fire
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 400,
          lineHeight: 1.15,
          color: 'var(--charcoal)',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        Every scar became a{' '}
        <span style={{ fontStyle: 'italic' }}>system.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1.0625rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: 520,
          margin: '0 auto 5rem',
          lineHeight: 1.8,
        }}
      >
        The methodology wasn't built in a classroom. It was built in the crucible.
      </motion.p>

      {/* 3D perspective scene */}
      <div
        ref={wrapperRef}
        className="journey-scene"
        style={{ position: 'relative', paddingBottom: '2rem' }}
      >
        {/* Ambient particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="journey-particle"
            aria-hidden="true"
            style={{
              top: p.top,
              left: 'left' in p ? p.left : undefined,
              right: 'right' in p ? (p as { right: string }).right : undefined,
              width: p.size,
              height: p.size,
              animation: `orbit ${p.duration} ease-in-out ${p.delay} infinite`,
              opacity: 0.7,
            }}
          />
        ))}

        {/* Background track (ghost) */}
        <div className="journey-track" aria-hidden="true" />

        {/* Scroll-driven fill track */}
        <motion.div
          className="journey-track-fill"
          style={{ scaleY: trackScaleY, transformOrigin: 'top center' }}
          aria-hidden="true"
        />

        {/* Milestone cards */}
        {MILESTONES.map((m, i) => (
          <MilestoneCard key={m.num} milestone={m} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main About component ──────────────────────────────────────── */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="section"
      style={{
        background: 'var(--ivory)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
      }}
    >
      <div className="container">
        {/* ── Top: Portrait + Copy ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left — Image & Quote card */}
          <motion.div
            variants={itemVariants}
            style={{ position: 'relative' }}
          >
            {/* Portrait placeholder — elegant styled card */}
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                background: 'linear-gradient(160deg, var(--beige) 0%, var(--champagne) 40%, var(--charcoal-soft) 100%)',
              }}
            >
              {/* Texture overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(28,26,24,0.55) 100%)',
                  zIndex: 1,
                }}
                aria-hidden="true"
              />

              {/* Decorative initials */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-60%)',
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(5rem, 12vw, 9rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: 'rgba(250,248,244,0.12)',
                  pointerEvents: 'none',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
                aria-hidden="true"
              >
                AK
              </div>

              {/* Bottom info */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '2rem',
                  zIndex: 2,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.0625rem',
                    fontStyle: 'italic',
                    color: 'rgba(250,248,244,0.85)',
                    lineHeight: 1.5,
                  }}
                >
                  &ldquo;Failing seven times was not failure&rdquo;
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--champagne)',
                    marginTop: '0.75rem',
                  }}
                >
                  — Agrika Khatri
                </p>
              </div>
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-1.5rem',
                background: 'var(--charcoal)',
                color: 'var(--ivory)',
                padding: '1.25rem 1.5rem',
                borderRadius: '4px',
                maxWidth: '200px',
                boxShadow: '0 20px 60px rgba(28,26,24,0.25)',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--champagne)',
                  marginBottom: '0.5rem',
                }}
              >
                Core Focus
              </p>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  lineHeight: 1.3,
                }}
              >
                Peak Performance &amp; Identity Architecture
              </p>
            </motion.div>

            {/* Top-left decorative line */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-1rem',
                left: '-1rem',
                width: '60px',
                height: '60px',
                borderTop: '2px solid var(--champagne)',
                borderLeft: '2px solid var(--champagne)',
                opacity: 0.5,
              }}
            />
          </motion.div>

          {/* Right — Story content */}
          <div>
            <motion.p
              variants={itemVariants}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1rem',
              }}
            >
              The Story Behind the Work
            </motion.p>

            <motion.h2
              id="about-heading"
              variants={itemVariants}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: 'var(--charcoal)',
                marginBottom: '1.75rem',
              }}
            >
              Real transformation, not
              <span style={{ fontStyle: 'italic' }}> another course.</span>
            </motion.h2>

            <div className="prose-brand">
              <motion.p variants={itemVariants}>
                Agrika Khatri built this methodology not in a classroom, but through life —
                including the experience of failing CA exams seven times before going on to
                build successful ventures. That lived crucible became the foundation of
                something far more powerful than theory.
              </motion.p>

              <motion.p variants={itemVariants} style={{ marginTop: '1.25rem' }}>
                The work here is not about spiritual bypassing or positive thinking.
                It is about understanding that most human behavior is driven by
                unconscious loops formed by past conditioning — and that those loops
                can be systematically identified, confronted, and changed.
              </motion.p>

              <motion.p variants={itemVariants} style={{ marginTop: '1.25rem' }}>
                The vision is not to be just another coach. The vision is to be
                recognized as the <em>absolute best</em> in mindset and peak performance
                in India — and eventually, globally. With physical centers, trained
                associate trainers, and a brand ecosystem built for serious people
                who demand real results.
              </motion.p>
            </div>

            {/* Philosophy pillars */}
            <motion.div
              variants={itemVariants}
              style={{
                marginTop: '2.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              {[
                { label: 'Editorial & Professional', sub: 'Brand direction' },
                { label: 'Authoritative', sub: 'Communication style' },
                { label: 'Scientific', sub: 'Methodology base' },
                { label: 'Luxury', sub: 'Market positioning' },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--border-light)',
                    borderRadius: '6px',
                    background: 'var(--cream)',
                    transition: 'border-color 0.25s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--champagne)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-light)')
                  }
                >
                  <p
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.0625rem',
                      fontWeight: 500,
                      color: 'var(--charcoal)',
                      marginBottom: '2px',
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: 'var(--warm-gray)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} style={{ marginTop: '2.5rem' }}>
              <button
                onClick={() =>
                  document.querySelector('#program')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn btn-primary"
                id="about-cta"
              >
                Explore the Program
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Journey Timeline ── */}
        <JourneyTimeline />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .milestone-row {
            grid-template-columns: 1fr 24px !important;
            grid-template-rows: auto auto !important;
          }
          .milestone-row > div:first-child {
            display: none !important;
          }
          .milestone-row > div:last-child {
            grid-column: 1 !important;
            justify-content: flex-start !important;
          }
          .milestone-row > div:nth-child(2) {
            grid-column: 2 !important;
            grid-row: 1 / 3 !important;
            align-self: flex-start !important;
            padding-top: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
