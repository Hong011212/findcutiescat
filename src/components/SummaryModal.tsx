import React, { useState } from 'react'
import type { CatData } from '../hooks/useCats'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  liked: CatData[]
  onReset: () => void
}

export const SummaryModal: React.FC<Props> = ({ liked, onReset }) => {
  const [lightboxUrl, setLightboxUrl] = useState<string>('')

  return (
    <div className="summary-container">
      <div className="summary-inner">
        <div className="summary-header">
          <h2>
            You chose {liked.length} cuties cat
            {liked.length !== 1 ? 's' : ''} !
          </h2>
          <button className="reset-button" onClick={onReset}>
            ← Try Again
          </button>
        </div>

        <div className="gallery-grid">
          {liked.map(cat => (
            <motion.div
              key={cat.id}
              className="gallery-card"
              layout
              whileHover={{ scale: 1.03 }}
              onClick={() => setLightboxUrl(cat.url)}
            >
              <img src={cat.url} alt={`Cat ${cat.id}`} />
              <div className="card-overlay">
                <p className="caption">
                  {cat.tags?.length
                    ? `Tags: ${cat.tags.join(', ')}`
                    : `ID: ${cat.id}`}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {lightboxUrl && (
            <motion.div
              className="lightbox"
              onClick={() => setLightboxUrl('')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.img
                src={lightboxUrl}
                alt="Enlarged cat"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
