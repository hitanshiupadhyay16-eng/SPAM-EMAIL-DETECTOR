// ============================================================
// TypeScript interfaces for the AI Spam Email Classifier
// ============================================================

export interface PredictionResult {
  prediction: "Spam" | "Ham";
  confidence: number;
  spam_probability: number;
  ham_probability: number;
}

export interface PredictionHistoryItem {
  id: string;
  message: string;
  prediction: "Spam" | "Ham";
  confidence: number;
  timestamp: number;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  confusion_matrix: number[][];
  class_distribution: { spam: number; ham: number };
  train_size: number;
  test_size: number;
  vocabulary_size: number;
  top_spam_features: string[];
  top_ham_features: string[];
}

export type Theme = "dark" | "light";
