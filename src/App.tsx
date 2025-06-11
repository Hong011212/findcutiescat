// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// src/App.tsx
import { useState } from 'react';
import { useCats } from './hooks/useCats';
import { SwipeStack } from './components/SwipeStack';
import { SummaryModal } from './components/SummaryModal';

export default function App() {
  const [mode, setMode] = useState<'swipe'|'summary'>('swipe');
  const cats = useCats(15);
  const [liked, setLiked] = useState<string[]>([]);

  if (cats.length === 0) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="h-screen bg-gradient-to-b from-pink-200 to-purple-200">
      {mode === 'swipe' && (
        <SwipeStack
          urls={cats}
          onDone={(likedUrls) => {
            setLiked(likedUrls);
            setMode('summary');
          }}
        />
      )}
      {mode === 'summary' && <SummaryModal liked={liked} onReset={() => window.location.reload()} />}
    </div>
  );
}
