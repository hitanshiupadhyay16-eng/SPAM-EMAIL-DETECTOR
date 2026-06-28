// ============================================================
// Hero — Gradient hero section with typing animation
// ============================================================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, ArrowDown, Sparkles } from "lucide-react";

const TYPING_TEXTS = [
  "Spam Detection",
  "Email Security",
  "AI Classification",
  "Threat Analysis",
];

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentText) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentText.substring(0, displayText.length - 1)
          : currentText.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background: "var(--gradient-hero)",
      }}
    >
      {/* Gradient orbs */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          top: "10%",
          right: "-5%",
          filter: "blur(40px)",
        }}
        className="animate-float"
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          bottom: "15%",
          left: "-5%",
          filter: "blur(40px)",
          animationDelay: "3s",
        }}
        className="animate-float"
      />

      <div
        style={{
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          padding: "0 1.5rem",
          maxWidth: 900,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--bg-glass)",
            border: "1px solid var(--bg-glass-border)",
            borderRadius: 999,
            padding: "0.5rem 1.25rem",
            marginBottom: "2rem",
            fontSize: "0.85rem",
            color: "var(--accent-cyan)",
            fontWeight: 500,
          }}
        >
          <Sparkles size={16} />
          Powered by Machine Learning
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            letterSpacing: "-0.02em",
          }}
        >
          AI Spam Email
          <br />
          <span className="gradient-text">Detector</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            color: "var(--text-secondary)",
            marginBottom: "1rem",
            height: "2rem",
            fontWeight: 400,
          }}
        >
          Intelligent{" "}
          <span
            style={{
              color: "var(--accent-cyan)",
              fontWeight: 600,
            }}
          >
            {displayText}
          </span>
          <span
            style={{
              animation: "typing-cursor 1s step-end infinite",
              color: "var(--accent-blue)",
              fontWeight: 300,
            }}
          >
            |
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "var(--text-muted)",
            maxWidth: 600,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Advanced email classification using TF-IDF vectorization and Naive
          Bayes algorithms to protect your inbox from spam and phishing threats.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="#classifier" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <Shield size={18} />
            Try Classifier
          </a>
          <a href="#how-it-works" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            Learn How It Works
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: "4rem",
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={24} color="var(--text-muted)" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
