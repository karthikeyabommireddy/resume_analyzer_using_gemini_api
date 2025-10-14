import { useState } from 'react'
import FileUpload from './components/FileUpload.jsx'
import AnalysisResults from './components/AnalysisResults.jsx'
import HistoryViewer from './components/HistoryViewer.jsx'
import JobMatcher from './components/JobMatcher.jsx' 
import MatcherResults from './components/MatcherResults.jsx'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('upload')
  const [currentAnalysis, setCurrentAnalysis] = useState(null)
  const [matcherAnalysis, setMatcherAnalysis] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [showMatcherResults, setShowMatcherResults] = useState(false)

  const handleAnalysisStart = () => {
    setShowResults(false)
  }

  const handleAnalysisComplete = (analysis) => {
    setCurrentAnalysis(analysis)
    setShowResults(true)
  }

  const handleMatcherComplete = (analysis) => {
    setMatcherAnalysis(analysis)
    setShowMatcherResults(true)
  }

  const handleCloseResults = () => {
    setShowResults(false)
    setCurrentAnalysis(null)
  }

  const handleCloseMatcherResults = () => {
    setShowMatcherResults(false)
    setMatcherAnalysis(null)
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'upload':
        return (
          <div className="upload-section">
            <div className="section-header">
              <h2>AI-Powered Resume Analysis</h2>
              <p>Upload your resume and get instant feedback with improvement suggestions</p>
            </div>
            <FileUpload 
              onAnalysisComplete={handleAnalysisComplete}
              onAnalysisStart={handleAnalysisStart}
            />
          </div>
        )
      case 'history':
        return <HistoryViewer />
      case 'matcher':
        return (
          <div className="upload-section">
            <div className="section-header">
              <h2>Job Description Matcher</h2>
              <p>Analyze how well your resume matches a specific job description</p>
            </div>
            <JobMatcher 
              onAnalysisComplete={handleMatcherComplete} 
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <h1>Resume Analyzer</h1>
          </div>
          
          <nav className="nav-tabs">
            <button 
              className={`nav-button ${currentView === 'upload' ? 'active' : ''}`}
              onClick={() => setCurrentView('upload')}
            >
              <span className="nav-icon">📤</span>
              Upload & Analyze
            </button>
            <button 
              className={`nav-button ${currentView === 'matcher' ? 'active' : ''}`}
              onClick={() => setCurrentView('matcher')}
            >
              <span className="nav-icon">🎯</span>
              Job Matcher
            </button>
            <button 
              className={`nav-button ${currentView === 'history' ? 'active' : ''}`}
              onClick={() => setCurrentView('history')}
            >
              <span className="nav-icon">📋</span>
              Resume History
            </button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {renderMainContent()}
      </main>

      {showResults && currentAnalysis && (
        <AnalysisResults 
          analysis={currentAnalysis}
          onClose={handleCloseResults}
        />
      )}

      {showMatcherResults && matcherAnalysis && (
         <MatcherResults 
            analysis={matcherAnalysis}
            onClose={handleCloseMatcherResults}
        />
      )}

      <footer className="app-footer">
        <p>Powered by Google Gemini AI • Built with React</p>
      </footer>
    </div>
  )
}

export default App
