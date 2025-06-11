// src/hooks/useCats.ts
import { useState, useEffect } from 'react';

export function useCats(count: number) {
  const [urls, setUrls] = useState<string[]>([]);
  useEffect(() => {
    let mounted = true;
    async function load() {
      const ids = await Promise.all(
        Array.from({ length: count }).map(async () => {
          const res = await fetch('https://cataas.com/cat?json=true');
          const { id } = await res.json();
          return id as string;
        })
      );
      if (mounted) {
        setUrls(ids.map(id => `https://cataas.com/cat/${id}`));
      }
    }
    load();
    return () => { mounted = false; };
  }, [count]);
  return urls;
}
