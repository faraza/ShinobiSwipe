"use client"

import type React from "react"
import { useState } from "react"
import { InputStep } from "@/components/InputStep"
import { LoadingStep } from "@/components/LoadingStep"
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
    content: "Zabuza says he always supported naruto. \n\nThe interviewer reminds him that he tried to cut him in half with a giant sword.",
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
    type: "dialogue",
    content: {
      speaker1: "blah",
      speaker2: "Hi",
      speaker1_2: "Yo",
    },
  },
]

export default function Component() {
  const [step, setStep] = useState<"input" | "loading" | "swiping" | "storyboard">("swiping")
  const [premise, setPremise] = useState("")
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [selectedCards, setSelectedCards] = useState<CardData[]>([])
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isRecalculating, setIsRecalculating] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!premise.trim()) return

    setStep("loading")

    // Simulate loading with progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setLoadingProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setStep("swiping")
        }, 500)
      }
    }, 200)
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
    setLoadingProgress(0)
    setIsRecalculating(false)
  }

  if (step === "input") {
    return <InputStep premise={premise} setPremise={setPremise} onSubmit={handleSubmit} />
  }

  if (step === "loading") {
    return <LoadingStep loadingProgress={loadingProgress} />
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
