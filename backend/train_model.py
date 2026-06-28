"""
AI Spam Email Classifier — Training Pipeline
=============================================
Generates a synthetic spam/ham dataset, trains a TF-IDF + Multinomial Naive Bayes
classifier, evaluates it, and persists both model and vectorizer to disk.
"""

import os
import json
import random
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
)
import joblib

# ---------------------------------------------------------------------------
# 1. Synthetic Dataset
# ---------------------------------------------------------------------------

SPAM_TEMPLATES = [
    "Congratulations! You've won a ${amount} gift card. Click here to claim now!",
    "URGENT: Your account has been compromised. Verify your identity immediately at {url}",
    "You have been selected for a special offer! Get {product} for FREE. Limited time only!",
    "Dear winner, you are the lucky recipient of ${amount}. Send your bank details to claim.",
    "Act now! Lose {n} pounds in {n} days with this miracle pill. Order today!",
    "ALERT: Your {bank} account will be suspended unless you update your information now.",
    "Hot singles in your area are waiting to meet you! Click here to join free.",
    "Make ${amount} per week working from home! No experience needed. Start today!",
    "Your {service} subscription is expiring. Renew now to avoid losing access: {url}",
    "FINAL WARNING: Pay your outstanding balance of ${amount} or face legal action.",
    "Exclusive deal just for you! Buy one get one free on all {product}. Shop now!",
    "You've been pre-approved for a loan of ${amount}. Low interest rates! Apply now.",
    "Free iPhone giveaway! Be one of the first 100 to register and win!",
    "Important: Your package could not be delivered. Confirm your address here: {url}",
    "Earn extra cash by completing simple surveys. Sign up now and get a ${amount} bonus!",
    "WARNING: Virus detected on your device. Download our security tool immediately.",
    "You qualify for a government grant of ${amount}. No repayment required!",
    "Limited time: Get premium {service} for 90% off. Use code SAVE90 at checkout.",
    "Attention: Your tax refund of ${amount} is pending. Submit your details now.",
    "Join millions of satisfied users! Try {product} risk-free for 30 days.",
    "Dear customer, your {bank} card ending in 4532 has unusual activity. Call us now.",
    "Double your bitcoin investment in 24 hours! Guaranteed returns. Invest now!",
    "You've received a confidential document. Sign in with your email to view it.",
    "Claim your free trial of {product} today! No credit card required.",
    "Your lottery ticket has won ${amount}! Contact our claims department immediately.",
    "Work from home and earn ${amount}/month. Join our team of successful entrepreneurs!",
    "SECURITY ALERT: Someone tried to log into your account. Reset password now.",
    "Buy cheap medications online! Up to 80% off. Fast discreet shipping.",
    "You are one step away from financial freedom! Learn our secret trading strategy.",
    "Get a diploma from a prestigious university! No classes required. Apply today.",
    "Free trial expired. Update your payment to continue using {service}.",
    "Hi, I'm a Nigerian prince and I need your help to transfer ${amount}. You'll get 30%.",
    "Your email has been selected in our annual draw! You've won a brand new car!",
    "Reduce your mortgage payments by 50%! Call now for a free consultation.",
    "Meet beautiful women from Eastern Europe. Join our dating site free today!",
    "Shocking news: Celebrity reveals weight loss secret. Doctors hate this trick!",
    "Your computer is running slow. Download our optimizer for instant speed boost!",
    "Congratulations! You're our 1,000,000th visitor. Claim your prize now!",
    "Investment opportunity: 500% returns guaranteed. Minimum investment just ${amount}.",
    "Get a free vacation to the Bahamas! Just complete a short survey to qualify.",
    "URGENT: Wire transfer of ${amount} received in your name. Confirm identity to release funds.",
    "Lose weight fast without diet or exercise! Try this one weird trick.",
    "Your {service} account has been locked. Click here to unlock: {url}",
    "Adult content: Explicit material waiting for you. Click to view now.",
    "Cheap designer watches, handbags, and shoes. 90% off retail prices!",
    "You've been chosen for an exclusive credit card with ${amount} limit. Pre-approved!",
    "Download free movies, music, and software. Unlimited access with premium membership!",
    "Get rich quick! Follow our simple 3-step system to make ${amount} weekly.",
    "Your inheritance of ${amount} is ready. Contact our lawyer to process your claim.",
    "FINAL NOTICE: Your domain name will be deleted unless you renew immediately.",
]

HAM_TEMPLATES = [
    "Hey, are you available for lunch tomorrow? I was thinking we could try that new restaurant.",
    "Just wanted to follow up on our meeting yesterday. Can you send me the notes?",
    "Happy birthday! Hope you have an amazing day. Let's celebrate this weekend!",
    "The project deadline has been extended to next Friday. Let me know if you need help.",
    "Can you review the document I shared and provide feedback by end of day?",
    "Great presentation today! The client seemed really impressed with the proposal.",
    "Don't forget about the team meeting at 3 PM. We'll discuss Q4 targets.",
    "I'll be working from home tomorrow. You can reach me on Slack or email.",
    "Thanks for your help with the report. I really appreciate it!",
    "Are we still on for coffee this afternoon? I'll be at the usual place.",
    "Just saw the news about the company merger. What do you think about it?",
    "Could you pick up some groceries on your way home? We need milk and bread.",
    "The kids' school play is next Thursday at 6 PM. Can you make it?",
    "I've attached the updated spreadsheet. Let me know if the numbers look right.",
    "Sorry I missed your call. I was in a meeting. What did you need?",
    "Reminder: your dentist appointment is tomorrow at 10 AM.",
    "The weather looks great this weekend. Want to go hiking?",
    "Congratulations on the promotion! You definitely deserved it.",
    "Can you help me move this Saturday? I'll buy pizza and beer.",
    "I finished reading that book you recommended. It was really good!",
    "Let's schedule a call to discuss the new feature requirements.",
    "The gym is offering a discount for annual memberships. Interested?",
    "I'll be on vacation next week. Sarah will handle my tasks while I'm away.",
    "Did you see the game last night? What an incredible finish!",
    "Please find attached the invoice for last month's services.",
    "The flight is confirmed for July 15th. I'll forward you the itinerary.",
    "Mom wants to know if you're coming for Thanksgiving dinner.",
    "I've submitted the code review. A few minor comments but overall looks great.",
    "Can we reschedule our 1:1 to Thursday? I have a conflict on Wednesday.",
    "The new office space looks amazing! Have you seen the rooftop terrace?",
    "Just checking in — how are you feeling? I hope you're getting better.",
    "The quarterly report is due next week. I'll need your section by Monday.",
    "Do you know any good plumbers? Our kitchen sink is leaking again.",
    "I loved the photos from your trip! Japan looks absolutely beautiful.",
    "Let's brainstorm ideas for the hackathon. I'm thinking something with AI.",
    "Reminder: team lunch is on Friday. We're going to that Italian place.",
    "I need to renew my passport. Do you know how long it takes?",
    "The code deployment went smoothly. All tests are passing in production.",
    "Can you send me the WiFi password? I'm at the office and can't connect.",
    "We should catch up soon. It's been ages since we last hung out!",
    "The AC in the conference room is broken again. I've filed a maintenance request.",
    "Thanks for the recommendation letter. It means a lot to me.",
    "I'm thinking of getting a new laptop. Any suggestions?",
    "The yoga class starts at 7 AM. Want to join me tomorrow?",
    "Just finished the sprint retrospective notes. Sharing with the team now.",
    "Your package arrived today. I left it on the kitchen counter.",
    "The neighbors are having a party this Saturday. We're invited!",
    "I updated the API documentation. Can you review the new endpoints?",
    "Movie night tonight? I was thinking we could watch that new thriller.",
    "The dog needs to go to the vet for his annual checkup. Can you take him?",
]

# Additional variety phrases to combine
SPAM_SUBJECTS = [
    "URGENT", "ACTION REQUIRED", "IMPORTANT NOTICE", "CONGRATULATIONS",
    "LIMITED TIME OFFER", "FREE", "WINNER", "ALERT", "WARNING", "FINAL NOTICE",
    "ACT NOW", "DON'T MISS OUT", "EXCLUSIVE OFFER", "VERIFY YOUR ACCOUNT",
    "SECURITY UPDATE", "CLAIM YOUR PRIZE", "SPECIAL PROMOTION",
]

HAM_SUBJECTS_ADDITIONS = [
    "Also, did you check the latest pull request?",
    "By the way, the coffee machine is fixed.",
    "PS: Don't forget to submit your timesheet.",
    "Let me know your thoughts when you get a chance.",
    "Hope your week is going well!",
    "Talk soon!",
    "Cheers!",
    "Looking forward to hearing from you.",
    "See you at the standup tomorrow.",
    "Have a great evening!",
]


def generate_dataset(n_samples: int = 2000) -> pd.DataFrame:
    """Generate a balanced synthetic spam/ham dataset."""
    random.seed(42)
    data = []
    amounts = ["100", "500", "1000", "5000", "10000", "50000", "1000000"]
    products = ["weight loss pills", "anti-aging cream", "brain supplement", "smartwatch", "VPN service"]
    services = ["Netflix", "PayPal", "Amazon", "Apple", "Microsoft", "Google"]
    banks = ["Chase", "Bank of America", "Wells Fargo", "Citibank", "HSBC"]
    urls = ["http://bit.ly/xyz123", "http://tinyurl.com/abc456", "http://secure-verify.com/login",
            "http://update-now.net/confirm", "http://prize-claim.org/winner"]

    half = n_samples // 2

    # Generate spam samples
    for _ in range(half):
        template = random.choice(SPAM_TEMPLATES)
        text = template.format(
            amount=random.choice(amounts),
            product=random.choice(products),
            service=random.choice(services),
            bank=random.choice(banks),
            url=random.choice(urls),
            n=random.randint(5, 30),
        )
        # Randomly prepend a spammy subject
        if random.random() > 0.5:
            text = random.choice(SPAM_SUBJECTS) + "! " + text
        data.append({"message": text, "label": "spam"})

    # Generate ham samples
    for _ in range(half):
        template = random.choice(HAM_TEMPLATES)
        # Randomly append a casual closing
        if random.random() > 0.5:
            template += " " + random.choice(HAM_SUBJECTS_ADDITIONS)
        data.append({"message": template, "label": "ham"})

    return pd.DataFrame(data).sample(frac=1, random_state=42).reset_index(drop=True)


# ---------------------------------------------------------------------------
# 2. Text Preprocessing
# ---------------------------------------------------------------------------

import re

def clean_text(text: str) -> str:
    """Basic text cleaning for NLP."""
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", "", text)       # remove URLs
    text = re.sub(r"[^a-zA-Z\s]", "", text)           # remove non-alpha chars
    text = re.sub(r"\s+", " ", text).strip()           # collapse whitespace
    return text


# ---------------------------------------------------------------------------
# 3. Training Pipeline
# ---------------------------------------------------------------------------

def train() -> dict:
    """Full training pipeline. Returns metrics dict."""
    print("=" * 60)
    print("  AI Spam Classifier — Training Pipeline")
    print("=" * 60)

    # --- Generate / load data ---
    print("\n[1/6] Generating synthetic dataset...")
    df = generate_dataset(2000)
    os.makedirs("data", exist_ok=True)
    df.to_csv("data/spam.csv", index=False)
    print(f"  -> {len(df)} samples ({df['label'].value_counts().to_dict()})")

    # --- Preprocess ---
    print("\n[2/6] Cleaning text...")
    df["clean"] = df["message"].apply(clean_text)

    # --- Split ---
    print("\n[3/6] Splitting train/test (80/20)...")
    X_train, X_test, y_train, y_test = train_test_split(
        df["clean"], df["label"], test_size=0.2, random_state=42, stratify=df["label"]
    )
    print(f"  -> Train: {len(X_train)}, Test: {len(X_test)}")

    # --- Vectorize ---
    print("\n[4/6] TF-IDF vectorization...")
    vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2), stop_words="english")
    X_train_tfidf = vectorizer.fit_transform(X_train)
    X_test_tfidf = vectorizer.transform(X_test)
    print(f"  -> Vocabulary size: {len(vectorizer.vocabulary_)}")

    # --- Train ---
    print("\n[5/6] Training Multinomial Naive Bayes...")
    model = MultinomialNB(alpha=0.1)
    model.fit(X_train_tfidf, y_train)

    # --- Evaluate ---
    print("\n[6/6] Evaluating model...")
    y_pred = model.predict(X_test_tfidf)
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred, pos_label="spam")
    rec = recall_score(y_test, y_pred, pos_label="spam")
    f1 = f1_score(y_test, y_pred, pos_label="spam")
    cm = confusion_matrix(y_test, y_pred, labels=["ham", "spam"]).tolist()

    # Top features per class
    feature_names = vectorizer.get_feature_names_out()
    spam_idx = list(model.classes_).index("spam")
    ham_idx = list(model.classes_).index("ham")
    top_spam_features = [
        feature_names[i]
        for i in np.argsort(model.feature_log_prob_[spam_idx])[-15:][::-1]
    ]
    top_ham_features = [
        feature_names[i]
        for i in np.argsort(model.feature_log_prob_[ham_idx])[-15:][::-1]
    ]

    metrics = {
        "accuracy": round(acc, 4),
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "f1_score": round(f1, 4),
        "confusion_matrix": cm,
        "class_distribution": df["label"].value_counts().to_dict(),
        "train_size": len(X_train),
        "test_size": len(X_test),
        "vocabulary_size": len(vectorizer.vocabulary_),
        "top_spam_features": top_spam_features,
        "top_ham_features": top_ham_features,
    }

    print(f"\n  Accuracy:  {acc:.4f}")
    print(f"  Precision: {prec:.4f}")
    print(f"  Recall:    {rec:.4f}")
    print(f"  F1 Score:  {f1:.4f}")
    print(f"  Confusion Matrix: {cm}")

    # --- Save ---
    os.makedirs("models", exist_ok=True)
    joblib.dump(model, "models/model.pkl")
    joblib.dump(vectorizer, "models/vectorizer.pkl")
    with open("models/metrics.json", "w") as f:
        json.dump(metrics, f, indent=2)

    print("\n[OK] Model and vectorizer saved to models/")
    print("[OK] Metrics saved to models/metrics.json")
    print("=" * 60)

    return metrics


if __name__ == "__main__":
    train()
