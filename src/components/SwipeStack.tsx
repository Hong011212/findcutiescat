// src/components/SwipeStack.tsx
import React, { useState } from 'react';
import { CatCard } from './CatCard';

interface Props { urls: string[]; onDone: (liked: string[]) => void; }

export const SwipeStack: React.FC<Props> = ({ urls, onDone }) => {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);

  function handleSwipe(dir: 'left'|'right') {
    if (dir === 'right') setLiked([...liked, urls[index]]);
    const next = index + 1;
    if (next === urls.length) {
      onDone(liked);
    } else {
      setIndex(next);
    }
  }

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {urls.slice(index).reverse().map((url) => (
        <CatCard key={url} url={url} onSwipe={handleSwipe} />
      ))}
    </div>
  );
};
