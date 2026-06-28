// ============================================================
// HowItWorks — 4-step ML pipeline timeline
// ============================================================

import { motion } from "framer-motion";
import { Mail, Sparkles, BarChart3, Cpu } from "lucide-react";
import { HOW_IT_WORKS_STEPS } from "../utils/constants";

const ICONS = { Mail, Sparkles, BarChart3, Cpu };

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section-padding"
      style={{ position: "relative", zIndex: 2 }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            How It <span className="gradient-text">Works</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: 600,
              margin: "0 auto",
              fontSize: "1.05rem",
            }}
          >
            Our ML pipeline processes your email through four intelligent stages
            to deliver accurate spam classification.
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            maxWidth: 700,
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 28,
              top: 0,
              bottom: 0,
              width: 2,
              background:
                "linear-gradient(180deg, var(--accent-blue), var(--accent-cyan), var(--accent-purple))",
              opacity: 0.3,
            }}
          />

          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = ICONS[step.icon];
            const colors = [
              "#3b82f6",
              "#8b5cf6",
              "#06b6d4",
              "#10b981",
            ];
            const color = colors[index];

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: index < 3 ? "2.5rem" : 0,
                  alignItems: "flex-start",
                }}
              >
                {/* Step dot */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `${color}18`,
                    border: `2px solid ${color}40`,
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <Icon size={24} color={color} />
                </div>

                {/* Card */}
                <div
                  className="glass-card card-hover"
                  style={{
                    flex: 1,
                    padding: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color,
                        background: `${color}15`,
                        padding: "0.25rem 0.6rem",
                        borderRadius: 99,
                        letterSpacing: "0.05em",
                      }}
                    >
                      STEP {step.step}
                    </span>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--text-on-card)",
                      }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-on-card-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
