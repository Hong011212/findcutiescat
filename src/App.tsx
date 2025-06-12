import catGif from './assets/walking-cat.gif'
import { useState } from 'react'
import { useCats, type CatData } from './hooks/useCats'
import { SwipeStack } from './components/SwipeStack'
import { SummaryModal } from './components/SummaryModal'
import './App.css'

export default function App() {
  const [mode, setMode] = useState<'swipe' | 'summary'>('swipe')
  const { cats, loading } = useCats(15)
  const [liked, setLiked] = useState<CatData[]>([])

  if (loading) {
    return (
      <div className="loading">
        Cat Selfieing...<span></span>
      </div>
    )
  }

  return (
    <div className="app-root">
      <div className="background">
        <div
          className="walking-cat"
          style={{ backgroundImage: `url(${catGif})` }}
        />
      </div>
      <div>
        {mode === 'swipe' && (

          <div className="swipe-container">
            <SwipeStack
              cats={cats}
              totalCount={15}   
              loading={loading}
              onDone={(likedCats) => {
                setLiked(likedCats)
                setMode('summary')
              }}
            />
          </div>
        )}

        {mode === 'summary' && (
          <SummaryModal liked={liked} onReset={() => window.location.reload()} />
        )}
      </div>
    </div>
  )
}

