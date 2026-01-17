import { GoogleGenerativeAI } from '@google/generative-ai'

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY)

// Using gemini-2.5-flash (the correct model name for the newer API)
export const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
