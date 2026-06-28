// ============================================================
// AboutML — Explanation of TF-IDF & Naive Bayes
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

const TOPICS: AccordionItem[] = [
  {
    title: "What is TF-IDF?",
    content:
      "TF-IDF (Term Frequency-Inverse Document Frequency) is a statistical measure that evaluates the importance of a word in a document relative to a corpus. Term Frequency (TF) measures how frequently a term appears in a document. Inverse Document Frequency (IDF) measures how important a term is across all documents — words that appear in many documents are given lower weight. By combining TF and IDF, the algorithm highlights words that are distinctive to specific documents, making it ideal for text classification tasks like spam detection.",
  },
  {
    title: "What is Naive Bayes?",
    content:
      "Multinomial Naive Bayes is a probabilistic classifier based on Bayes' theorem with the 'naive' assumption that features are conditionally independent given the class label. For text classification, it calculates the probability of a document belonging to each class (spam or ham) based on the words it contains. Despite its simplicity, Naive Bayes performs remarkably well for text classification because word frequencies provide strong signals for distinguishing between content types.",
  },
  {
    title: "Why These Algorithms for Spam Detection?",
    content:
      "TF-IDF + Naive Bayes is the gold standard for text classification for several reasons: (1) TF-IDF effectively captures the distinguishing vocabulary of spam vs. legitimate emails — words like 'free', 'winner', and 'click' get high weights in spam. (2) Naive Bayes is computationally efficient, trains quickly on small datasets, and handles high-dimensional sparse feature vectors naturally. (3) The combination achieves high accuracy while remaining interpretable — you can examine which words drive classification decisions. (4) The model generalizes well and is robust to overfitting, especially with proper smoothing.",
  },
  {
    title: "Understanding Model Metrics",
    content:
      "Accuracy measures overall correct predictions. Precision tells us what percentage of emails flagged as spam are actually spam (minimizing false positives). Recall measures what percentage of actual spam emails were caught (minimizing false negatives). F1 Score is the harmonic mean of precision and recall, providing a balanced measure. For spam detection, high recall is critical — we want to catch as much spam as possible — while maintaining reasonable precision to avoid filtering legitimate emails.",
  },
];

function AccordionCard({ item, index }: { item: AccordionItem; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card"
      style={{
        overflow: "hidden",
        marginBottom: "1rem",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--text-on-card)",
          fontFamily: "var(--font-sans)",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "1.05rem", fontWeight: 600 }}>
          {item.title}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} color="var(--accent-blue)" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 1.5rem 1.5rem",
                fontSize: "0.9rem",
                color: "var(--text-on-card-secondary)",
                lineHeight: 1.8,
              }}
            >
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AboutML() {
  return (
    <section
      id="about-ml"
      className="section-padding"
      style={{ position: "relative", zIndex: 2 }}
    >
      <div className="section-container" style={{ maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <BookOpen size={24} color="var(--accent-blue)" />
          </div>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            About <span className="gradient-text">Machine Learning</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
            Understand the algorithms powering our spam classifier.
          </p>
        </motion.div>

        {TOPICS.map((item, i) => (
          <AccordionCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
