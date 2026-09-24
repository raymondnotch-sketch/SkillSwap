import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircle, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const faqs = [
  {
    category: 'General',
    q: 'What is SkillSwap?',
    a: 'SkillSwap is a peer-to-peer learning platform that connects verified students so they can teach and learn from each other. It is a safe, trusted space where you can exchange skills, build knowledge, and grow your network — all without spending money.',
  },
  {
    category: 'General',
    q: 'Is SkillSwap completely free?',
    a: 'Yes, SkillSwap is completely free for verified students. Our mission is to make peer learning accessible to everyone. There are no subscription fees, no hidden charges, and no premium tiers — just genuine knowledge exchange.',
  },
  {
    category: 'Verification',
    q: 'How are students verified?',
    a: 'We use a multi-step verification process that includes institutional email verification (.edu) and student ID verification. This ensures that every member of our community is an authentic student committed to respectful learning exchanges.',
  },
  {
    category: 'Exchange & Safety',
    q: 'Can I meet people offline?',
    a: 'SkillSwap is designed for safe online-first interactions. While we facilitate the initial connection, we recommend keeping sessions virtual until you feel comfortable. Contact sharing is entirely optional and always controlled by you.',
  },
  {
    category: 'Exchange & Safety',
    q: 'How does matching work?',
    a: 'Matching is based on the skills you want to learn and the skills you can teach. You can browse skill categories, explore peer profiles, and connect with students whose goals align with yours. Our system surfaces the most relevant reciprocal matches based on your profile.',
  },
  {
    category: 'Verification',
    q: 'How are reviews handled?',
    a: 'After each session, both parties can leave a review. Reviews are visible on profiles to help the community identify trusted peers. We actively monitor reviews to ensure they remain fair, constructive, and respectful.',
  },
  {
    category: 'Exchange & Safety',
    q: 'What happens if a session goes wrong?',
    a: 'We have a built-in reporting system. If you ever feel uncomfortable or experience inappropriate behavior, you can report a user directly from their profile or session page. Our moderation team reviews all reports promptly.',
  },
  {
    category: 'General',
    q: 'Can I teach more than one skill?',
    a: 'Absolutely. You can list as many skills as you like on your profile — there is no limit. The more skills you offer, the more potential matches you will have. You can also update your skill list at any time.',
  },
];

const categories = ['All', 'General', 'Verification', 'Exchange & Safety'];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-hidden bg-white text-neutral-800"
    >
      {/* Hero */}
      <section className="border-b border-neutral-200 bg-neutral-50/60 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700 shadow-xs">
            <HelpCircle className="h-4 w-4 text-primary-600" />
            Help Center & FAQ
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
            Frequently Asked <span className="text-primary-600">Questions</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Everything you need to know about SkillSwap, student verification, and safe peer exchanges.
          </p>

          {/* Interactive Search Bar */}
          <div className="mt-8 mx-auto max-w-md relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search questions (e.g., verification, cost, safety)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 bg-white pl-10 pr-4 py-3 text-sm text-neutral-900 shadow-xs focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-xs'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 rounded-xl border border-neutral-200 bg-neutral-50 p-8">
              <HelpCircle className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
              <p className="text-sm font-bold text-neutral-900">No matching questions found</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching with a different term or select another category.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-4 text-xs font-semibold text-primary-600 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <div
                  key={i}
                  className={`overflow-hidden rounded-xl border transition-all duration-200 ${
                    openIndex === i
                      ? 'border-primary-300 bg-white shadow-xs'
                      : 'border-neutral-200 bg-white hover:border-neutral-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-answer-${i}`}
                    className="flex w-full items-center justify-between px-6 py-4.5 text-left transition-colors hover:bg-neutral-50/60 sm:px-7"
                  >
                    <span
                      className={`pr-4 text-sm font-bold transition-colors sm:text-base ${
                        openIndex === i ? 'text-primary-700' : 'text-neutral-900'
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
                        openIndex === i ? 'bg-primary-50 text-primary-600' : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openIndex === i ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-neutral-100 px-6 py-4.5 text-sm leading-relaxed text-neutral-600 sm:px-7">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* Still have questions card */}
          <div className="mt-14 rounded-xl border border-neutral-200 bg-neutral-50 p-8 text-center sm:p-10 shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-900">Still have questions?</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-600">
              Our campus moderation team is here to support you. Reach out directly.
            </p>
            <div className="mt-6">
              <Link to="/contact">
                <Button size="md" className="font-semibold">
                  Contact Student Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
