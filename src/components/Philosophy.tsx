'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Zap, Target, Shield, TrendingUp, Users } from 'lucide-react';

const PILLARS = [
  {
    icon: Brain,
    number: '01',
    title: 'Behavioral Loop Identification',
    description:
      'Most human behavior is controlled by unconscious loops formed from past conditioning, trauma, and beliefs. The first step is making the invisible visible — bringing these patterns into conscious awareness.',
    color: 'rgba(184,151,90,0.12)',
    accent: 'var(--gold)',
  },
  {
    icon: Shield,
    number: '02',
    title: 'Identity Architecture',
    description:
      'External change follows internal identity. Rather than forcing the world to change, you change who you believe yourself to be at the core. This is 80% of the real work.',
    color: 'rgba(212,184,150,0.1)',
    accent: 'var(--champagne)',
  },
  {
    icon: Target,
    number: '03',
    title: 'Behavioral Protocols',
    description:
      'Precise, tested protocols replace old behavioral patterns with new ones. Not affirmations — structured, disciplined execution. Initial results within 20 days.',
    color: 'rgba(180,170,155,0.1)',
    accent: 'var(--warm-gray)',
  },
  {
    icon: Zap,
    number: '04',
    title: 'Value System Rewiring',
    description:
      'What you value determines what you pursue. The work includes examining the value hierarchy driving your current decisions — and redesigning it for peak outcomes.',
    color: 'rgba(184,151,90,0.12)',
    accent: 'var(--gold)',
  },
  {
    icon: TrendingUp,
    number: '05',
    title: 'Peak Performance Integration',
    description:
      'Manifestation is the doorway — peak performance is the destination. The tools here translate internal shifts into measurable external results across business and life.',
    color: 'rgba(212,184,150,0.1)',
    accent: 'var(--champagne)',
  },
  {
    icon: Users,
    number: '06',
    title: 'Live Mentorship & Q&A',
    description:
      "Twice-weekly live sessions with Agrika deliver advanced tools and real-time answers to your specific situations. The human depth in these sessions is what cannot be replicated.",
    color: 'rgba(180,170,155,0.1)',
    accent: 'var(--warm-gray)',
  },
];

const BRAND_ATTRS = [
  { left: '80%', right: 'Practical & Scientific', width: '80%' },
  { left: '20%', right: 'Spiritual (Entry point)', width: '20%' },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      aria-labelledby="philosophy-heading"
      className="section"
      style={{
        background: 'var(--charcoal)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(212,184,150,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,184,150,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 5rem' }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--champagne)',
              marginBottom: '1rem',
            }}
          >
            The Methodology
          </p>

          <h2
            id="philosophy-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--ivory)',
              marginBottom: '1.5rem',
            }}
          >
            80% practical.{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--champagne)' }}>
              100% real.
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.0625rem',
              color: 'rgba(250,248,244,0.55)',
              lineHeight: 1.75,
            }}
          >
            This is not a spiritual retreat or a motivational seminar. It is a systematic, 
            behavioral, and scientific approach to identity-level change that produces 
            tangible results in your life and business.
          </p>

          {/* Visual breakdown bar */}
          <div
            style={{ marginTop: '2.5rem', textAlign: 'left' }}
            role="img"
            aria-label="Methodology breakdown: 80% practical and scientific, 20% spiritual"
          >
            <div
              style={{
                display: 'flex',
                height: '6px',
                borderRadius: '3px',
                overflow: 'hidden',
                gap: '2px',
              }}
            >
              <div
                style={{
                  width: '80%',
                  background: 'linear-gradient(90deg, var(--gold), var(--champagne))',
                  borderRadius: '3px 0 0 3px',
                }}
              />
              <div
                style={{
                  width: '20%',
                  background: 'rgba(212,184,150,0.25)',
                  borderRadius: '0 3px 3px 0',
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.75rem',
              }}
            >
              {BRAND_ATTRS.map((attr) => (
                <div key={attr.left}>
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.5rem',
                      fontWeight: 500,
                      color: 'var(--champagne)',
                    }}
                  >
                    {attr.left}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      color: 'rgba(250,248,244,0.4)',
                      marginLeft: '0.5rem',
                    }}
                  >
                    {attr.right}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pillars grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
          className="pillars-grid"
        >
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onHoverStart={() => setActiveCard(i)}
                onHoverEnd={() => setActiveCard(null)}
                style={{
                  padding: '2rem',
                  border: `1px solid ${activeCard === i ? 'rgba(212,184,150,0.25)' : 'rgba(212,184,150,0.08)'}`,
                  borderRadius: '8px',
                  background: activeCard === i ? 'rgba(212,184,150,0.05)' : 'rgba(28,26,24,0.5)',
                  transition: 'all 0.35s ease',
                  cursor: 'default',
                }}
              >
                {/* Number + Icon */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '0.9375rem',
                      fontStyle: 'italic',
                      color: pillar.accent,
                      opacity: 0.7,
                    }}
                  >
                    {pillar.number}
                  </span>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: pillar.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={16} color={pillar.accent} strokeWidth={1.5} />
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.3125rem',
                    fontWeight: 500,
                    color: 'var(--ivory)',
                    lineHeight: 1.25,
                    marginBottom: '0.875rem',
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    color: 'rgba(250,248,244,0.5)',
                    lineHeight: 1.75,
                  }}
                >
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <button
            onClick={() => document.querySelector('#qa')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-outline"
            id="philosophy-cta-qa"
            style={{ borderColor: 'rgba(212,184,150,0.4)', color: 'var(--champagne)' }}
          >
            Explore Q&amp;A
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
