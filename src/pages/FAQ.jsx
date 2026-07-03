import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is SkillSwap?',
    a: 'SkillSwap is a peer-to-peer learning platform that connects verified students so they can teach and learn from each other. It is a safe, trusted space where you can exchange skills, build knowledge, and grow your network.',
  },
  {
    q: 'Is SkillSwap free?',
    a: 'Yes, SkillSwap is completely free for verified students. Our mission is to make peer learning accessible to everyone. There are no subscription fees, no hidden charges, and no premium tiers.',
  },
  {
    q: 'How are students verified?',
    a: 'We use a multi-step verification process that includes institutional email verification and optional profile review. This ensures that every member of our community is a genuine student committed to meaningful learning exchanges.',
  },
  {
    q: 'Can I meet people offline?',
    a: 'SkillSwap is designed for safe online-first interactions. While we facilitate the initial connection, we recommend keeping sessions virtual until you are comfortable. Contact sharing is entirely optional and controlled by you.',
  },
  {
    q: 'How does matching work?',
    a: 'Matching is based on the skills you want to learn and the skills you can teach. You can browse skill categories, view peer profiles, and connect with students whose goals align with yours.',
  },
  {
    q: 'How are reviews handled?',
    a: 'After each session, both parties can leave a review. Reviews are visible on profiles to help the community identify trusted peers. We monitor reviews to ensure they remain fair, constructive, and respectful.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* Hero */}
      <section className="px-4 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            FAQ
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
            Everything you need to know about SkillSwap. Still have questions? Feel free to reach
            out.
          </p>
        </motion.div>
      </section>

      {/* Accordion */}
      <section className="bg-neutral-50 px-4 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-neutral-200/60 bg-white shadow-soft"
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50 sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                  />
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
                      <div className="border-t border-neutral-100 px-6 py-4 text-sm leading-relaxed text-neutral-500">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
