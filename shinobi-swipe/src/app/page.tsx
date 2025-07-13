'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [premise, setPremise] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!premise.trim()) return;

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      router.push('/swipe');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl font-bold">S</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ShinobiSwipe
          </h1>
          <p className="text-gray-600 text-lg">
            Create your video storyboard
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="premise" className="block text-sm font-semibold text-gray-700 mb-3">
              What's your video about?
            </label>
            <textarea
              id="premise"
              value={premise}
              onChange={(e) => setPremise(e.target.value)}
              placeholder="Describe your video idea here... (e.g., A cooking tutorial for beginners, A travel vlog in Japan, etc.)"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-400 focus:border-red-400 resize-none transition-all duration-200 text-gray-700 placeholder-gray-400"
              rows={4}
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={!premise.trim() || isLoading}
            className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-red-500 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Generating Cards...
              </div>
            ) : (
              'Start Swiping!'
            )}
          </button>
        </form>

        {isLoading && (
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-red-400 to-pink-500 h-3 rounded-full animate-pulse transition-all duration-1000" style={{ width: '100%' }}></div>
            </div>
            <p className="text-center text-gray-600 mt-3 font-medium">Creating your swipe cards...</p>
          </div>
        )}
      </div>
    </div>
  );
}
