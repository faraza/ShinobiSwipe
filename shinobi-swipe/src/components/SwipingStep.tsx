import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, ArrowLeft, RotateCcw, X } from "lucide-react"
import { SwipeCard } from "./SwipeCard"
import { CardData } from "@/types"

interface SwipingStepProps {
  sampleCards: CardData[]
  currentCardIndex: number
  onSwipe: (direction: "left" | "right") => void
  onReset: () => void
}

export function SwipingStep({ sampleCards, currentCardIndex, onSwipe, onReset }: SwipingStepProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button variant="ghost" onClick={onReset} className="text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="font-semibold text-gray-800">Content Swiper</span>
          </div>
          <Button variant="ghost" className="text-gray-600">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm">
          <div className="relative h-[600px]">
            {sampleCards.map((card, index) => (
              <SwipeCard
                key={card.id}
                card={card}
                isActive={index === currentCardIndex}
                onSwipe={onSwipe}
                stackPosition={index - currentCardIndex}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white p-6 shadow-lg">
        <div className="flex justify-center items-center space-x-6 max-w-md mx-auto">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-16 h-16 border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 bg-transparent"
            onClick={() => onSwipe("left")}
          >
            <X className="w-8 h-8 text-red-500" />
          </Button>
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">
              {currentCardIndex + 1} of {sampleCards.length}
            </div>
            <Progress value={((currentCardIndex + 1) / sampleCards.length) * 100} className="w-24 h-2" />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-16 h-16 border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 bg-transparent"
            onClick={() => onSwipe("right")}
          >
            <Heart className="w-8 h-8 text-green-500" />
          </Button>
        </div>
      </div>
    </div>
  )
} 