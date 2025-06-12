import { useState, useEffect } from 'react'

export interface CatData {
  id: string
  url: string
  createdAt?: string
  tags?: string[]
}


export function useCats(
  count: number,
  initialBatch = 5,     
  cardWidth = 320      
): { cats: CatData[]; loading: boolean } {
  const [cats, setCats]       = useState<CatData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let mounted = true

    async function loadBatch(_offset: number, length: number) {
      const results = await Promise.all(
        Array.from({ length }).map(async (_) => {
          const meta = await fetch('https://cataas.com/cat?json=true').then(r => r.json())
          const url = `https://cataas.com/cat/${meta.id}?width=${cardWidth}`
          await new Promise<void>(resolve => {
            const img = new Image()
            img.src    = url
            img.onload = () => resolve()
            img.onerror= () => resolve()
          })

          return {
            id:        meta.id,
            url,
            createdAt: meta.created_at,
            tags:      meta.tags,
          } as CatData
        })
      )
      return results
    }


    ;(async () => {
      const firstCount = Math.min(initialBatch, count)
      const firstBatch = await loadBatch(0, firstCount)
      if (!mounted) return
      setCats(firstBatch)
      setLoading(false)

      if (firstCount < count) {
        const restBatch = await loadBatch(firstCount, count - firstCount)
        if (!mounted) return
        setCats(current => [...current, ...restBatch])
      }
    })()

    return () => {
      mounted = false
    }
  }, [count, initialBatch, cardWidth])

  return { cats, loading }
}
