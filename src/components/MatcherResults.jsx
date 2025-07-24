import { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion' // <-- Add 'animate' here

const MatcherResults = ({ analysis, onClose }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Now this will work correctly
    const controls = animate(0, analysis.match_score || 0, {
      duration: 1.5,
      delay: 0.5,
      ease: "easeInOut",
      onUpdate: (value) => {
        setAnimatedScore(Math.round(value));
      }
    });
    return () => controls.stop();
  }, [analysis.match_score]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: "easeIn" } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.8, // Staggered delay
        duration: 0.5
      }
    })
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="analysis-modal stylish-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="modal-header stylish-header">
            <h2>Job Match Analysis</h2>
            <motion.button whileHover={{ scale: 1.1, rotate: 90 }} className="close-button" onClick={onClose}>
              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </motion.button>
          </div>

          <div className="modal-content stylish-content">
            <div className="matcher-grid">
              {/* Left Column: Score */}
              <motion.div className="score-panel" initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1, transition: {delay: 0.5, duration: 0.5}}}>
                <div className={`score-display ${getScoreColor(animatedScore)}`}>
                  {animatedScore}
                  <span className="percent-sign">%</span>
                </div>
                <div className="score-label">Match Score</div>
                <p className="score-summary">{analysis.final_summary}</p>
              </motion.div>

              {/* Right Column: Details */}
              <div className="details-panel">
                <div className="details-section">
                  <h3 className="details-title">
                    <span className="icon-wrapper">💡</span> Tailoring Suggestions
                  </h3>
                  <ul className="details-list">
                    {analysis.tailoring_suggestions.map((suggestion, i) => (
                      <motion.li key={i} custom={i} variants={itemVariants} initial="hidden" animate="visible">
                        {suggestion}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="details-section">
                  <h3 className="details-title">
                    <span className="icon-wrapper">🔑</span> Missing Keywords
                  </h3>
                  <div className="keywords-container">
                    {analysis.missing_keywords.map((keyword, i) => (
                      <motion.div key={i} className="keyword-tag" custom={i} variants={itemVariants} initial="hidden" animate="visible">
                        {keyword}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MatcherResults;