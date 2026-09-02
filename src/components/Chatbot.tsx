'use client';

import { useState, useRef, useEffect, useId, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Minimize2, Send, Minus } from 'lucide-react';
import { findBestAnswer } from '@/lib/qa-data';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  'What makes this approach different?',
  'How does the program work?',
  'Who gets the best results?',
  'What is identity shifting?',
  'Is this spiritual or scientific?',
];

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'bot',
  text: "Hello! I'm here to answer your questions about Agrika Khatri's approach to mindset, manifestation, and peak performance. What would you like to know?",
  timestamp: new Date(),
};

const FALLBACK_RESPONSES = [
  "That's a thoughtful question. I'm still building out my knowledge library. Try asking about mindset, behavioral loops, identity shifting, the program structure, or Agrika's philosophy.",
  "I don't have a specific answer for that yet. You might get a better answer by asking about topics like the program, behavioral protocols, manifestation, or the distinction between spiritual and scientific approaches.",
  "I'm not sure about that one. Consider reaching out directly through the Connect section, or try asking about the program, identity shifting, or what to expect from the work.",
];

function getRandomFallback(): string {
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
}

// Sanitize: ensure only plain text is ever rendered
function escapeText(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 2px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--warm-gray)',
          }}
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '0.75rem',
      }}
    >
      {!isUser && (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--champagne), var(--gold))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginRight: '0.5rem',
            marginTop: '2px',
          }}
          aria-hidden="true"
        >
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--charcoal)' }}>
            A
          </span>
        </div>
      )}
      <div style={{ maxWidth: '80%' }}>
        <div
          className={isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}
          style={{ padding: '0.75rem 1rem' }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.875rem',
              lineHeight: 1.65,
              margin: 0,
              // Plain text rendering — never use dangerouslySetInnerHTML
            }}
          >
            {msg.text}
          </p>
        </div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6875rem',
            color: 'var(--warm-gray)',
            marginTop: '3px',
            textAlign: isUser ? 'right' : 'left',
            paddingLeft: isUser ? 0 : '0.25rem',
          }}
          aria-label={`Sent at ${formatTime(msg.timestamp)}`}
        >
          {formatTime(msg.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowId = useId();
  const inputId = useId();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, scrollToBottom]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  const generateBotResponse = useCallback(async (userText: string) => {
    setIsTyping(true);
    // Simulate realistic typing delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const answer = findBestAnswer(userText);
    const botText = answer ?? getRandomFallback();

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        role: 'bot',
        text: botText,
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, 500);
      if (!trimmed) return;

      setShowSuggestions(false);
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        text: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');

      await generateBotResponse(trimmed);
    },
    [generateBotResponse]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.slice(0, 500));
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        id="chatbot-open-btn"
        onClick={openChat}
        aria-label="Open Ask Agrika chatbot"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: isOpen ? 0 : 1, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--charcoal), var(--charcoal-soft))',
          border: '1px solid rgba(212,184,150,0.25)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(28,26,24,0.4)',
          zIndex: 100,
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}
      >
        <MessageCircle size={22} color="var(--champagne)" strokeWidth={1.5} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={chatWindowId}
            role="dialog"
            aria-label="Ask Agrika chatbot"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.9, y: 20, originX: 1, originY: 1 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              height: isMinimized ? 'auto' : undefined,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: '6.5rem',
              right: '2rem',
              width: 'min(380px, calc(100vw - 2rem))',
              background: 'var(--ivory)',
              border: '1px solid var(--border-mid)',
              borderRadius: '16px',
              boxShadow: '0 24px 80px rgba(28,26,24,0.22)',
              zIndex: 100,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: isMinimized ? '64px' : 'min(560px, calc(100vh - 8rem))',
              transition: 'max-height 0.35s ease',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'var(--charcoal)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
                borderRadius: '16px 16px 0 0',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--champagne), var(--gold))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-hidden="true"
                >
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1rem', fontWeight: 700, color: 'var(--charcoal)' }}>
                    A
                  </span>
                </div>
                <div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--ivory)',
                    lineHeight: 1.2,
                  }}>
                    Ask Agrika
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.6875rem',
                    color: 'rgba(250,248,244,0.4)',
                    letterSpacing: '0.06em',
                  }}>
                    {isTyping ? 'Typing…' : 'Mindset & Peak Performance'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button
                  onClick={toggleMinimize}
                  aria-label={isMinimized ? 'Expand chatbot' : 'Minimize chatbot'}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(250,248,244,0.5)',
                    padding: '6px',
                    borderRadius: '6px',
                    display: 'flex',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,248,244,0.9)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,248,244,0.5)')}
                >
                  <Minus size={16} />
                </button>
                <button
                  onClick={closeChat}
                  aria-label="Close chatbot"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(250,248,244,0.5)',
                    padding: '6px',
                    borderRadius: '6px',
                    display: 'flex',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,248,244,0.9)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(250,248,244,0.5)')}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages area */}
            {!isMinimized && (
              <>
                <div
                  role="log"
                  aria-live="polite"
                  aria-label="Chat messages"
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                  }}
                >
                  {messages.map((msg) => (
                    <ChatMessage key={msg.id} msg={msg} />
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--champagne), var(--gold))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      >
                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--charcoal)' }}>A</span>
                      </div>
                      <div className="chat-bubble-bot" style={{ padding: '0.625rem 0.875rem' }}>
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}

                  {/* Suggested questions */}
                  {showSuggestions && messages.length <= 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.75rem',
                          color: 'var(--warm-gray)',
                          marginBottom: '0.5rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Suggested questions
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                        {SUGGESTED_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            onClick={() => handleSuggestion(q)}
                            style={{
                              background: 'var(--cream)',
                              border: '1px solid var(--border-light)',
                              borderRadius: '8px',
                              padding: '0.5rem 0.75rem',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.8125rem',
                              color: 'var(--text-secondary)',
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--champagne)';
                              (e.currentTarget as HTMLButtonElement).style.color = 'var(--charcoal)';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-light)';
                              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                            }}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <form
                  onSubmit={handleSubmit}
                  style={{
                    padding: '0.875rem 1rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    gap: '0.625rem',
                    flexShrink: 0,
                    background: 'var(--cream)',
                  }}
                >
                  <label htmlFor={inputId} className="sr-only">
                    Type your message
                  </label>
                  <input
                    id={inputId}
                    ref={inputRef}
                    type="text"
                    placeholder="Ask a question…"
                    value={input}
                    onChange={handleInputChange}
                    maxLength={500}
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isTyping}
                    style={{
                      flex: 1,
                      background: 'var(--ivory)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px',
                      padding: '0.625rem 0.875rem',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.875rem',
                      color: 'var(--charcoal)',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                    onFocus={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--champagne)')}
                    onBlur={(e) => ((e.target as HTMLInputElement).style.borderColor = 'var(--border-light)')}
                  />
                  <button
                    type="submit"
                    aria-label="Send message"
                    disabled={!input.trim() || isTyping}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '8px',
                      background: input.trim() && !isTyping ? 'var(--charcoal)' : 'var(--beige)',
                      border: 'none',
                      cursor: input.trim() && !isTyping ? 'pointer' : 'default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <Send
                      size={14}
                      color={input.trim() && !isTyping ? 'var(--ivory)' : 'var(--warm-gray)'}
                      strokeWidth={1.5}
                    />
                  </button>
                </form>

                {/* Footer disclaimer */}
                <div
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--cream)',
                    borderTop: '1px solid var(--border-light)',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.625rem',
                      color: 'var(--warm-gray)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    Demonstration chatbot — based on Agrika's knowledge library.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
