// ============================================================
// Constants — sample emails, config, color palette
// ============================================================

export const API_BASE_URL = "http://localhost:5000";

export const SAMPLE_SPAM_EMAILS = [
  "URGENT! You have been selected for a $1,000,000 prize! Click here to claim NOW before it expires. Send your bank details immediately.",
  "Congratulations! Your email has won a free iPhone 15 Pro Max in our annual lottery. Click the link to verify and claim your prize today!",
  "WARNING: Your PayPal account has been compromised. Verify your identity immediately at http://secure-paypal-update.com or your funds will be frozen.",
  "Make $5000 per week from home! No experience needed. This secret system has made thousands of people rich. Start today for FREE!",
  "Dear winner, you have inherited $3,500,000 from a deceased relative in Nigeria. Please send your full name, address, and bank account details to process the transfer.",
  "FINAL WARNING: Your Netflix subscription will be cancelled in 24 hours unless you update your payment information now. Click here to avoid interruption.",
];

export const SAMPLE_HAM_EMAILS = [
  "Hey, are you free for lunch tomorrow? I was thinking we could check out that new Italian place downtown. Let me know!",
  "Hi team, just a reminder that the project deadline has been moved to next Friday. Please update your tasks accordingly. Thanks!",
  "Thanks for the great presentation yesterday! The client was really impressed with the proposal. Let's discuss next steps in our 1:1.",
  "Don't forget about Mom's birthday this weekend. I was thinking we could get her those flowers she likes. What do you think?",
  "The code review looks good overall. Just a few minor suggestions on the error handling in the API module. Can you take a look?",
  "I'll be working from home tomorrow. You can reach me on Slack or email if anything urgent comes up. See you Wednesday!",
];

export const FEATURES = [
  {
    title: "Lightning Fast",
    description: "Real-time email analysis with sub-second prediction latency powered by optimized ML inference.",
    icon: "Zap" as const,
  },
  {
    title: "ML Powered",
    description: "Trained on thousands of emails using TF-IDF vectorization and Multinomial Naive Bayes classification.",
    icon: "Brain" as const,
  },
  {
    title: "High Accuracy",
    description: "Achieves exceptional precision and recall scores with robust generalization on unseen data.",
    icon: "Target" as const,
  },
  {
    title: "Secure Processing",
    description: "All analysis runs locally on your server. No email data is stored or transmitted to third parties.",
    icon: "ShieldCheck" as const,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Input Email",
    description: "Paste or type the email content you want to analyze into the classifier text area.",
    icon: "Mail" as const,
  },
  {
    step: 2,
    title: "Text Cleaning",
    description: "The system preprocesses the text: lowercasing, removing URLs, punctuation, and stopwords.",
    icon: "Sparkles" as const,
  },
  {
    step: 3,
    title: "TF-IDF Extraction",
    description: "Term Frequency-Inverse Document Frequency converts cleaned text into numerical feature vectors.",
    icon: "BarChart3" as const,
  },
  {
    step: 4,
    title: "NB Classification",
    description: "Multinomial Naive Bayes calculates posterior probabilities to classify the email as Spam or Ham.",
    icon: "Cpu" as const,
  },
];
