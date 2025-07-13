import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { CardData } from "@/types"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface StoryboardStepProps {
  premise: string
  selectedCards: CardData[]
  onReset: () => void
}

export function StoryboardStep({ premise, selectedCards, onReset }: StoryboardStepProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentMessage, setCurrentMessage] = useState("Creating video prompt")
  
  const storyboardCards = [
    {
      id: 1,
      image: "/zabuza.png",
      alt: "Zabuza",
      dialogue: [
        "Of course I believed in Naruto. Kid was born to be Hokage",
        "You tried to cut him in half with a giant sword.",
        "That's called mentorship through violence"
      ]
    },
    {
      id: 2,
      image: "/meth.png",
      alt: "Meth guy",
      dialogue: [
        "We were friends in the academy. I used to call him the GOAT-kage.",
        "He didn't have any friends in the academy.",
        "That's a lie. You think that swing pushed itself?"
      ]
    }
  ]

  useEffect(() => {
    if (isGenerating) {
      setCurrentMessage("Creating video prompt")
      const timer = setTimeout(() => {
        setCurrentMessage("Generating Video")
      }, 7000)

      return () => clearTimeout(timer)
    }
  }, [isGenerating])

  const handleGenerateVideo = () => {
    setIsGenerating(true)
  }

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % storyboardCards.length)
  }

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + storyboardCards.length) % storyboardCards.length)
  }

  const currentCard = storyboardCards[currentCardIndex]

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm">
          <div className="relative h-[600px]">
            <div className="absolute inset-0">
              <div className="h-full w-full rounded-3xl bg-gradient-to-b from-purple-400 to-blue-200 p-6 flex flex-col justify-between">
                {/* Tip at the top */}
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span className="text-xl">🎬</span>
                  <span>Generating your video...</span>
                </div>

                {/* Loading card content */}
                <Card className="bg-white rounded-3xl shadow-xl px-6 py-8">
                  <CardContent className="flex flex-col items-center space-y-6">
                    <p className="text-sm text-purple-600">Processing</p>
                    <h1 className="text-2xl font-bold text-center text-black leading-snug">
                      {currentMessage}
                    </h1>
                    <div className="w-full max-w-xs">
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full bg-purple-600 rounded-full w-1/3" 
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

                {/* Empty space for buttons */}
                <div className="flex justify-center gap-2 mt-6">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center p-4 gap-6">
      {/* Carousel Container */}
      <div className="relative w-full max-w-sm">
        <div className="relative h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                if (info.offset.x > 100) {
                  prevCard()
                } else if (info.offset.x < -100) {
                  nextCard()
                }
              }}
            >
              <div className="h-full w-full rounded-3xl bg-gradient-to-b from-purple-400 to-blue-200 p-6 flex flex-col justify-between cursor-grab active:cursor-grabbing">
                {/* Tip at the top */}
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span className="text-xl">🎬</span>
                  <span>Final storyboard scene {currentCardIndex + 1} of {storyboardCards.length}</span>
                </div>

                {/* Card content */}
                <Card className="bg-white rounded-3xl shadow-xl px-6 py-8">
                  <CardContent className="flex flex-col items-center space-y-4">
                    <p className="text-sm text-purple-600">Video Frame</p>
                    
                    <div className="rounded-2xl overflow-hidden w-full max-w-[300px] aspect-square shadow-md bg-gray-100">
                      <img 
                        src={currentCard.image} 
                        alt={currentCard.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full space-y-2 text-left">
                      {currentCard.dialogue.map((line, index) => (
                        <p key={index} className="text-sm font-medium text-gray-800">
                          <span className="font-bold">{index % 2 === 0 ? '1:' : '2:'}</span> {line}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {storyboardCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCardIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentCardIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Generate Video Button */}
      <Button
        onClick={handleGenerateVideo}
        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl mt-4"
      >
        Generate video
      </Button>
    </div>
  )
} 