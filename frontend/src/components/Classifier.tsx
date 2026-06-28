// ============================================================
// Classifier — Live spam/ham classifier with text input & results
// ============================================================

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  Send,
  Loader2,
  Shuffle,
  Download,
  Trash2,
} from "lucide-react";
import { usePredict } from "../hooks/useApi";
import { SAMPLE_SPAM_EMAILS, SAMPLE_HAM_EMAILS } from "../utils/constants";
import type { PredictionHistoryItem } from "../types";

const MAX_CHARS = 5000;

export default function Classifier() {
  const [text, setText] = useState("");
  const { predict, loading, error, result, reset } = usePredict();
  const [history, setHistory] = useState<PredictionHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem("prediction-history");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleAnalyze = useCallback(async () => {
    if (!text.trim()) return;
    const data = await predict(text.trim());
    if (data) {
      const item: PredictionHistoryItem = {
        id: Date.now().toString(),
        message: text.trim().substring(0, 100),
        prediction: data.prediction,
        confidence: data.confidence,
        timestamp: Date.now(),
      };
      const updated = [item, ...history].slice(0, 20);
      setHistory(updated);
      localStorage.setItem("prediction-history", JSON.stringify(updated));
    }
  }, [text, predict, history]);

  const handleSample = useCallback(() => {
    const all = [...SAMPLE_SPAM_EMAILS, ...SAMPLE_HAM_EMAILS];
    setText(all[Math.floor(Math.random() * all.length)]);
    reset();
  }, [reset]);

  const handleClear = useCallback(() => {
    setText("");
    reset();
  }, [reset]);

  const handleDownloadReport = useCallback(() => {
    if (!result) return;
    const report = `AI Spam Classifier — Prediction Report
========================================
Date: ${new Date().toLocaleString()}

Input Message:
${text}

Prediction: ${result.prediction}
Confidence: ${result.confidence}%
Spam Probability: ${result.spam_probability}%
Ham Probability: ${result.ham_probability}%
`;
    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spam-report-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [result, text]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem("prediction-history");
  }, []);

  return (
    <section
      id="classifier"
      className="section-padding"
      style={{ position: "relative", zIndex: 2 }}
    >
      <div className="section-container">
        {/* Section header */}
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
            Live <span className="gradient-text">Classifier</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: 600,
              margin: "0 auto",
              fontSize: "1.05rem",
            }}
          >
            Paste any email or message below and our AI will instantly classify
            it as Spam or Ham with confidence scores.
          </p>
        </motion.div>

        {/* Classifier card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card"
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "2.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Scanning animation overlay */}
          {loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: "none",
                zIndex: 3,
                overflow: "hidden",
                borderRadius: "var(--radius-lg)",
              }}
            >
              <div
                className="animate-scan-line"
                style={{
                  width: "100%",
                  height: 3,
                  background:
                    "linear-gradient(90deg, transparent, var(--accent-cyan), transparent)",
                }}
              />
            </div>
          )}

          {/* Text area */}
          <div style={{ position: "relative", marginBottom: "1.5rem" }}>
            <textarea
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) {
                  setText(e.target.value);
                  reset();
                }
              }}
              placeholder="Paste your email content here to analyze..."
              rows={6}
              style={{
                width: "100%",
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                border: "2px solid var(--bg-glass-border)",
                background: "var(--bg-card-alt)",
                color: "var(--text-on-card)",
                fontSize: "0.95rem",
                fontFamily: "var(--font-sans)",
                resize: "vertical",
                outline: "none",
                transition: "border-color 0.3s",
                lineHeight: 1.6,
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--accent-blue)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--bg-glass-border)")
              }
            />
            {/* Character counter */}
            <span
              style={{
                position: "absolute",
                bottom: 12,
                right: 16,
                fontSize: "0.75rem",
                color: text.length > MAX_CHARS * 0.9 ? "var(--accent-red)" : "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              {text.length} / {MAX_CHARS}
            </span>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            <button
              className="btn-primary"
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                flex: "1 1 200px",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Analyze Email
                </>
              )}
            </button>
            <button className="btn-secondary" onClick={handleSample} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <Shuffle size={16} />
              Try Sample
            </button>
            <button className="btn-secondary" onClick={handleClear} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <Trash2 size={16} />
              Clear
            </button>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "var(--radius-md)",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "var(--accent-red)",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
              }}
            >
              {error}
            </motion.div>
          )}

          {/* Result card */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              >
                <div
                  style={{
                    padding: "2rem",
                    borderRadius: "var(--radius-lg)",
                    background:
                      result.prediction === "Spam"
                        ? "linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(239, 68, 68, 0.15))"
                        : "linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(16, 185, 129, 0.15))",
                    border: `2px solid ${
                      result.prediction === "Spam"
                        ? "rgba(239, 68, 68, 0.3)"
                        : "rgba(16, 185, 129, 0.3)"
                    }`,
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          result.prediction === "Spam"
                            ? "rgba(239, 68, 68, 0.2)"
                            : "rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      {result.prediction === "Spam" ? (
                        <ShieldAlert
                          size={28}
                          color="var(--accent-red)"
                        />
                      ) : (
                        <ShieldCheck
                          size={28}
                          color="var(--accent-green)"
                        />
                      )}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color:
                            result.prediction === "Spam"
                              ? "var(--accent-red)"
                              : "var(--accent-green)",
                        }}
                      >
                        {result.prediction === "Spam"
                          ? "Spam Detected!"
                          : "Safe Email"}
                      </h3>
                      <p
                        style={{
                          color: "var(--text-on-card-secondary)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {result.prediction === "Spam"
                          ? "This message shows characteristics of spam or phishing content."
                          : "This message appears to be a legitimate, safe email."}
                      </p>
                    </div>
                  </div>

                  {/* Confidence bar */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--text-on-card)",
                      }}
                    >
                      <span>Confidence</span>
                      <span>{result.confidence}%</span>
                    </div>
                    <div
                      style={{
                        height: 10,
                        borderRadius: 99,
                        background: "rgba(0,0,0,0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                          height: "100%",
                          borderRadius: 99,
                          background:
                            result.prediction === "Spam"
                              ? "linear-gradient(90deg, #ef4444, #f97316)"
                              : "linear-gradient(90deg, #10b981, #06b6d4)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Probability breakdown */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(239, 68, 68, 0.08)",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "var(--accent-red)",
                        }}
                      >
                        {result.spam_probability}%
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-on-card-secondary)",
                          fontWeight: 500,
                        }}
                      >
                        Spam Probability
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius-sm)",
                        background: "rgba(16, 185, 129, 0.08)",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: 700,
                          color: "var(--accent-green)",
                        }}
                      >
                        {result.ham_probability}%
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-on-card-secondary)",
                          fontWeight: 500,
                        }}
                      >
                        Ham Probability
                      </div>
                    </div>
                  </div>

                  {/* Download report */}
                  <button
                    className="btn-secondary"
                    onClick={handleDownloadReport}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      width: "100%",
                      justifyContent: "center",
                      color: "var(--text-on-card)",
                      borderColor: result.prediction === "Spam"
                        ? "rgba(239, 68, 68, 0.3)"
                        : "rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    <Download size={16} />
                    Download Report
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Prediction History */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              maxWidth: 800,
              margin: "2rem auto 0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                Recent Predictions
              </h3>
              <button
                className="btn-secondary"
                onClick={clearHistory}
                style={{
                  fontSize: "0.8rem",
                  padding: "0.4rem 0.8rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <Trash2 size={14} />
                Clear
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {history.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="glass"
                  style={{
                    padding: "0.875rem 1.25rem",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {item.prediction === "Spam" ? (
                      <ShieldAlert size={18} color="var(--accent-red)" />
                    ) : (
                      <ShieldCheck size={18} color="var(--accent-green)" />
                    )}
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-secondary)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.message}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        padding: "0.25rem 0.75rem",
                        borderRadius: 99,
                        background:
                          item.prediction === "Spam"
                            ? "rgba(239, 68, 68, 0.15)"
                            : "rgba(16, 185, 129, 0.15)",
                        color:
                          item.prediction === "Spam"
                            ? "var(--accent-red)"
                            : "var(--accent-green)",
                      }}
                    >
                      {item.prediction} ({item.confidence}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Spin animation for loader */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  );
}
