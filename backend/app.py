"""
AI Spam Email Classifier — Flask API
=====================================
REST API exposing prediction, metrics, training, and health endpoints.
"""

import os
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# ---------------------------------------------------------------------------
# Globals — loaded on startup
# ---------------------------------------------------------------------------
MODEL_PATH = os.path.join("models", "model.pkl")
VECTORIZER_PATH = os.path.join("models", "vectorizer.pkl")
METRICS_PATH = os.path.join("models", "metrics.json")

model = None
vectorizer = None
metrics = None


def load_model():
    """Load the trained model, vectorizer, and cached metrics from disk."""
    global model, vectorizer, metrics
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        model = joblib.load(MODEL_PATH)
        vectorizer = joblib.load(VECTORIZER_PATH)
        print("[OK] Model and vectorizer loaded.")
    else:
        print("[WARN]  No trained model found. Train one via POST /train.")

    if os.path.exists(METRICS_PATH):
        with open(METRICS_PATH) as f:
            metrics = json.load(f)
        print("[OK] Metrics loaded.")


def clean_text(text: str) -> str:
    """Mirror the same preprocessing used during training."""
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/health", methods=["GET"])
def health():
    """Health-check endpoint."""
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
    })


@app.route("/predict", methods=["POST"])
def predict():
    """
    Predict whether a message is Spam or Ham.

    Request body:
        { "message": "email text" }

    Response:
        { "prediction": "Spam" | "Ham",
          "confidence": float,
          "spam_probability": float,
          "ham_probability": float }
    """
    if model is None or vectorizer is None:
        return jsonify({"error": "Model not trained yet. POST /train first."}), 503

    data = request.get_json(silent=True)
    if not data or "message" not in data:
        return jsonify({"error": "Missing 'message' in request body."}), 400

    message = data["message"].strip()
    if not message:
        return jsonify({"error": "Message cannot be empty."}), 400

    cleaned = clean_text(message)
    features = vectorizer.transform([cleaned])
    prediction = model.predict(features)[0]
    probabilities = model.predict_proba(features)[0]

    # Map class indices
    class_list = list(model.classes_)
    spam_idx = class_list.index("spam")
    ham_idx = class_list.index("ham")

    spam_prob = round(float(probabilities[spam_idx]) * 100, 2)
    ham_prob = round(float(probabilities[ham_idx]) * 100, 2)
    confidence = max(spam_prob, ham_prob)

    return jsonify({
        "prediction": "Spam" if prediction == "spam" else "Ham",
        "confidence": confidence,
        "spam_probability": spam_prob,
        "ham_probability": ham_prob,
    })


@app.route("/metrics", methods=["GET"])
def get_metrics():
    """Return cached model evaluation metrics."""
    if metrics is None:
        return jsonify({"error": "No metrics available. Train the model first."}), 503
    return jsonify(metrics)


@app.route("/train", methods=["POST"])
def train_model_endpoint():
    """Retrain the model from the synthetic dataset."""
    try:
        from train_model import train as run_training
        global model, vectorizer, metrics

        result = run_training()
        # Reload freshly trained artefacts
        load_model()

        return jsonify({
            "status": "success",
            "message": "Model trained successfully.",
            "metrics": result,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------------------------------------------------------------------
# Startup
# ---------------------------------------------------------------------------

load_model()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
