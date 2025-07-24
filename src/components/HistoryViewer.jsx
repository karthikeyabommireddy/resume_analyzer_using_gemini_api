import { useState, useEffect } from 'react'
import { getAllResumes, deleteResumeAnalysis } from '../services/resumeService.js'
import AnalysisResults from './AnalysisResults.jsx'

const HistoryViewer = () => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedResume, setSelectedResume] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadResumes()
  }, [])

  const loadResumes = async () => {
    try {
      setLoading(true)
      setError(null);
      const data = await getAllResumes()
      setResumes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (resumeId, resumeName) => {
    // We use window.confirm as a simple confirmation dialog
    if (window.confirm(`Are you sure you want to delete the analysis for "${resumeName || 'this resume'}"?`)) {
      try {
        await deleteResumeAnalysis(resumeId);
        // On success, filter the resume out of the local state to update the UI instantly
        setResumes(prevResumes => prevResumes.filter(resume => resume.id !== resumeId));
      } catch (err) {
        alert(`Failed to delete resume: ${err.message}`);
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  const getRatingColor = (rating) => {
    if (rating >= 8) return '#10B981'
    if (rating >= 6) return '#F59E0B'
    return '#EF4444'
  }

  if (loading) {
    return (
      <div className="history-container"><div className="loading-spinner"><div className="spinner"></div><p>Loading resume history...</p></div></div>
    )
  }

  if (error) {
    return (
      <div className="history-container"><div className="error-message"><p>Error loading resumes: {error}</p><button onClick={loadResumes} className="retry-button">Retry</button></div></div>
    )
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h2>Resume History</h2>
        <p>View all previously analyzed resumes</p>
      </div>

      {resumes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
          </div>
          <h3>No resumes analyzed yet</h3>
          <p>Upload your first resume to get started with AI-powered analysis</p>
        </div>
      ) : (
        <div className="resumes-grid">
          {resumes.map((resume) => (
            <div key={resume.id} className="resume-card" onClick={() => setSelectedResume(resume)}>
              <div className="resume-header">
                {/* Left side of header */}
                <h3 className="resume-title">{resume.name || 'Unknown Candidate'}</h3>
                
                {/* Right side of header */}
                <div className="header-controls">
                  <div className="rating-badge" style={{ backgroundColor: getRatingColor(resume.resume_rating) }}>
                    {resume.resume_rating}/10
                  </div>
                  <button 
                    className="delete-resume-button" 
                    title="Delete analysis"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the card's onClick from firing
                      handleDelete(resume.id, resume.name)
                    }}
                  >
                    <svg viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </div>
              
              <div className="resume-details">
                <p className="file-name">{resume.file_name}</p>
                <p className="upload-date">{formatDate(resume.uploaded_at)}</p>
              </div>

              <div className="skills-preview">
                {resume.technical_skills && resume.technical_skills.length > 0 && (
                  <div className="skills-tags">
                    {resume.technical_skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                    {resume.technical_skills.length > 3 && (
                      <span className="more-skills">+{resume.technical_skills.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedResume && (
        <AnalysisResults 
          analysis={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </div>
  )
}

export default HistoryViewer