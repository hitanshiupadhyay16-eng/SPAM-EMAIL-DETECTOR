// ============================================================
// Features — Feature cards grid with icons & hover effects
// ============================================================

import { motion } from "framer-motion";
import { Zap, Brain, Target, ShieldCheck } from "lucide-react";
import { FEATURES } from "../utils/constants";

const ICONS = { Zap, Brain, Target, ShieldCheck };
const COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"];

export default function Features() {
  return (
    <section
      id="features"
      className="section-padding"
      style={{ position: "relative", zIndex: 2 }}
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Key <span className="gradient-text">Features</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto", fontSize: "1.05rem" }}>
            Built with cutting-edge technology to deliver reliable, fast, and
            secure email classification.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            const color = COLORS[i];

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card card-hover"
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Accent glow */}
                <div
                  style={{
                    position: "absolute",
                    top: -40,
                    right: -40,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${color}20, transparent)`,
                    filter: "blur(20px)",
                  }}
                />

                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    background: `${color}12`,
                    border: `1px solid ${color}25`,
                  }}
                >
                  <Icon size={28} color={color} />
                </div>

                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--text-on-card)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-on-card-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
