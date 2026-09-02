// Q&A Data derived from the client's Brand Vision & Strategy document
// Structured for both the Q&A section and the chatbot knowledge base

export interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export const QA_CATEGORIES = [
  "All",
  "Mindset & Identity",
  "Manifestation",
  "The Program",
  "Brand Philosophy",
  "Results & Transformation",
] as const;

export type QACategory = (typeof QA_CATEGORIES)[number];

export const qaData: QAItem[] = [
  {
    id: "q1",
    question: "What makes Agrika Khatri's approach different from other mindset coaches?",
    answer:
      "The approach cannot be copied because it is rooted in personal energy, lived experience, and unique depth. Agrika's journey — including failing CA exams seven times before building successful ventures — forms the authentic foundation. The human touch and depth during live Q&A interactions is what sets this apart from surface-level coaching.",
    category: "Brand Philosophy",
    tags: ["unique approach", "authenticity", "lived experience"],
    featured: true,
  },
  {
    id: "q2",
    question: "Is this purely spiritual or scientific?",
    answer:
      "The approach is roughly 20% spiritual and 80% practical, behavioral, and scientific. The spiritual element is used primarily at the entry point — for surrendering deep energetic patterns that cognitive methods alone miss. The core work is about behavioral protocols, boundary setting, value systems, and hard execution rather than superficial affirmations.",
    category: "Brand Philosophy",
    tags: ["spiritual", "scientific", "practical", "behavioral"],
    featured: true,
  },
  {
    id: "q3",
    question: "What does a client look like before vs. after working with Agrika?",
    answer:
      "Before: They lack self-awareness, treating external setbacks, losses, or breakups as their permanent universal truth. After: They gain clear awareness of their underlying behavioral loops and past patterns. They gain practical tools to delete those loops and focus on internal identity shifts rather than trying to force external changes.",
    category: "Results & Transformation",
    tags: ["transformation", "before after", "self-awareness", "behavioral loops"],
    featured: true,
  },
  {
    id: "q4",
    question: "Who gets the strongest results from the program?",
    answer:
      "Clients who have an urgent problem to solve and possess the discipline to follow and execute the practical protocols get the strongest results. This program is designed for high-end business owners and serious individuals who are ready to invest in real transformation.",
    category: "The Program",
    tags: ["ideal client", "results", "discipline", "business owners"],
    featured: true,
  },
  {
    id: "q5",
    question: "What is the central pillar of this work?",
    answer:
      "The distinction between surface-level visualization and practical identity shifting is the central pillar. About 80% of the work focuses on behavioral protocols, boundary setting, value systems, and hard execution — not superficial affirmations or visualization tricks.",
    category: "Mindset & Identity",
    tags: ["identity shifting", "behavioral protocols", "visualization", "core pillar"],
    featured: true,
  },
  {
    id: "q6",
    question: "How does the program work once I join?",
    answer:
      "The process has four stages: (1) Assessment — an initial discovery process diagnoses your specific life or business challenges. (2) Personalized Protocol — a tailored protocol is provided that yields initial results within 20 days. (3) Tracking — a dedicated customer relationship team monitors your adherence and progress. (4) Live Training — twice-weekly live sessions covering advanced mindset tools, behavioral protocols, and live Q&A over a 6-month access period.",
    category: "The Program",
    tags: ["program structure", "assessment", "protocol", "live training", "6 months"],
  },
  {
    id: "q7",
    question: "Is manifestation just about visualization and affirmations?",
    answer:
      "No. Manifestation here is used as a doorway — an effective entry point — but the core domain is peak performance coaching, mindset training, and behavioral transformation. Superficial affirmations and visualization tricks are NOT the focus. The real work is 80% practical, behavioral, and rooted in identity shifts.",
    category: "Manifestation",
    tags: ["manifestation", "affirmations", "visualization", "peak performance"],
  },
  {
    id: "q8",
    question: "What is the long-term vision for this brand?",
    answer:
      "The vision is to be recognized as the absolute best in mindset and manifestation in the country — and then globally. The goal is not to remain a solo coach, but to build a brand ecosystem with physical centers and trained associate trainers, operating at the intersection of mindset training, peak performance, and business mentorship.",
    category: "Brand Philosophy",
    tags: ["vision", "brand ecosystem", "global", "peak performance"],
  },
  {
    id: "q9",
    question: "What kind of person is Agrika Khatri NOT trying to work with?",
    answer:
      "This work is not for everyone. The Ideal Client Profile is strictly high-end business owners and serious individuals willing to invest in premium, real transformation. This is explicitly not designed for those looking for a generic 'course' experience. The minimum commitment reflects a serious investment in genuine change.",
    category: "The Program",
    tags: ["ideal client", "not for everyone", "premium", "business owners"],
  },
  {
    id: "q10",
    question: "How quickly can I expect to see results?",
    answer:
      "The personalized protocol is designed to yield initial results within 20 days. The full program runs over 6 months with twice-weekly live sessions. The speed of results depends significantly on the urgency of your problem and your discipline to follow and execute the practical protocols.",
    category: "Results & Transformation",
    tags: ["results", "timeline", "20 days", "6 months"],
  },
  {
    id: "q11",
    question: "What should I NOT expect from this experience?",
    answer:
      "Do not expect generic affirmations, new-age spiritual rituals, or a passive 'watch videos and hope' experience. This is not a course you consume — it is a transformation you execute. The work is demanding, practical, behavioral, and requires your full commitment and discipline.",
    category: "Mindset & Identity",
    tags: ["expectations", "not spiritual", "active work", "commitment"],
  },
  {
    id: "q12",
    question: "What is identity shifting and why does it matter?",
    answer:
      "Identity shifting means changing who you believe yourself to be at a core level — not just what you do or think. When you shift identity, behavior changes naturally. This is why 80% of the work focuses on internal identity rather than external actions. You stop trying to force the world to change and instead change the internal programming that created your current reality.",
    category: "Mindset & Identity",
    tags: ["identity shifting", "behavioral change", "internal programming", "transformation"],
  },
  {
    id: "q13",
    question: "What are behavioral loops and how do they affect my life?",
    answer:
      "Behavioral loops are unconscious patterns — formed by past experiences, traumas, beliefs, and conditioning — that run on autopilot. They determine your reactions, choices, and ultimately your results. Most people treat external events (losses, breakups, failures) as their permanent reality without realizing these are symptoms of deeper loops. The work here is to identify and delete these loops at the root.",
    category: "Mindset & Identity",
    tags: ["behavioral loops", "patterns", "unconscious", "past conditioning"],
  },
  {
    id: "q14",
    question: "Why is Agrika Khatri qualified to guide this transformation?",
    answer:
      "Agrika's credibility comes from lived experience, not just theory. The journey includes failing CA exams seven times before building successful ventures — a real-world test of resilience, identity shifting, and manifestation principles in action. This isn't borrowed philosophy; it is a methodology forged through personal transformation and then refined through client results.",
    category: "Brand Philosophy",
    tags: ["credibility", "lived experience", "CA exams", "qualification"],
  },
];

export function searchQA(query: string): QAItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return qaData;

  return qaData.filter((item) => {
    return (
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });
}

export function filterByCategory(category: QACategory): QAItem[] {
  if (category === "All") return qaData;
  return qaData.filter((item) => item.category === category);
}

export function getFeaturedQA(): QAItem[] {
  return qaData.filter((item) => item.featured);
}

// Chatbot keyword matching
export function findBestAnswer(userMessage: string): string | null {
  const msg = userMessage.toLowerCase();

  // Priority keyword matching
  const matches = qaData.filter((item) => {
    const keywordHits = item.tags.filter((tag) => msg.includes(tag.toLowerCase())).length;
    const questionHit = item.question.toLowerCase().split(" ").filter((w) => w.length > 3 && msg.includes(w)).length;
    return keywordHits > 0 || questionHit >= 2;
  });

  if (matches.length > 0) {
    // Return the best match
    return matches[0].answer;
  }

  return null;
}
