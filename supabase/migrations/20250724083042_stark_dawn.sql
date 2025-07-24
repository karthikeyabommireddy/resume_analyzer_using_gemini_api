/*
  # Create resumes table for Resume Analyzer

  1. New Tables
    - `resumes`
      - `id` (uuid, primary key)
      - `file_name` (text) - Original PDF filename
      - `name` (text) - Candidate name extracted from resume
      - `email` (text) - Contact email
      - `phone` (text) - Phone number
      - `linkedin_url` (text) - LinkedIn profile URL
      - `portfolio_url` (text) - Portfolio website URL
      - `summary` (text) - Professional summary
      - `work_experience` (jsonb) - Array of work experience objects
      - `education` (jsonb) - Array of education objects
      - `technical_skills` (jsonb) - Array of technical skills
      - `soft_skills` (jsonb) - Array of soft skills
      - `projects` (jsonb) - Array of project objects
      - `certifications` (jsonb) - Array of certifications
      - `resume_rating` (integer) - AI-generated rating (1-10)
      - `improvement_areas` (jsonb) - Array of improvement suggestions
      - `upskill_suggestions` (jsonb) - Array of upskilling recommendations
      - `uploaded_at` (timestamp) - When the resume was uploaded

  2. Security
    - Enable RLS on `resumes` table
    - Add policy for public read access (since no authentication required)
    - Add policy for public insert access
*/

CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  name text,
  email text,
  phone text,
  linkedin_url text,
  portfolio_url text,
  summary text,
  work_experience jsonb DEFAULT '[]'::jsonb,
  education jsonb DEFAULT '[]'::jsonb,
  technical_skills jsonb DEFAULT '[]'::jsonb,
  soft_skills jsonb DEFAULT '[]'::jsonb,
  projects jsonb DEFAULT '[]'::jsonb,
  certifications jsonb DEFAULT '[]'::jsonb,
  resume_rating integer DEFAULT 0,
  improvement_areas jsonb DEFAULT '[]'::jsonb,
  upskill_suggestions jsonb DEFAULT '[]'::jsonb,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all resumes
CREATE POLICY "Allow public read access"
  ON resumes
  FOR SELECT
  TO public
  USING (true);

-- Allow public insert access for new resume uploads
CREATE POLICY "Allow public insert access"
  ON resumes
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for faster queries on upload date
CREATE INDEX IF NOT EXISTS idx_resumes_uploaded_at ON resumes(uploaded_at DESC);