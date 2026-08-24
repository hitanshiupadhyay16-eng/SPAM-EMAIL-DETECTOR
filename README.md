# 📧 AI Spam Email Detector

An AI-powered web application that classifies emails as **Spam** or **Not Spam** using Machine Learning.

The project provides a web-based interface where users can enter email content and receive a classification result from a trained machine learning model.

## 🚀 Features

* 📧 Spam and non-spam email classification
* 🤖 Machine Learning-based prediction
* 🌐 Flask backend
* 🔄 Frontend-backend integration using REST APIs
* ⚡ Fast prediction using a pre-trained model
* 📊 Data processing using Pandas and NumPy
* 💾 Model persistence using Joblib

## 🛠️ Tech Stack

* **Programming:** Python
* **Machine Learning:** Scikit-learn
* **Backend:** Flask, Flask-CORS
* **Data Processing:** Pandas, NumPy
* **Model Persistence:** Joblib
* **Frontend:** HTML, CSS, JavaScript

## 🧠 Machine Learning Workflow

**Email Input → Text Processing → Trained ML Model → Prediction → Spam / Not Spam**

The model is trained using email data and saved for later use. The Flask application loads the trained model and provides predictions through the web interface.

## 📁 Project Structure

```text
SPAM-EMAIL-DETECTOR/
│
├── backend/
│   ├── data/
│   │   └── dataset files
│   │
│   ├── models/
│   │   └── trained model files
│   │
│   ├── app.py
│   ├── train_model.py
│   └── requirements.txt
│
├── frontend/
│   └── frontend files
│
└── README.md
```

## 💻 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/hitanshiupadhyay16-eng/SPAM-EMAIL-DETECTOR.git
cd SPAM-EMAIL-DETECTOR
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 3. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 4. Run the application

```bash
python app.py
```

Then open the local Flask URL shown in the terminal.

## 🎯 Objective

The goal of this project is to demonstrate how Machine Learning can be used to automatically identify unwanted or spam emails and provide predictions through a simple web application.

## 📚 Key Learning Outcomes

* Machine Learning classification
* Data preprocessing
* Working with Scikit-learn
* Model training and prediction
* Model persistence using Joblib
* Building Flask APIs
* Connecting a machine learning model with a web interface
* Frontend-backend integration

## 🔮 Future Improvements

* Improve classification accuracy with larger datasets
* Add more advanced text preprocessing
* Compare multiple ML algorithms
* Add prediction confidence scores
* Deploy the application online

## 👩‍💻 Author

**Hitanshi Upadhyay**

B.Tech — Artificial Intelligence & Machine Learning

GitHub: [hitanshiupadhyay16-eng](https://github.com/hitanshiupadhyay16-eng)
