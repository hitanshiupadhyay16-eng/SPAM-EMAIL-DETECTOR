// ============================================================
// Footer — Professional multi-column footer
// ============================================================

import { motion } from "framer-motion";
import { Shield, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--bg-glass-border)",
      }}
    >
      {/* Gradient accent line */}
      <div
        style={{
          height: 3,
          background: "var(--gradient-primary)",
        }}
      />

      <div
        className="section-container"
        style={{ padding: "4rem 1.5rem 2rem" }}
      >
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              <Shield size={24} color="var(--accent-blue)" />
              <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Spam<span className="gradient-text">Guard</span>
              </span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              AI-powered spam email detection using machine learning. Built with
              TF-IDF vectorization and Multinomial Naive Bayes classification.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Quick Links
            </h4>
            {[
              { label: "Classifier", href: "#classifier" },
              { label: "Dashboard", href: "#dashboard" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Features", href: "#features" },
              { label: "About ML", href: "#about-ml" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: "block",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  marginBottom: "0.5rem",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent-cyan)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Tech Stack
            </h4>
            {[
              "React + TypeScript",
              "Tailwind CSS",
              "Framer Motion",
              "Python Flask",
              "Scikit-learn",
              "Recharts",
            ].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  marginBottom: "0.5rem",
                }}
              >
                {tech}
              </div>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Connect
            </h4>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.85rem",
                marginBottom: "0.75rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-cyan)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub Repository
            </a>
            <br />
            <a
              href="mailto:contact@spamguard.ai"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontSize: "0.85rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-cyan)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              <Mail size={16} />
              contact@spamguard.ai
            </a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--bg-glass-border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            Built with <Heart size={14} color="var(--accent-red)" fill="var(--accent-red)" /> using
            Machine Learning
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} SpamGuard AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
