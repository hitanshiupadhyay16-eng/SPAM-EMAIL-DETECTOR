// ============================================================
// DataVisualization — Charts: distribution, confusion matrix, features
// ============================================================

import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ModelMetrics } from "../types";

interface DataVisualizationProps {
  metrics: ModelMetrics | null;
}

const PIE_COLORS = ["#10b981", "#ef4444"];
const BAR_COLORS = { spam: "#ef4444", ham: "#3b82f6" };

export default function DataVisualization({ metrics }: DataVisualizationProps) {
  if (!metrics) return null;

  const distributionData = [
    { name: "Ham", value: metrics.class_distribution.ham },
    { name: "Spam", value: metrics.class_distribution.spam },
  ];

  const cm = metrics.confusion_matrix;

  const topFeaturesData = metrics.top_spam_features.slice(0, 10).map((word, i) => ({
    word,
    importance: 10 - i,
    type: "spam",
  }));

  const topHamData = metrics.top_ham_features.slice(0, 10).map((word, i) => ({
    word,
    importance: 10 - i,
    type: "ham",
  }));

  return (
    <section
      id="data-visualization"
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
            Data <span className="gradient-text">Insights</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", maxWidth: 600, margin: "0 auto", fontSize: "1.05rem" }}>
            Visual analysis of the training data, model predictions, and feature importance.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {/* Pie chart — Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card"
            style={{ padding: "2rem" }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem", color: "var(--text-on-card)" }}>
              Spam vs Ham Distribution
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                  label={({ name, percent }: any) =>
                    `${name || ''} ${(((percent as number) ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {distributionData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index]}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Confusion Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card"
            style={{ padding: "2rem" }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem", color: "var(--text-on-card)" }}>
              Confusion Matrix
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr 1fr",
                gap: "0.5rem",
                maxWidth: 320,
                margin: "0 auto",
              }}
            >
              {/* Header */}
              <div />
              <div style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-on-card-secondary)", padding: "0.5rem" }}>
                Pred. Ham
              </div>
              <div style={{ textAlign: "center", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-on-card-secondary)", padding: "0.5rem" }}>
                Pred. Spam
              </div>
              {/* Row 1 */}
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-on-card-secondary)", padding: "0.5rem", display: "flex", alignItems: "center" }}>
                True Ham
              </div>
              <div
                style={{
                  background: `rgba(16, 185, 129, ${Math.min(cm[0][0] / 200, 1) * 0.3 + 0.05})`,
                  borderRadius: "var(--radius-sm)",
                  padding: "1.5rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#10b981",
                }}
              >
                {cm[0][0]}
              </div>
              <div
                style={{
                  background: `rgba(239, 68, 68, ${Math.min(cm[0][1] / 200, 1) * 0.3 + 0.05})`,
                  borderRadius: "var(--radius-sm)",
                  padding: "1.5rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: cm[0][1] > 0 ? "#ef4444" : "var(--text-muted)",
                }}
              >
                {cm[0][1]}
              </div>
              {/* Row 2 */}
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-on-card-secondary)", padding: "0.5rem", display: "flex", alignItems: "center" }}>
                True Spam
              </div>
              <div
                style={{
                  background: `rgba(239, 68, 68, ${Math.min(cm[1][0] / 200, 1) * 0.3 + 0.05})`,
                  borderRadius: "var(--radius-sm)",
                  padding: "1.5rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: cm[1][0] > 0 ? "#ef4444" : "var(--text-muted)",
                }}
              >
                {cm[1][0]}
              </div>
              <div
                style={{
                  background: `rgba(16, 185, 129, ${Math.min(cm[1][1] / 200, 1) * 0.3 + 0.05})`,
                  borderRadius: "var(--radius-sm)",
                  padding: "1.5rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#10b981",
                }}
              >
                {cm[1][1]}
              </div>
            </div>
          </motion.div>

          {/* Top Spam Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card"
            style={{ padding: "2rem" }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem", color: "var(--text-on-card)" }}>
              Top Spam Indicators
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topFeaturesData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="word"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                />
                <Bar
                  dataKey="importance"
                  fill={BAR_COLORS.spam}
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Ham Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card"
            style={{ padding: "2rem" }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1.5rem", color: "var(--text-on-card)" }}>
              Top Ham Indicators
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topHamData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis type="number" tick={{ fill: "#64748b", fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="word"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1e293b",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                />
                <Bar
                  dataKey="importance"
                  fill={BAR_COLORS.ham}
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
