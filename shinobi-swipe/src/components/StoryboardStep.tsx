import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { CardData } from "@/types"

interface StoryboardStepProps {
  premise: string
  selectedCards: CardData[]
  onReset: () => void
}

export function StoryboardStep({ premise, selectedCards, onReset }: StoryboardStepProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-400 to-red-500 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
              Storyboard
            </h1>
          </div>
          <div className="text-center space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-lg text-gray-800 font-medium">Premise:</p>
              <p className="text-xl text-gray-600 mt-2">"{premise}"</p>
            </div>
            <div className="bg-pink-50 rounded-xl p-6">
              <p className="text-lg text-pink-600 font-medium">
                Selected {selectedCards.length} cards for your video
              </p>
            </div>
            <Button
              onClick={onReset}
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold px-8 py-3 rounded-xl"
            >
              Start Over
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 