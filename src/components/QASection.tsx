'use client';

import { useRef, useState, useId, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, X } from 'lucide-react';
import { qaData, QA_CATEGORIES, type QACategory, type QAItem } from '@/lib/qa-data';

// Sanitize: only render text, never innerHTML
function safeText(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function QACard({ item, isOpen, onToggle }: {
  item: QAItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const headerId = useId();
  const panelId = useId();

  return (
    <motion.div
      layout
      style={{
        border: `1px solid ${isOpen ? 'var(--champagne)' : 'var(--border-light)'}`,
        borderRadius: '8px',
        overflow: 'hidden',
        background: isOpen ? 'var(--cream)' : 'var(--ivory)',
        transition: 'border-color 0.25s ease, background 0.25s ease',
      }}
    >
      {/* Question button */}
      <button
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.5rem 1.75rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.375rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6875rem',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                padding: '2px 8px',
                border: '1px solid rgba(184,151,90,0.3)',
                borderRadius: '2px',
              }}
            >
              {item.category}
            </span>
            {item.featured && (
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.6875rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(180,160,130,0.7)',
                }}
              >
                Featured
              </span>
            )}
          </div>

          <h3
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.1875rem',
              fontWeight: 500,
              lineHeight: 1.35,
              color: 'var(--charcoal)',
            }}
          >
            {item.question}
          </h3>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flexShrink: 0,
            marginTop: '0.25rem',
            color: isOpen ? 'var(--gold)' : 'var(--warm-gray)',
            transition: 'color 0.25s ease',
          }}
          aria-hidden="true"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 1.75rem 1.75rem',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '1.25rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}
              >
                {item.answer}
              </p>

              {/* Tags */}
              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}
              >
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.6875rem',
                      color: 'var(--warm-gray)',
                      background: 'var(--beige)',
                      padding: '3px 10px',
                      borderRadius: '20px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function QASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<QACategory>('All');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['q1']));
  const searchId = useId();

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow plain text — no HTML injection risk since we never use dangerouslySetInnerHTML
    const val = e.target.value.slice(0, 200); // Cap length
    setSearchQuery(val);
  }, []);

  const toggleItem = useCallback((id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const filteredItems: QAItem[] = qaData.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <section
      id="qa"
      ref={sectionRef}
      aria-labelledby="qa-heading"
      className="section"
      style={{
        background: 'var(--cream)',
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
          style={{ maxWidth: '600px', marginBottom: '3.5rem' }}
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
            Knowledge Centre
          </p>

          <h2
            id="qa-heading"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: 'var(--charcoal)',
              marginBottom: '1rem',
            }}
          >
            Questions worth{' '}
            <span style={{ fontStyle: 'italic' }}>asking.</span>
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
            }}
          >
            Real answers based on Agrika's philosophy and methodology. 
            Search or explore by topic.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          <label
            htmlFor={searchId}
            className="sr-only"
          >
            Search questions and answers
          </label>
          <div style={{ position: 'relative', maxWidth: '520px' }}>
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '1.125rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--warm-gray)',
                pointerEvents: 'none',
              }}
              aria-hidden="true"
            />
            <input
              id={searchId}
              type="search"
              className="input-brand"
              placeholder="Search questions…"
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ paddingLeft: '2.75rem', paddingRight: searchQuery ? '2.75rem' : '1.25rem' }}
              maxLength={200}
              autoComplete="off"
              spellCheck="false"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                aria-label="Clear search"
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--warm-gray)',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2.5rem',
          }}
          role="group"
          aria-label="Filter questions by category"
        >
          {QA_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                padding: '0.5rem 1.125rem',
                borderRadius: '4px',
                border: `1px solid ${activeCategory === cat ? 'var(--charcoal)' : 'var(--border-mid)'}`,
                background: activeCategory === cat ? 'var(--charcoal)' : 'transparent',
                color: activeCategory === cat ? 'var(--ivory)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8125rem',
            color: 'var(--warm-gray)',
            marginBottom: '1.5rem',
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          {filteredItems.length} question{filteredItems.length !== 1 ? 's' : ''}{' '}
          {searchQuery ? `matching "${safeText(searchQuery).slice(0, 40)}"` : ''}
        </motion.p>

        {/* Q&A List */}
        <motion.div
          layout
          style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <QACard
                    item={item}
                    isOpen={openItems.has(item.id)}
                    onToggle={() => toggleItem(item.id)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: 'var(--warm-gray)',
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                }}
              >
                No questions found. Try a different search or category.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Ask CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '3.5rem',
            padding: '2.5rem',
            background: 'var(--charcoal)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 400,
                color: 'var(--ivory)',
                marginBottom: '0.5rem',
              }}
            >
              Have a question that's not answered here?
            </h3>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                color: 'rgba(250,248,244,0.5)',
              }}
            >
              Ask directly using the chatbot or reach out.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const chatBtn = document.getElementById('chatbot-open-btn');
                chatBtn?.click();
              }}
              className="btn btn-gold"
              id="qa-ask-chatbot"
            >
              Ask Agrika
            </button>
            <button
              onClick={() => document.querySelector('#connect')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-outline"
              id="qa-cta-connect"
              style={{ borderColor: 'rgba(250,248,244,0.25)', color: 'rgba(250,248,244,0.7)' }}
            >
              Connect
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
