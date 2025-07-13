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
  const [step, setStep] = useState<"input" | "swiping" | "storyboard">("storyboard")
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
        setStep("storyboard")
      }
    } else {
      // Show recalculating for "no"
      setIsRecalculating(true)
      setTimeout(() => {
        setIsRecalculating(false)
        if (currentCardIndex < sampleCards.length - 1) {
          setCurrentCardIndex((prev) => prev + 1)
        } else {
          setStep("storyboard")
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

  if (step === "storyboard") {
    return <StoryboardStep premise={premise} selectedCards={selectedCards} onReset={resetApp} />
  }

  return null
}
