'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, PanInfo } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

interface JokeCard {
  id: number;
  joke: string;
  category: string;
  author?: string;
}

const sampleJokes: JokeCard[] = [
  {
    id: 1,
    joke: "Why don't scientists trust atoms? Because they make up everything!",
    category: "Science",
    author: "Physics Professor"
  },
  {
    id: 2,
    joke: "What do you call a fake noodle? An impasta!",
    category: "Food",
    author: "Chef Mario"
  },
  {
    id: 3,
    joke: "Why did the scarecrow win an award? Because he was outstanding in his field!",
    category: "Agriculture",
    author: "Farmer Joe"
  },
  {
    id: 4,
    joke: "Why don't eggs tell jokes? They'd crack each other up!",
    category: "Food",
    author: "Breakfast Club"
  },
  {
    id: 5,
    joke: "What do you call a bear with no teeth? A gummy bear!",
    category: "Animals",
    author: "Wildlife Expert"
  },
  {
    id: 6,
    joke: "Why did the math book look so sad? Because it had too many problems!",
    category: "Education",
    author: "Math Teacher"
  }
];

export default function SwipePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedCards, setSwipedCards] = useState<{ id: number; direction: 'left' | 'right' }[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const router = useRouter();

  const currentCard = sampleJokes[currentIndex];

  useEffect(() => {
    if (currentIndex >= sampleJokes.length) {
      // All cards swiped, navigate to storyboard
      setTimeout(() => {
        router.push('/storyboard');
      }, 1000);
    }
  }, [currentIndex, router]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating || currentIndex >= sampleJokes.length) return;
    
    setIsAnimating(true);
    setSwipeDirection(direction);
    setSwipedCards(prev => [...prev, { id: currentCard.id, direction }]);
    
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setIsAnimating(false);
      setSwipeDirection(null);
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
      <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎬</span>
          </div>
          <h1 className="text-5xl font-bold mb-4">All Done!</h1>
          <p className="text-xl opacity-90">Creating your storyboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-red-500 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        <div className="text-white">
          <h1 className="text-2xl font-bold">ShinobiSwipe</h1>
          <p className="text-sm opacity-80">Card {currentIndex + 1} of {sampleJokes.length}</p>
        </div>
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">🎭</span>
        </div>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="relative w-full max-w-sm h-96" {...handlers}>
          <motion.div
            key={currentCard.id}
            className="absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            animate={{
              scale: isAnimating ? 0.95 : 1,
              rotate: swipeDirection === 'left' ? -15 : swipeDirection === 'right' ? 15 : 0,
              x: swipeDirection === 'left' ? -400 : swipeDirection === 'right' ? 400 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-red-400 to-pink-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{currentCard.category}</h2>
                  <p className="text-sm opacity-90">{currentCard.author}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-lg">😄</span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex items-center justify-center">
              <p className="text-gray-800 text-lg font-medium leading-relaxed text-center">
                {currentCard.joke}
              </p>
            </div>

            {/* Swipe Indicators */}
            <div className="absolute top-4 left-4 transform -rotate-12">
              <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm opacity-0 animate-pulse">
                NOPE
              </div>
            </div>
            <div className="absolute top-4 right-4 transform rotate-12">
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm opacity-0 animate-pulse">
                LIKE
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 pb-8">
        <button
          onClick={() => handleSwipe('left')}
          disabled={isAnimating}
          className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg transition-all duration-200 transform hover:scale-110"
        >
          ✕
        </button>
        
        <button
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          className="w-16 h-16 bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg transition-all duration-200 transform hover:scale-110"
        >
          ♥
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center text-white text-sm opacity-75 pb-6">
        <p>Swipe left to drop, right to keep</p>
      </div>
    </div>
  );
} 