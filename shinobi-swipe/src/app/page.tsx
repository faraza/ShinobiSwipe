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
  },
  {
    id: 2,
    type: "dialogue",
    content: {
      speaker1: "blah",
      speaker2: "Hi",
      speaker1_2: "Yo",
    },
  },
  {
    id: 3,
    type: "image",
    content: "",
    imageUrl: "/clone.png",
  },
  {
    id: 4,
    type: "image",
    content: "",
    imageUrl: "/meth.png",
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
    }

    if (currentCardIndex < sampleCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1)
    } else {
      setStep("storyboard")
    }
  }

  const resetApp = () => {
    setStep("input")
    setPremise("")
    setCurrentCardIndex(0)
    setSelectedCards([])
    setLoadingProgress(0)
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
      />
    )
  }

  if (step === "storyboard") {
    return <StoryboardStep premise={premise} selectedCards={selectedCards} onReset={resetApp} />
  }

  return null
}
