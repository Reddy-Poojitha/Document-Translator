The AI-Driven English to Telugu Document Translator is an NLP-based system that translates English documents into Telugu using the Google Gemini Flash API. The system improves translation accuracy through automatic domain detection and ensures privacy by applying sensitive entity masking before AI processing.

It supports translation, simplified explanation generation, and domain-aware terminology handling for documents such as banking, legal, academic, and government notices.

🚀 Features
🌐 English → Telugu document translation
🧠 Automatic domain classification (Banking, Legal, Education, General)
🔐 Privacy-preserving masking of sensitive entities
🏷️ Placeholder-based entity restoration after translation
✍️ Simplified Telugu explanation mode
📄 Supports structured document translation
⚡ Powered by Google Gemini Flash API
🧩 Markdown cleaning and formatting preservation
🧠 System Workflow
Document Upload
      ↓
Text Extraction
      ↓
Domain Detection
      ↓
Sensitive Entity Masking
      ↓
Gemini Translation API Call
      ↓
Markdown Cleaning
      ↓
Entity Restoration
      ↓
Final Telugu Output
🏗️ Project Architecture
Frontend (Upload Interface)
        ↓
Backend Processing Pipeline
        ↓
Domain Detection Model
        ↓
Entity Masking Module
        ↓
Gemini API Integration
        ↓
Translation + Explanation Engine
        ↓
Output Rendering
🔐 Privacy Protection Strategy

Sensitive information such as:

Account numbers
Dates
Phone numbers
Email IDs
Monetary values

is replaced with placeholders before sending text to Gemini:

Example:

Original:
Transfer ₹5000 to account 1234567890 before 25/06/2026

Masked:
Transfer <AMOUNT_1> to account <ACCOUNT_1> before <DATE_1>

After translation, placeholders are restored securely.

This ensures privacy-preserving NLP processing.

🧪 Domain Detection Model

The system automatically classifies documents into domains such as:

Banking
Legal
Education
Government
General

This enables domain-aware prompt engineering for improved translation accuracy.

⚙️ Tech Stack

Languages

Python

Libraries

Regex
JSON
dotenv

AI Model

Google Gemini 2.5 Flash API

NLP Techniques

Domain Classification
Entity Masking
Placeholder Restoration
Prompt Engineering
📊 Evaluation Metrics

System performance evaluated using:

Domain classification accuracy
Entity restoration accuracy
Manual translation quality validation
BLEU score comparison with reference translations
📂 Project Structure
project/
│
├── backend/
│   ├── translator.py
│   ├── masking.py
│   ├── domain_classifier.py
│
├── frontend/
│
├── .env
├── requirements.txt
└── README.md
▶️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/yourusername/document-translator.git
cd document-translator
2️⃣ Install Dependencies
pip install -r requirements.txt
3️⃣ Add Gemini API Keys

Create .env file:

GEMINI_TRANSLATE_KEY=your_api_key
GEMINI_SIMPLIFY_KEY=your_api_key
4️⃣ Run Project
python app.py

🎯 Applications
Government document translation
Banking notices
Legal agreements
Academic circulars
Multilingual accessibility system

🌱 Future Enhancements
Support for multiple Indian languages
Speech-to-text document translation
OCR support for scanned PDFs
Web deployment using MERN stack
Translation confidence scoring
