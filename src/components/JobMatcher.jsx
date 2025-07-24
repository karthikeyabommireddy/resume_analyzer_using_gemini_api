import { useState, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'
import { analyzeResumeWithJobDescription } from '../services/resumeService.js'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

const JobMatcher = ({ onAnalysisComplete }) => {
  const [jobDescription, setJobDescription] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
        setFileName(files[0].name);
        handleAnalysis(files[0]);
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
        setFileName(file.name);
        handleAnalysis(file);
    }
  }

  const extractTextFromPDF = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target.result)
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise
          let textContent = ''
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)
            const text = await page.getTextContent()
            textContent += text.items.map(item => item.str).join(' ') + '\n'
          }
          resolve(textContent)
        } catch (error) {
          reject(error)
        }
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  }

  const handleAnalysis = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.')
      return
    }
    if (!jobDescription.trim()) {
      alert('Please paste a job description first.')
      // This is the fix: reset the file input and name
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      setFileName('');
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)

    try {
      setAnalysisProgress(20)
      const resumeText = await extractTextFromPDF(file)
      
      setAnalysisProgress(50)
      const analysisData = await analyzeResumeWithJobDescription(resumeText, jobDescription)
      
      setAnalysisProgress(100)
      onAnalysisComplete(analysisData)

    } catch (error) {
      console.error('Error processing match analysis:', error)
      alert('Failed to analyze. Please try again.')
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
      setFileName(''); // Reset file name
    }
  }

  if (isAnalyzing) {
    return (
      <div className="upload-container analyzing">
        <div className="analysis-spinner">
          <div className="spinner"></div>
        </div>
        <h3>Analyzing Resume against Job Description...</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${analysisProgress}%` }}
          ></div>
        </div>
        <p className="progress-text">{analysisProgress}% Complete</p>
      </div>
    )
  }

  return (
    <div className="job-matcher-container">
      <textarea
        className="job-description-textarea"
        placeholder="1. Paste the full job description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />
      <div 
        className={`upload-container ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()} // This triggers the file input
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf"
          style={{ display: 'none' }}
        />
        
        <div className="upload-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </div>
        
        <h3>2. Upload Your Resume</h3>
        {fileName ? (
            <p className="file-name-display">Selected: {fileName}</p>
        ) : (
            <p>Drag and drop your PDF here, or click to browse</p>
        )}
      </div>
    </div>
  )
}

export default JobMatcher;