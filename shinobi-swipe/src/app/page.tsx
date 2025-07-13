"use client"

import type React from "react"
import { useState } from "react"
import { InputStep } from "@/components/InputStep"
import { SwipingStep } from "@/components/SwipingStep"
import { StoryboardStep } from "@/components/StoryboardStep"
import { CardData } from "@/types"

const sampleCards: CardData[] = [
  {
    id: 1,
    type: "image",
    content: "",
    imageUrl: "/zabuza.png",
    caption: "Zabuza wears an 'I heart Naruto' shirt",
  },
  {
    id: 2,
    type: "text",
    content: "Zabuza says he always supported Naruto. \n\nThe interviewer reminds him that he tried to cut him in half with a giant sword.",
  },
  {
    id: 3,
    type: "image",
    content: "",
    imageUrl: "/clone.png",
    caption: "Man dresses up as Naruto",
  },
  {
    id: 4,
    type: "image",
    content: "",
    imageUrl: "/meth.png",
    caption: "Guy on meth says he was Naruto's first friend.",
  },
  {
    id: 5,
    type: "text",
    content: "Meth guy says he used to call Naruto the GOAT-kage.",
  },  
]

export default function Component() {
  const [step, setStep] = useState<"input" | "swiping" | "writing-script" | "storyboard">("input")
  const [premise, setPremise] = useState("")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [isRecalculating, setIsRecalculating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!premise.trim()) return

    setStep("swiping")
  }

  const handleSwipe = (direction: "left" | "right") => {
    const currentCard = sampleCards[currentCardIndex]

    if (direction === "right") {
      setSelectedCards((prev) => [...prev, currentCard])
      // Move to next card immediately for "yes"
      if (currentCardIndex < sampleCards.length - 1) {
        setCurrentCardIndex((prev) => prev + 1)
      } else {
        setStep("writing-script")
        setTimeout(() => {
          setStep("storyboard")
        }, 5000)
      }
    } else {
      // Show recalculating for "no"
      setIsRecalculating(true)
      setTimeout(() => {
        setIsRecalculating(false)
        if (currentCardIndex < sampleCards.length - 1) {
          setCurrentCardIndex((prev) => prev + 1)
        } else {
          setStep("writing-script")
          setTimeout(() => {
            setStep("storyboard")
          }, 5000)
        }
      }, 10000)
    }
  }

  const resetApp = () => {
    setStep("input")
    setPremise("")
    setCurrentCardIndex(0)
    setSelectedCards([])
    setIsRecalculating(false)
  }

  if (step === "input") {
    return <InputStep premise={premise} setPremise={setPremise} onSubmit={handleSubmit} />
  }

  if (step === "swiping") {
    return (
      <SwipingStep
        sampleCards={sampleCards}
        currentCardIndex={currentCardIndex}
        onSwipe={handleSwipe}
        onReset={resetApp}
        isRecalculating={isRecalculating}
      />
    )
  }

  if (step === "writing-script") {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm">
          <div className="relative h-[600px]">
            <div className="absolute inset-0">
              <div className="h-full w-full rounded-3xl bg-gradient-to-b from-purple-400 to-blue-200 p-6 flex flex-col justify-between">
                {/* Tip at the top */}
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span className="text-xl">📝</span>
                  <span>Finalizing your content...</span>
                </div>

                {/* Loading card content */}
                <div className="bg-white rounded-3xl shadow-xl px-6 py-8">
                  <div className="flex flex-col items-center space-y-6">
                    <p className="text-sm text-purple-600">Processing</p>
                    <h1 className="text-2xl font-bold text-center text-black leading-snug">
                      Writing script
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
                  </div>
                </div>

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

  if (step === "storyboard") {
    return <StoryboardStep premise={premise} selectedCards={selectedCards} onReset={resetApp} />
  }

  return null
}
