import { useState, useRef } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url'
import { analyzeResumeText, saveResumeAnalysis } from '../services/resumeService.js'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

const FileUpload = ({ onAnalysisComplete, onAnalysisStart }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const fileInputRef = useRef(null)

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
    handleFiles(files)
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
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

  const handleFiles = async (files) => {
    if (files.length === 0) return

    const file = files[0]
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file.')
      return
    }

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    onAnalysisStart()

    try {
      console.log('Step 1: Starting PDF text extraction...');
      setAnalysisProgress(20)
      const resumeText = await extractTextFromPDF(file)
      console.log('Step 1 COMPLETE. Text extracted successfully.');
      
      console.log('Step 2: Sending text to AI for analysis...');
      setAnalysisProgress(40)
      const analysisData = await analyzeResumeText(resumeText)
      console.log('Step 2 COMPLETE. AI analysis received.');

      console.log('Step 3: Saving analysis to database...');
      setAnalysisProgress(70)
      const savedResume = await saveResumeAnalysis(file.name, analysisData)
      console.log('Step 3 COMPLETE. Data saved to database.');
      
      setAnalysisProgress(100)
      onAnalysisComplete(savedResume)

    } catch (error) {
      console.error('AN ERROR OCCURRED:', error);
      // This new alert will show the specific error message
      alert(`Error: ${error.message}\n\nCheck the developer console (F12) for more details.`);
    } finally {
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  if (isAnalyzing) {
    return (
      <div className="upload-container analyzing">
        <div className="analysis-spinner">
          <div className="spinner"></div>
        </div>
        <h3>Analyzing Resume...</h3>
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
    <div 
      className={`upload-container ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
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
      
      <h3>Upload Your Resume</h3>
      <p>Drag and drop your PDF resume here, or click to browse</p>
      <div className="file-types">
        <span className="file-type">PDF</span>
      </div>
    </div>
  )
}

export default FileUpload