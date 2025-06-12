import React, { useState } from 'react'
import { motion } from 'framer-motion'
import type { CatData } from '../hooks/useCats'

interface Props {
  cat: CatData
  onSwipe: (dir: 'left' | 'right') => void
}

export const CatCard: React.FC<Props> = ({ cat, onSwipe }) => {
  const [dragOffset, setDragOffset] = useState(0)
  const [dragging, setDragging]     = useState(false)

  const showLove = dragOffset > 75
  const showNope = dragOffset < -75

  return (
    <motion.div
      className={`card${dragging ? ' dragging' : ''}`}
      drag="x"
      dragConstraints={{ left: 50, right: 50 }}
      dragElastic={0.3}
      onDragStart={() => setDragging(true)}
      onDrag={(_, info) => setDragOffset(info.offset.x)}
      onDragEnd={(_, info) => {
        setDragging(false)
        setDragOffset(0)
        const dir =
          info.offset.x > 100  ? 'right'
          : info.offset.x < -100 ? 'left'
          : null
        if (dir) onSwipe(dir)
      }}
    >

      <div className="icon nope" style={{ opacity: showNope ? 1 : 0 }} />
      <div className="icon love"  style={{ opacity: showLove ? 1 : 0 }} />


      <img src={cat.url} alt="Cuties cat" draggable={false} />


      <div className="caption">
        {cat.tags && cat.tags.length > 0
          ? `Tags: ${cat.tags.join(', ')}`
          : 'Tags: - '}
      </div>
    </motion.div>
  )
}
