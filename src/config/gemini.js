import { GoogleGenerativeAI } from '@google/generative-ai'

// Using the new API key with gemini-2.5-flash model
const API_KEY = 'AIzaSyCAKsZ-UjRl7s5yuo4RaRGHFsCKD6xeBAU';
const genAI = new GoogleGenerativeAI(API_KEY)

// Using gemini-2.5-flash (the correct model name for the newer API)
export const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })