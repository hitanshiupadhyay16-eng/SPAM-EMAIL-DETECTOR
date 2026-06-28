// ============================================================
// Dashboard — Model performance metrics with animated cards
// ============================================================

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Activity, Target, BarChart3, Award } from "lucide-react";
import type { ModelMetrics } from "../types";

interface DashboardProps {
  metrics: ModelMetrics | null;
}

/** Animated counter hook */
function useCountUp(end: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // ease-out-cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * end);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return value;
}

const METRIC_CARDS = [
  { key: "accuracy", label: "Accuracy", icon: Activity, color: "#3b82f6" },
  { key: "precision", label: "Precision", icon: Target, color: "#8b5cf6" },
  { key: "recall", label: "Recall", icon: BarChart3, color: "#06b6d4" },
  { key: "f1_score", label: "F1 Score", icon: Award, color: "#10b981" },
] as const;

function MetricCard({
  label,
  value,
  icon: Icon,
  color,
  delay,
}: {
  label: string;
  value: number;
  icon: typeof Activity;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(value * 100, 2000, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="glass-card card-hover"
      style={{
        padding: "2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1rem",
          background: `${color}15`,
        }}
      >
        <Icon size={24} color={color} />
      </div>

      {/* Value */}
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          color: "var(--text-on-card)",
          lineHeight: 1,
          marginBottom: "0.25rem",
        }}
      >
        {count.toFixed(1)}
        <span style={{ fontSize: "1.5rem", color }}> %</span>
      </div>

      {/* Label */}
      <div
        style={{
          fontSize: "0.9rem",
          fontWeight: 500,
          color: "var(--text-on-card-secondary)",
          marginBottom: "1rem",
        }}
      >
        {label}
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 6,
          borderRadius: 99,
          background: "rgba(0,0,0,0.06)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
          style={{
            height: "100%",
            borderRadius: 99,
            background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Dashboard({ metrics }: DashboardProps) {
  if (!metrics) return null;

  return (
    <section
      id="dashboard"
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
            Model <span className="gradient-text">Performance</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: 600,
              margin: "0 auto",
              fontSize: "1.05rem",
            }}
          >
            Evaluation metrics from the trained Multinomial Naive Bayes
            classifier on the test dataset.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          {METRIC_CARDS.map((m, i) => (
            <MetricCard
              key={m.key}
              label={m.label}
              value={metrics[m.key]}
              icon={m.icon}
              color={m.color}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Extra info cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {[
            { label: "Training Samples", value: metrics.train_size.toLocaleString(), color: "#3b82f6" },
            { label: "Test Samples", value: metrics.test_size.toLocaleString(), color: "#8b5cf6" },
            { label: "Vocabulary Size", value: metrics.vocabulary_size.toLocaleString(), color: "#06b6d4" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass"
              style={{
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: item.color,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
