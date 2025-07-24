<div align="center">

# 🚀 AI Resume Analyzer & Job Matcher

## A cutting-edge career tool that transforms the job application process from a guessing game into a data-driven strategy.

This application leverages the power of Large Language Models to provide job seekers with instant, intelligent, and actionable feedback, helping them stand out in a competitive market.

[➡️ View the Live Demo](https://resumeanalyzerbykarthikeya.netlify.app/)
</div>
<h6 align="center">The modern, animated results screen for the Job Matcher feature.</h6>

# 🎯 The Problem & The Solution

In today's job market, applicants face three critical challenges:
1.  **Resume Uncertainty:** Is my resume good enough? What are its weak points?
2.  **Tailoring Fatigue:** Manually customizing a resume for every single job application is tedious and time-consuming.
3.  **The "ATS Black Box":** Will my resume be correctly read by automated screening systems?

This project directly addresses these pain points by offering a sophisticated, user-friendly platform that acts as a personal career coach. It provides both a general "health check" for a resume and a powerful tool to precisely align it with a specific job description, ensuring every application is as strong as it can be.

# ✨ Core Features

This application is built with a focus on providing a seamless and powerful user experience.

#### **1. AI-Powered Resume Grader**
* Upload any PDF resume for a comprehensive analysis.
* Receives an overall score on a 1-10 scale, providing a simple benchmark of quality.
* The AI identifies areas for improvement and suggests relevant skills to add, helping users strengthen their profile.

#### **2. Dynamic Job Description Matcher**
* Paste any job description and upload a resume to see how well they align.
* Get a precise **match score (1-100%)** that quantifies the fit between the resume and the role.
* The AI extracts **missing keywords** from the job description that should be included in the resume.
* Receive **actionable, tailored suggestions** on how to rephrase bullet points, highlight specific projects, and align the summary with the employer's needs.

#### **3. Interactive & Animated UI/UX**
* The interface is built with **React** and **Framer Motion** to deliver a fluid, engaging experience.
* Results are displayed in a stylish, modern modal with animations that guide the user's eye, including an animated score counter and staggered list reveals.
* The UI is fully responsive and designed for a clean, professional aesthetic.

#### **4. Persistent Analysis History with CRUD**
* All general resume analyses are automatically saved to a **Supabase** backend.
* Users can review, revisit, and compare their past analysis reports in the "Resume History" tab.
* A fully functional **delete** operation allows users to manage their history, with changes reflected instantly on the frontend and persisted in the backend database.

# 🛠️ Technical Architecture & Workflow

The project is built on a modern, serverless architecture that is efficient, scalable, and secure.

#### **Data Flow Diagram**
```

[User] --(1. Upload PDF & JD)--\> [React Frontend]
^                                     |
|                               (2. Extract Text w/ PDF.js)
|                                     |
(6. Display Results) \<------------------ V
|                         [Google Gemini API] \<--(3. Send Prompt)-- [Service Logic]
|                                     |
[Supabase Backend] \<--(5. Save History)--|--(4. Receive JSON)

````

#### **Technology Breakdown**

* **Frontend (React & Vite):** A modern, fast, and scalable foundation for the user interface.
* **AI Engine (Google Gemini 1.5 Flash):** Chosen for its powerful instruction-following capabilities and its ability to return structured, reliable JSON output, which is crucial for parsing and displaying the analysis results.
* **Backend & Database (Supabase):** Acts as a complete backend-as-a-service. It provides the PostgreSQL database, authentication, and instant APIs. **Row Level Security (RLS)** is implemented to ensure data operations (select, insert, delete) are properly permissioned.
* **PDF Parsing (PDF.js):** Text extraction is handled entirely on the client-side for speed and privacy. This avoids the need to upload and store sensitive user files on a server.
* **Deployment (Netlify):** Connected via GitHub for seamless Continuous Integration and Continuous Deployment (CI/CD). Environment variables are managed securely through the Netlify UI.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/22e9f843-1df5-4fc7-b586-4fe2b80e6080" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/a1d8d8ab-15fa-480c-9e77-75d5682cd302" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/4d2d9a14-d0cd-47e5-8078-c78c8ccf6273" />
<img width="1919" height="1077" alt="image" src="https://github.com/user-attachments/assets/7fdb12ce-227f-475d-a573-93f6f0fb80ab" />
<img width="1917" height="1075" alt="image" src="https://github.com/user-attachments/assets/f13eedc2-d303-4e77-875b-bc2cf8c37ca9" />

# 🔧 Challenges & Learnings

Building this project involved overcoming several technical challenges, leading to significant learning:

1.  **Ensuring Consistent AI Output:** Early versions struggled with the AI occasionally returning conversational text instead of a strict JSON object. This was solved through **advanced prompt engineering**, where the instructions were refined to be extremely explicit about the required output format, dramatically increasing reliability.
2.  **Robust Asynchronous Logic:** The multi-step analysis process (upload -> extract -> analyze -> display) required careful management of asynchronous operations, loading states, and error handling to ensure the UI remained responsive and provided clear feedback to the user at every stage.
3.  **Client-Side Worker Configuration:** A key bug involved the PDF.js web worker failing to load in Vite's development environment. This was resolved by using the correct `?url` import suffix, a Vite-specific solution for loading assets as URLs, ensuring the PDF parsing works flawlessly.

# 🚀 Local Development Setup

To run this project on your own machine, follow these steps:

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/karthikeyabommireddy/resume_analyzer_using_gemini_api.git
    cd resume_analyzer_using_gemini_api
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the project root and populate it with your API keys:
    ```
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    VITE_GEMINI_API_KEY=your_google_gemini_api_key
    ```

4.  **Run the Application**
    ```bash
    npm run dev
    ```
    Navigate to `http://localhost:5173` in your browser.

# ✍️ Author

**Karthikeya Reddy Bommireddy**

 [**GitHub**](https://github.com/karthikeyabommireddy)
 
 [**LinkedIn**](https://www.linkedin.com/in/karthikeya-reddy-bommireddy/)
