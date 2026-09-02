'use client';

import { useRef, useState, useId } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageCircle, AlertCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const TOPIC_OPTIONS = [
  'The Signature Program',
  'Mindset & Behavioral Coaching',
  'Speaking / Collaboration',
  'General Enquiry',
];

function sanitizeInput(str: string): string {
  return str.trim().slice(0, 2000);
}

function validateEmail(email: string): boolean {
  // RFC-compliant pattern (simplified)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export default function Connect() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const formId = useId();
  const nameId = useId();
  const emailId = useId();
  const topicId = useId();
  const messageId = useId();

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    topic: TOPIC_OPTIONS[0],
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    const cleanName = sanitizeInput(form.name);
    const cleanEmail = sanitizeInput(form.email);
    const cleanMsg = sanitizeInput(form.message);

    if (!cleanName || cleanName.length < 2) {
      errs.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!cleanEmail || !validateEmail(cleanEmail)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!cleanMsg || cleanMsg.length < 20) {
      errs.message = 'Please share a bit more (at least 20 characters).';
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.slice(0, 2000) }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Focus first error field
      const firstErrorField = Object.keys(errs)[0];
      document.getElementById(firstErrorField === 'name' ? nameId : firstErrorField === 'email' ? emailId : messageId)?.focus();
      return;
    }

    setSubmitting(true);
    // Simulate API call (no real endpoint — frontend only)
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section
      id="connect"
      ref={sectionRef}
      aria-labelledby="connect-heading"
      className="section"
      style={{
        background: 'var(--charcoal)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,151,90,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
            Get in Touch
          </p>

          <h2
            id="connect-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'var(--ivory)',
              marginBottom: '1.5rem',
            }}
          >
            Begin your{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--champagne)' }}>
              conversation.
            </span>
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'rgba(250,248,244,0.55)',
              lineHeight: 1.8,
              marginBottom: '2.5rem',
            }}
          >
            Whether you're curious about the program, want to explore a 
            collaboration, or have a specific question — reach out directly.
          </p>

          {/* Contact cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                border: '1px solid rgba(212,184,150,0.12)',
                borderRadius: '8px',
                background: 'rgba(212,184,150,0.04)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(184,151,90,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Mail size={16} color="var(--champagne)" strokeWidth={1.5} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(250,248,244,0.35)',
                    marginBottom: '2px',
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9375rem',
                    color: 'rgba(250,248,244,0.7)',
                  }}
                >
                  Use the form to connect
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem 1.5rem',
                border: '1px solid rgba(212,184,150,0.12)',
                borderRadius: '8px',
                background: 'rgba(212,184,150,0.04)',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(184,151,90,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <MessageCircle size={16} color="var(--champagne)" strokeWidth={1.5} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(250,248,244,0.35)',
                    marginBottom: '2px',
                  }}
                >
                  Chatbot
                </p>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9375rem',
                    color: 'rgba(250,248,244,0.7)',
                  }}
                >
                  Ask Agrika — available now
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <blockquote
            style={{
              marginTop: '3rem',
              paddingLeft: '1.5rem',
              borderLeft: '2px solid rgba(212,184,150,0.25)',
            }}
          >
            <p
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.25rem',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'rgba(250,248,244,0.5)',
                lineHeight: 1.6,
              }}
            >
              "The people who get the strongest results are those who have an 
              urgent problem to solve — and the discipline to execute."
            </p>
            <footer
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--champagne)',
                marginTop: '0.75rem',
                opacity: 0.7,
              }}
            >
              — Agrika Khatri
            </footer>
          </blockquote>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {submitted ? (
            <div
              style={{
                padding: '3rem',
                textAlign: 'center',
                background: 'rgba(212,184,150,0.06)',
                border: '1px solid rgba(212,184,150,0.2)',
                borderRadius: '12px',
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'rgba(184,151,90,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                }}
              >
                <CheckCircleIcon />
              </div>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.75rem',
                  fontWeight: 400,
                  color: 'var(--ivory)',
                  marginBottom: '0.75rem',
                }}
              >
                Message received.
              </h3>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9375rem',
                  color: 'rgba(250,248,244,0.5)',
                  lineHeight: 1.7,
                }}
              >
                Thank you for reaching out. We'll be in touch with you shortly.
              </p>
            </div>
          ) : (
            <form
              id={formId}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              style={{
                background: 'rgba(250,248,244,0.04)',
                border: '1px solid rgba(212,184,150,0.12)',
                borderRadius: '12px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor={nameId}
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: 'rgba(250,248,244,0.6)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Full Name <span aria-label="required">*</span>
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={200}
                  value={form.name}
                  onChange={handleChange}
                  className="input-brand"
                  style={{
                    background: 'rgba(250,248,244,0.06)',
                    border: `1px solid ${errors.name ? 'rgba(220,80,80,0.5)' : 'rgba(212,184,150,0.15)'}`,
                    color: 'var(--ivory)',
                  }}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                />
                {errors.name && (
                  <p
                    id={`${nameId}-error`}
                    role="alert"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      color: 'rgba(220,120,120,0.9)',
                      marginTop: '0.375rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                  >
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor={emailId}
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: 'rgba(250,248,244,0.6)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email Address <span aria-label="required">*</span>
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={200}
                  value={form.email}
                  onChange={handleChange}
                  className="input-brand"
                  style={{
                    background: 'rgba(250,248,244,0.06)',
                    border: `1px solid ${errors.email ? 'rgba(220,80,80,0.5)' : 'rgba(212,184,150,0.15)'}`,
                    color: 'var(--ivory)',
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${emailId}-error` : undefined}
                />
                {errors.email && (
                  <p
                    id={`${emailId}-error`}
                    role="alert"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      color: 'rgba(220,120,120,0.9)',
                      marginTop: '0.375rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                  >
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Topic */}
              <div>
                <label
                  htmlFor={topicId}
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: 'rgba(250,248,244,0.6)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Topic
                </label>
                <select
                  id={topicId}
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="input-brand"
                  style={{
                    background: 'rgba(28,26,24,0.8)',
                    border: '1px solid rgba(212,184,150,0.15)',
                    color: 'var(--ivory)',
                    cursor: 'pointer',
                  }}
                >
                  {TOPIC_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} style={{ background: 'var(--charcoal)' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor={messageId}
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: 'rgba(250,248,244,0.6)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Your Message <span aria-label="required">*</span>
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  required
                  rows={5}
                  maxLength={2000}
                  value={form.message}
                  onChange={handleChange}
                  className="input-brand"
                  placeholder="Tell us a bit about what you're facing or what you're looking for…"
                  style={{
                    resize: 'vertical',
                    background: 'rgba(250,248,244,0.06)',
                    border: `1px solid ${errors.message ? 'rgba(220,80,80,0.5)' : 'rgba(212,184,150,0.15)'}`,
                    color: 'var(--ivory)',
                    minHeight: '120px',
                  }}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${messageId}-error` : undefined}
                />
                {errors.message && (
                  <p
                    id={`${messageId}-error`}
                    role="alert"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      color: 'rgba(220,120,120,0.9)',
                      marginTop: '0.375rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                  >
                    <AlertCircle size={12} aria-hidden="true" />
                    {errors.message}
                  </p>
                )}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: 'rgba(250,248,244,0.25)',
                    marginTop: '0.375rem',
                    textAlign: 'right',
                  }}
                >
                  {form.message.length}/2000
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-gold"
                id="connect-submit"
                style={{ width: '100%', justifyContent: 'center', opacity: submitting ? 0.7 : 1 }}
                aria-busy={submitting}
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem',
                  color: 'rgba(250,248,244,0.2)',
                  textAlign: 'center',
                }}
              >
                Your information is handled with care and never shared with third parties.
              </p>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--champagne)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22,4 12,14.01 9,11.01" />
    </svg>
  );
}
