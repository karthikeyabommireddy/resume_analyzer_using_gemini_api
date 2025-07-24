import { useState } from 'react'

const AnalysisResults = ({ analysis, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const getRatingColor = (rating) => {
    if (rating >= 8) return '#10B981' // Scale: 8-10 is good
    if (rating >= 6) return '#F59E0B' // Scale: 6-7 is average
    return '#EF4444'                   // Scale: 1-5 is poor
  }

  const renderOverview = () => (
    <div className="overview-section">
      <div className="rating-card">
        <div className="rating-circle">
          <svg viewBox="0 0 36 36" className="rating-svg">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={getRatingColor(analysis.resume_rating)}
              strokeWidth="2"
              strokeDasharray={`${analysis.resume_rating * 10}, 100`} // Convert 1-10 scale to percentage
            />
          </svg>
          <div className="rating-text">
            <span className="rating-number">{analysis.resume_rating}</span>
            <span className="rating-label">/ 10</span>
          </div>
        </div>
        <div className="rating-details">
          <h3>Resume Rating</h3>
          <p>Your resume has been analyzed and scored based on industry standards.</p>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h4>Contact Information</h4>
          <div className="contact-details">
            <p><strong>Name:</strong> {analysis.name || 'Not provided'}</p>
            <p><strong>Email:</strong> {analysis.email || 'Not provided'}</p>
            <p><strong>Phone:</strong> {analysis.phone || 'Not provided'}</p>
            {analysis.linkedin_url && (
              <p><strong>LinkedIn:</strong> <a href={analysis.linkedin_url} target="_blank" rel="noopener noreferrer">View Profile</a></p>
            )}
            {analysis.portfolio_url && (
              <p><strong>Portfolio:</strong> <a href={analysis.portfolio_url} target="_blank" rel="noopener noreferrer">View Portfolio</a></p>
            )}
          </div>
        </div>

        <div className="info-card">
          <h4>Professional Summary</h4>
          <p className="summary-text">{analysis.summary || 'No summary provided'}</p>
        </div>
      </div>
    </div>
  )

  const renderExperience = () => (
    <div className="experience-section">
      <h3>Work Experience</h3>
      {analysis.work_experience && analysis.work_experience.length > 0 ? (
        <div className="experience-list">
          {analysis.work_experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h4>{exp.position}</h4>
                <span className="duration">{exp.duration}</span>
              </div>
              <p className="company">{exp.company}</p>
              <p className="description">{exp.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No work experience found</p>
      )}

      <h3>Education</h3>
      {analysis.education && analysis.education.length > 0 ? (
        <div className="education-list">
          {analysis.education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <h4>{edu.degree}</h4>
                <span className="duration">{edu.duration}</span>
              </div>
              <p className="institution">{edu.institution}</p>
              <p className="details">{edu.details}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No education information found</p>
      )}
    </div>
  )

  const renderSkills = () => (
    <div className="skills-section">
      <div className="skills-category">
        <h3>Technical Skills</h3>
        {analysis.technical_skills && analysis.technical_skills.length > 0 ? (
          <div className="skills-grid">
            {analysis.technical_skills.map((skill, index) => (
              <span key={index} className="skill-tag technical">{skill}</span>
            ))}
          </div>
        ) : (
          <p className="no-data">No technical skills found</p>
        )}
      </div>

      <div className="skills-category">
        <h3>Soft Skills</h3>
        {analysis.soft_skills && analysis.soft_skills.length > 0 ? (
          <div className="skills-grid">
            {analysis.soft_skills.map((skill, index) => (
              <span key={index} className="skill-tag soft">{skill}</span>
            ))}
          </div>
        ) : (
          <p className="no-data">No soft skills found</p>
        )}
      </div>

      <div className="skills-category">
        <h3>Projects</h3>
        {analysis.projects && analysis.projects.length > 0 ? (
          <div className="projects-list">
            {analysis.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No projects found</p>
        )}
      </div>

      <div className="skills-category">
        <h3>Certifications</h3>
        {analysis.certifications && analysis.certifications.length > 0 ? (
          <div className="certifications-list">
            {analysis.certifications.map((cert, index) => (
              <span key={index} className="certification-tag">{cert}</span>
            ))}
          </div>
        ) : (
          <p className="no-data">No certifications found</p>
        )}
      </div>
    </div>
  )

  const renderImprovements = () => (
    <div className="improvements-section">
      <div className="improvement-category">
        <h3>Areas for Improvement</h3>
        {analysis.improvement_areas && analysis.improvement_areas.length > 0 ? (
          <ul className="improvement-list">
            {analysis.improvement_areas.map((area, index) => (
              <li key={index} className="improvement-item">
                <span className="improvement-icon">⚠️</span>
                {area}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data">No specific improvement areas identified</p>
        )}
      </div>

      <div className="improvement-category">
        <h3>Upskilling Suggestions</h3>
        {analysis.upskill_suggestions && analysis.upskill_suggestions.length > 0 ? (
          <ul className="suggestion-list">
            {analysis.upskill_suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion-item">
                <span className="suggestion-icon">💡</span>
                {suggestion}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data">No upskilling suggestions available</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="analysis-modal">
        <div className="modal-header">
          <h2>Resume Analysis Results</h2>
          <button className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button 
            className={`tab-button ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills & Projects
          </button>
          <button 
            className={`tab-button ${activeTab === 'improvements' ? 'active' : ''}`}
            onClick={() => setActiveTab('improvements')}
          >
            Improvements
          </button>
        </div>

        <div className="modal-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'experience' && renderExperience()}
          {activeTab === 'skills' && renderSkills()}
          {activeTab === 'improvements' && renderImprovements()}
        </div>
      </div>
    </div>
  )
}

export default AnalysisResults