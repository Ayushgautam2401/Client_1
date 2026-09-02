'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const PROGRAM_STEPS = [
  {
    step: '01',
    title: 'Discovery Assessment',
    duration: 'Day 1',
    description:
      'An in-depth diagnostic process that identifies your specific life or business challenges — career blocks, relationship patterns, past conditioning — to understand the root source of your current reality.',
    highlights: ['Personalized diagnosis', 'Root cause identification', 'Challenge mapping'],
  },
  {
    step: '02',
    title: 'Personalized Protocol',
    duration: 'Days 1–20',
    description:
      'A custom-designed behavioral protocol tailored to your specific patterns. Not a generic framework — a precise intervention designed to generate initial, measurable results within the first 20 days.',
    highlights: ['Custom-designed protocol', 'Initial results in 20 days', 'Behavioral precision'],
  },
  {
    step: '03',
    title: 'Dedicated Tracking',
    duration: 'Ongoing',
    description:
      'A dedicated customer relationship team monitors your adherence and progress throughout the program. Accountability is built into the architecture — not left to willpower alone.',
    highlights: ['Dedicated CRM team', 'Progress monitoring', 'Accountability structure'],
  },
  {
    step: '04',
    title: 'Live Training Sessions',
    duration: '6 Months',
    description:
      'Twice-weekly live sessions with Agrika covering advanced mindset tools, behavioral protocols, and real-time Q&A. Six months of access means deep, sustained transformation — not a weekend event.',
    highlights: ['Twice-weekly live sessions', 'Advanced mindset tools', 'Live Q&A access'],
  },
];

const WHO_IT_IS_FOR = [
  'High-end business owners with an urgent problem to solve',
  'Individuals with the discipline to execute practical protocols',
  'People ready to invest seriously in real transformation',
  'Those who want identity-level change, not surface-level tips',
];

const WHO_IT_IS_NOT_FOR = [
  'Those looking for a generic online course experience',
  'People not ready to commit to behavioral change',
  'Anyone expecting results without disciplined execution',
  'Those seeking purely spiritual or affirmation-based work',
];

export default function Program() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section
      id="program"
      ref={sectionRef}
      aria-labelledby="program-heading"
      className="section"
      style={{
        background: 'var(--ivory)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ maxWidth: '640px', marginBottom: '4.5rem' }}
        >
          <p
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
            The Signature Program
          </p>

          <h2
            id="program-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'var(--charcoal)',
              marginBottom: '1.5rem',
            }}
          >
            A complete protocol for{' '}
            <span style={{ fontStyle: 'italic' }}>identity-level change.</span>
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
            }}
          >
            This is not a course you consume. It is a transformation you execute — 
            with assessment, personalized protocols, dedicated support, and six months 
            of live access to Agrika's advanced methodology.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div style={{ position: 'relative' }}>
          {/* Vertical connecting line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '2.25rem',
              top: '2.5rem',
              bottom: '2.5rem',
              width: '1px',
              background: 'linear-gradient(to bottom, var(--champagne), transparent)',
              opacity: 0.3,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {PROGRAM_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  display: 'flex',
                  gap: '2rem',
                  alignItems: 'flex-start',
                }}
                className="program-step"
              >
                {/* Step number bubble */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '4.5rem',
                    height: '4.5rem',
                    borderRadius: '50%',
                    background: 'var(--charcoal)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    border: '3px solid var(--ivory)',
                    boxShadow: '0 0 0 1px var(--border-light)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '0.9375rem',
                      fontStyle: 'italic',
                      color: 'var(--champagne)',
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <div
                  style={{
                    flex: 1,
                    padding: '1.75rem',
                    background: 'var(--cream)',
                    border: '1px solid var(--border-light)',
                    borderRadius: '10px',
                    transition: 'border-color 0.25s ease',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--champagne)')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-light)')
                  }
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '1.375rem',
                        fontWeight: 500,
                        color: 'var(--charcoal)',
                      }}
                    >
                      {step.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        color: 'var(--gold)',
                        background: 'rgba(184,151,90,0.1)',
                        padding: '3px 10px',
                        borderRadius: '2px',
                        border: '1px solid rgba(184,151,90,0.2)',
                      }}
                    >
                      {step.duration}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.75,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {step.description}
                  </p>

                  <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                    {step.highlights.map((h) => (
                      <li
                        key={h}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                      >
                        <CheckCircle2
                          size={14}
                          color="var(--gold)"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.8125rem',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {h}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Who it's for */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '5rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
          }}
          className="who-grid"
        >
          {/* Is for */}
          <div
            style={{
              padding: '2rem',
              background: 'var(--charcoal)',
              borderRadius: '10px',
              color: 'var(--ivory)',
            }}
          >
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.375rem',
                fontWeight: 400,
                marginBottom: '1.5rem',
                color: 'var(--champagne)',
              }}
            >
              This is for you if…
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {WHO_IT_IS_FOR.map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                >
                  <CheckCircle2
                    size={16}
                    color="var(--champagne)"
                    strokeWidth={1.5}
                    style={{ flexShrink: 0, marginTop: '2px' }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9375rem',
                      color: 'rgba(250,248,244,0.75)',
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not for */}
          <div
            style={{
              padding: '2rem',
              background: 'var(--cream)',
              border: '1px solid var(--border-light)',
              borderRadius: '10px',
            }}
          >
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.375rem',
                fontWeight: 400,
                marginBottom: '1.5rem',
                color: 'var(--charcoal)',
              }}
            >
              This is not for you if…
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {WHO_IT_IS_NOT_FOR.map((item) => (
                <li
                  key={item}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      border: '1.5px solid var(--warm-gray-light)',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                    aria-hidden="true"
                  />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.9375rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Program CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.125rem',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              marginBottom: '1.5rem',
            }}
          >
            Interested in learning more or exploring whether this is the right fit?
          </p>
          <button
            onClick={() => document.querySelector('#connect')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-primary"
            id="program-cta-connect"
          >
            Connect With Agrika
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .program-step {
            flex-direction: column !important;
            gap: 0.875rem !important;
          }
          .who-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
