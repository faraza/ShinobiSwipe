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
            />
          ))}
        </div>
      </div>
    </div>
  )
} 