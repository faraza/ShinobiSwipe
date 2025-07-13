import { SwipeCard } from "./SwipeCard"
import { CardData } from "@/types"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"

interface SwipingStepProps {
  sampleCards: CardData[]
  currentCardIndex: number
  onSwipe: (direction: "left" | "right") => void
  onReset: () => void
  isRecalculating?: boolean
}

export function SwipingStep({ sampleCards, currentCardIndex, onSwipe, onReset, isRecalculating = false }: SwipingStepProps) {
  const [messageIndex, setMessageIndex] = useState(0)
  const messages = [
    "Updating preferences",
    "Generating new jokes",
    "Choosing punchlines"
  ]

  useEffect(() => {
    if (isRecalculating) {
      setMessageIndex(0)
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length)
      }, 3333) // Change message every ~3.33 seconds (10 seconds / 3 messages)

      return () => clearInterval(interval)
    }
  }, [isRecalculating, messages.length])

  if (isRecalculating) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm">
          <div className="relative h-[600px]">
            <div className="absolute inset-0">
              <div className="h-full w-full rounded-3xl bg-gradient-to-b from-purple-400 to-blue-200 p-6 flex flex-col justify-between">
                {/* Tip at the top */}
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span className="text-xl">💡</span>
                  <span>You can swipe right or left to answer positive or negative respectively.</span>
                </div>

                {/* Recalculating card content */}
                <Card className="bg-white rounded-3xl shadow-xl px-6 py-8">
                  <CardContent className="flex flex-col items-center space-y-6">
                    <p className="text-sm text-purple-600">Processing</p>
                    <h1 className="text-2xl font-bold text-center text-black leading-snug">
                      {messages[messageIndex]}
                    </h1>
                    <div className="w-full max-w-xs">
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-purple-600 rounded-full w-1/3 animate-bounce" 
                             style={{
                               animation: 'slide 1.5s ease-in-out infinite'
                             }}
                        />
                      </div>
                    </div>
                    <style jsx>{`
                      @keyframes slide {
                        0% { transform: translateX(-100%); }
                        50% { transform: translateX(200%); }
                        100% { transform: translateX(-100%); }
                      }
                    `}</style>
                  </CardContent>
                </Card>

                {/* Buttons (disabled) */}
                <div className="flex justify-center gap-6 mt-6">
                  <button 
                    className="w-14 h-14 rounded-full bg-white/50 shadow-md text-2xl opacity-50 cursor-not-allowed"
                    disabled
                  >
                    👎
                  </button>
                  <button 
                    className="w-14 h-14 rounded-full bg-white/50 shadow-md text-2xl opacity-50 cursor-not-allowed"
                    disabled
                  >
                    👍
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative h-[600px]">
          {sampleCards.map((card, index) => (
            <SwipeCard
              key={card.id}
              card={card}
              isActive={index === currentCardIndex}
              onSwipe={onSwipe}
              stackPosition={index - currentCardIndex}
              totalCards={sampleCards.length}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 