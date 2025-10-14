import { model } from '../config/gemini.js'

// export const analyzeResumeText = async (resumeText) => {
//   const prompt = `
// You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure, and all fields must be populated. Do not include any text or markdown formatting before or after the JSON object.

// Resume Text:
// """
// ${resumeText}
// """

// JSON Structure:
// {
//   "name": "string | null",
//   "email": "string | null", 
//   "phone": "string | null",
//   "linkedin_url": "string | null",
//   "portfolio_url": "string | null",
//   "summary": "string | null",
//   "work_experience": [
//     {
//       "company": "string",
//       "position": "string", 
//       "duration": "string",
//       "description": "string"
//     }
//   ],
//   "education": [
//     {
//       "institution": "string",
//       "degree": "string",
//       "duration": "string",
//       "details": "string"
//     }
//   ],
//   "technical_skills": ["string"],
//   "soft_skills": ["string"],
//   "projects": [
//     {
//       "name": "string",
//       "description": "string",
//       "technologies": ["string"]
//     }
//   ],
//   "certifications": ["string"],
//   "resume_rating": 5,
//   "improvement_areas": ["string"],
//   "upskill_suggestions": ["string"]
// }

// Important: 
// - Provide a resume_rating between 1-10 based on completeness, relevance, and presentation.
// - Include 3-5 specific improvement_areas.
// - Suggest 3-5 upskill_suggestions based on current market trends.
// - If information is missing, use null or empty arrays as appropriate.
// - Do not include any explanatory text, only return the JSON object.
// `

//   try {
//     const result = await model.generateContent(prompt)
//     const response = await result.response
//     const text = response.text()

//     // Clean the response to ensure it's valid JSON
//     const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()

//     const resultObj = JSON.parse(cleanedText)
//     // Ensure resume_rating is in 1-10 range
//     if (typeof resultObj.resume_rating === 'number') {
//       if (resultObj.resume_rating < 1) resultObj.resume_rating = 1
//       if (resultObj.resume_rating > 10) resultObj.resume_rating = 10
//     } else {
//       resultObj.resume_rating = 5 // default if missing
//     }
//     return resultObj
//   } catch (error) {
//     console.error('Error analyzing resume:', error)
//     throw new Error('Failed to analyze resume. Please try again.')
//   }
// }

// export const analyzeResumeText = async (resumeText) => {
//   // --- TEMPORARY TEST ---
//   // We're using a simple string instead of the resume text to test the API call.
//   const testResumeText = "My name is John Doe and I am a software engineer with 5 years of experience in React and Node.js.";

//   const prompt = `
// You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure, and all fields must be populated. Do not include any text or markdown formatting before or after the JSON object.

// Resume Text:
// """
// ${testResumeText}
// """

// JSON Structure:
// {
//   "name": "string | null",
//   "email": "string | null",
//   "phone": "string | null",
//   "linkedin_url": "string | null",
//   "portfolio_url": "string | null",
//   "summary": "string | null",
//   "work_experience": [
//     {
//       "company": "string",
//       "position": "string",
//       "duration": "string",
//       "description": "string"
//     }
//   ],
//   "education": [
//     {
//       "institution": "string",
//       "degree": "string",
//       "duration": "string",
//       "details": "string"
//     }
//   ],
//   "technical_skills": ["string"],
//   "soft_skills": ["string"],
//   "projects": [
//     {
//       "name": "string",
//       "description": "string",
//       "technologies": ["string"]
//     }
//   ],
//   "certifications": ["string"],
//   "resume_rating": 5,
//   "improvement_areas": ["string"],
//   "upskill_suggestions": ["string"]
// }

// Important:
// - Provide a resume_rating between 1-10 based on completeness, relevance, and presentation
// - Include 3-5 specific improvement_areas
// - Suggest 3-5 upskill_suggestions based on current market trends
// - If information is missing, use null or empty arrays as appropriate
// - Do not include any explanatory text, only return the JSON object
// `

//   try {
//     const result = await model.generateContent(prompt)
//     const response = await result.response
//     const text = response.text()

//     // Clean the response to ensure it's valid JSON
//     const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()

//     const resultObj = JSON.parse(cleanedText)
//     // Ensure resume_rating is in 1-10 range
//     if (typeof resultObj.resume_rating === 'number') {
//       if (resultObj.resume_rating < 1) resultObj.resume_rating = 1
//       if (resultObj.resume_rating > 10) resultObj.resume_rating = 10
//     } else {
//       resultObj.resume_rating = 5 // default if missing
//     }
//     return resultObj
//   } catch (error) {
//     console.error('Error analyzing resume:', error)
//     throw new Error('Failed to analyze resume. Please try again.')
//   }
// }

export const analyzeResumeText = async (resumeText) => {
  const prompt = `
You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure, and all fields must be populated. Do not include any text or markdown formatting before or after the JSON object.

Resume Text:
"""
${resumeText}
"""

JSON Structure:
{
  "name": "string | null",
  "email": "string | null",
  "phone": "string | null",
  "linkedin_url": "string | null",
  "portfolio_url": "string | null",
  "summary": "string | null",
  "work_experience": [
    {
      "company": "string",
      "position": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "duration": "string",
      "details": "string"
    }
  ],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["string"]
    }
  ],
  "certifications": ["string"],
  "resume_rating": 5,
  "improvement_areas": ["string"],
  "upskill_suggestions": ["string"]
}

Important:
- Provide a resume_rating between 1-10 based on completeness, relevance, and presentation
- Include 3-5 specific improvement_areas
- Suggest 3-5 upskill_suggestions based on current market trends
- If information is missing, use null or empty arrays as appropriate
- Do not include any explanatory text, only return the JSON object
`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean the response to ensure it's valid JSON
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()

    const resultObj = JSON.parse(cleanedText)
    // Ensure resume_rating is in 1-10 range
    if (typeof resultObj.resume_rating === 'number') {
      if (resultObj.resume_rating < 1) resultObj.resume_rating = 1
      if (resultObj.resume_rating > 10) resultObj.resume_rating = 10
    } else {
      resultObj.resume_rating = 5 // default if missing
    }
    return resultObj
  } catch (error) {
    console.error('Error analyzing resume:', error)
    throw new Error('Failed to analyze resume. Please try again.')
  }
}

export const saveResumeAnalysis = async (fileName, analysisData) => {
  try {
    // Get existing resumes from localStorage
    const existingResumes = JSON.parse(localStorage.getItem('resumeHistory') || '[]');
    
    // Create new resume entry with timestamp and unique ID
    const newResume = {
      id: Date.now().toString(),
      file_name: fileName,
      name: analysisData.name,
      email: analysisData.email,
      phone: analysisData.phone,
      linkedin_url: analysisData.linkedin_url,
      portfolio_url: analysisData.portfolio_url,
      summary: analysisData.summary,
      work_experience: analysisData.work_experience,
      education: analysisData.education,
      technical_skills: analysisData.technical_skills,
      soft_skills: analysisData.soft_skills,
      projects: analysisData.projects,
      certifications: analysisData.certifications,
      resume_rating: analysisData.resume_rating,
      improvement_areas: analysisData.improvement_areas,
      upskill_suggestions: analysisData.upskill_suggestions,
      uploaded_at: new Date().toISOString()
    };
    
    // Add to beginning of array (most recent first)
    existingResumes.unshift(newResume);
    
    // Save back to localStorage
    localStorage.setItem('resumeHistory', JSON.stringify(existingResumes));
    
    return newResume;
  } catch (error) {
    console.error('Error saving resume analysis:', error)
    throw new Error('Failed to save resume analysis.')
  }
}

export const getAllResumes = async () => {
  try {
    const resumes = JSON.parse(localStorage.getItem('resumeHistory') || '[]');
    return resumes;
  } catch (error) {
    console.error('Error fetching resumes:', error)
    throw new Error('Failed to fetch resumes.')
  }
}

// ... (keep the other functions)

export const analyzeResumeWithJobDescription = async (resumeText, jobDescription) => {
  const prompt = `
You are an expert career coach. Analyze the provided resume against the given job description.
Provide a detailed analysis in a valid JSON object. Your entire response must be only the JSON object, with no extra text, commentary, or markdown formatting like \`\`\`json.

Resume Text:
"""
${resumeText}
"""

Job Description:
"""
${jobDescription}
"""

JSON Structure:
{
  "match_score": 85,
  "missing_keywords": ["string"],
  "tailoring_suggestions": ["string"],
  "final_summary": "string"
}

Important:
- Provide a match_score between 1-100.
- Identify 3-5 critical missing_keywords from the job description that are absent in the resume.
- Provide 3-5 actionable tailoring_suggestions to improve the resume for this specific job.
- Give a final_summary of the candidate's fit for the role.
- Your entire response must be the JSON object and nothing else.
`
  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
    const resultObj = JSON.parse(cleanedText);

    // Return the direct result from the AI
    return resultObj;

  } catch (error) {
    console.error('Error analyzing resume with job description:', error)
    throw new Error(`Failed to analyze. Please check the console for the raw AI response. Error: ${error.message}`)
  }
}

// ... (keep all existing functions)

export const deleteResumeAnalysis = async (resumeId) => {
  try {
    // Get existing resumes from localStorage
    const existingResumes = JSON.parse(localStorage.getItem('resumeHistory') || '[]');
    
    // Filter out the resume with the given ID
    const updatedResumes = existingResumes.filter(resume => resume.id !== resumeId);
    
    // Save back to localStorage
    localStorage.setItem('resumeHistory', JSON.stringify(updatedResumes));
    
    return true; // Return true on success
  } catch (error) {
    console.error('Error deleting resume analysis:', error);
    throw new Error('Failed to delete resume analysis.');
  }
}