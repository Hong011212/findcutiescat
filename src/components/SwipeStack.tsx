import React, { useState } from 'react'
import { CatCard } from './CatCard'
import type { CatData } from '../hooks/useCats'

interface Props {
  cats: CatData[]
  totalCount: number       
  loading: boolean       
  onDone: (liked: CatData[]) => void
}

export const SwipeStack: React.FC<Props> = ({
  cats,
  totalCount,
  loading,
  onDone,
}) => {
  const [index, setIndex] = useState(0)
  const [liked, setLiked] = useState<CatData[]>([])

  const handleSwipe = (dir: 'left' | 'right') => {
    // record “right” swipes
    if (dir === 'right') {
      setLiked(l => [...l, cats[index]])
    }

    const next = index + 1

    // only move on when cat pic is actually loaded
    if (next < cats.length) {
      setIndex(next)
    }
    // once user has swiped all cat pic then done
    if (next === totalCount && !loading) {
      onDone(liked)
    }
  }

  return (
    <div className="stack-wrapper">
      <h2 className="stack-header">Find Your Cuties Cat</h2>

      <div className="progress-container">
        <progress
          className="progress-bar"
          value={index + 1}
          max={totalCount}
        />
        <div className="progress-text">
          {index + 1} / {totalCount}
        </div>
      </div>

      <div className="card-stack">
        {cats
          .slice(index)
          .reverse()
          .map(cat => (
            <CatCard
              key={cat.id}
              cat={cat}
              onSwipe={handleSwipe}
            />
          ))}
      </div>
    </div>
  )
}
