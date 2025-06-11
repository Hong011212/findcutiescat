// src/components/CatCard.tsx
import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  url: string;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const CatCard: React.FC<Props> = ({ url, onSwipe }) => {
  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        const dir = info.point.x > 100 ? 'right' : info.point.x < -100 ? 'left' : null;
        if (dir) onSwipe(dir);
      }}
      className="absolute w-80 h-96 rounded-2xl shadow-lg bg-gray-100 overflow-hidden"
    >
      <img src={url} alt="cute cat" className="object-cover w-full h-full" />
    </motion.div>
  );
};
