// ============================================================
// useApi — Fetch wrapper for backend API calls
// ============================================================

import { useState, useCallback } from "react";
import { API_BASE_URL } from "../utils/constants";
import type { PredictionResult, ModelMetrics } from "../types";

export function usePredict() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const predict = useCallback(async (message: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${API_BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Server error (${res.status})`);
      }
      const data: PredictionResult = await res.json();
      setResult(data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { predict, loading, error, result, reset };
}

export function useMetrics() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<ModelMetrics | null>(null);

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/metrics`);
      if (!res.ok) {
        throw new Error(`Failed to fetch metrics (${res.status})`);
      }
      const data: ModelMetrics = await res.json();
      setMetrics(data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchMetrics, loading, error, metrics };
}
