'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, PanInfo } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

interface JokeCard {
  id: number;
  joke: string;
  category: string;
}

const sampleJokes: JokeCard[] = [
  {
    id: 1,
    joke: "Why don't scientists trust atoms? Because they make up everything!",
    category: "Science"
  },
  {
    id: 2,
    joke: "What do you call a fake noodle? An impasta!",
    category: "Food"
  },
  {
    id: 3,
    joke: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    category: "Agriculture"
  },
  {
    id: 4,
    joke: "Why don't eggs tell jokes? They'd crack each other up!",
    category: "Food"
  },
  {
    id: 5,
    joke: "What do you call a bear with no teeth? A gummy bear!",
    category: "Animals"
  },
  {
    id: 6,
    joke: "Why did the math book look so sad? Because it had too many problems!",
    category: "Education"
  }
];

export default function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState<{ id: number; direction: 'left' | 'right' }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  const currentCard = sampleJokes[currentIndex];

  useEffect(() => {
    if (currentIndex >= sampleJokes.length) {
      // All cards swiped, navigate to storyboard
      setTimeout(() => {
        router.push('/storyboard');
      }, 500);
    }
  }, [currentIndex, router]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating || currentIndex >= sampleJokes.length) return;
    
    setIsAnimating(true);
    setSwipedCards(prev => [...prev, { id: currentCard.id, direction }]);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true
  });

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (isAnimating) return;
    
    const swipeThreshold = 100;
    if (info.offset.x > swipeThreshold) {
      handleSwipe('right');
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe('left');
    }
  };

  if (currentIndex >= sampleJokes.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">All Done!</h1>
          <p className="text-xl">Redirecting to storyboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex flex-col items-center justify-center p-4">
      <div className="text-center text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">Swipe the Jokes!</h1>
        <p className="text-lg opacity-90">
          Card {currentIndex + 1} of {sampleJokes.length}
        </p>
      </div>

      <div className="relative w-full max-w-sm h-96 mb-8" {...handlers}>
        <motion.div
          key={currentCard.id}
          className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-center items-center cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{
            scale: isAnimating ? 0.95 : 1,
            rotate: isAnimating ? 5 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
              {currentCard.category}
            </div>
            <p className="text-gray-800 text-lg font-medium leading-relaxed">
              {currentCard.joke}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="flex gap-6">
        <button
          onClick={() => handleSwipe('left')}
          disabled={isAnimating}
          className="w-16 h-16 bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-all duration-200"
        >
          ✕
        </button>
        
        <button
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          className="w-16 h-16 bg-green-500 hover:bg-green-600 disabled:opacity-50 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-all duration-200"
        >
          ✓
        </button>
      </div>

      <div className="mt-8 text-white text-center">
        <p className="text-sm opacity-75">
          Swipe left to drop, right to keep
        </p>
      </div>
    </div>
  );
} 