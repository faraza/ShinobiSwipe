"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion, type PanInfo, useMotionValue, useTransform } from "framer-motion"
import { X, Heart, ArrowLeft, RotateCcw } from "lucide-react"
import Image from "next/image"

interface CardData {
  id: number
  type: "image" | "dialogue"
  content: string | { speaker1: string; speaker2: string; speaker1_2: string }
  imageUrl?: string
}

const sampleCards: CardData[] = [
  {
    id: 1,
    type: "image",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: 2,
    type: "dialogue",
    content: {
      speaker1: "Did you hear about the new restaurant?",
      speaker2: "No, what about it?",
      speaker1_2: "They serve food on trampolines. It's a spring roll place!",
    },
  },
  {
    id: 3,
    type: "image",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
  {
    id: 4,
    type: "dialogue",
    content: {
      speaker1: "I'm reading a book about anti-gravity.",
      speaker2: "How is it?",
      speaker1_2: "It's impossible to put down!",
    },
  },
  {
    id: 5,
    type: "dialogue",
    content: {
      speaker1: "Why don't scientists trust atoms?",
      speaker2: "I don't know, why?",
      speaker1_2: "Because they make up everything!",
    },
  },
  {
    id: 6,
    type: "image",
    content: "",
    imageUrl: "/placeholder.svg?height=600&width=400",
  },
]

export default function Component() {
  const [step, setStep] = useState<"input" | "loading" | "swiping" | "storyboard">("input")
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
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-400 to-red-500 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                Content Swiper
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="premise" className="block text-sm font-medium mb-3 text-gray-700">
                  Enter your video premise:
                </label>
                <Input
                  id="premise"
                  type="text"
                  value={premise}
                  onChange={(e) => setPremise(e.target.value)}
                  placeholder="e.g., A day in the life of a programmer"
                  className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-pink-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-xl text-white font-semibold text-lg"
                disabled={!premise.trim()}
              >
                Start Swiping
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-400 to-red-500 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white rounded-2xl shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Generating content...</h2>
            </div>
            <div className="space-y-4">
              <Progress value={loadingProgress} className="w-full h-3 rounded-full" />
              <p className="text-center text-lg font-medium text-gray-600">{loadingProgress}% complete</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "swiping") {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <Button variant="ghost" onClick={resetApp} className="text-gray-600">
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
                  onSwipe={handleSwipe}
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
              onClick={() => handleSwipe("left")}
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
              onClick={() => handleSwipe("right")}
            >
              <Heart className="w-8 h-8 text-green-500" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === "storyboard") {
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
                onClick={resetApp}
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

  return null
}

interface SwipeCardProps {
  card: CardData
  isActive: boolean
  onSwipe: (direction: "left" | "right") => void
  stackPosition: number
}

function SwipeCard({ card, isActive, onSwipe, stackPosition }: SwipeCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 300], [-30, 30])
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe("right")
    } else if (info.offset.x < -100) {
      onSwipe("left")
    }
  }

  // Calculate card positioning for stack effect
  const scale = Math.max(0.9, 1 - Math.abs(stackPosition) * 0.05)
  const yOffset = Math.abs(stackPosition) * 8
  const cardOpacity = stackPosition > 2 ? 0 : 1 - Math.abs(stackPosition) * 0.2

  if (!isActive && stackPosition !== 1 && stackPosition !== 2) {
    return null
  }

  const cardStyle = {
    scale,
    y: yOffset,
    opacity: cardOpacity,
    zIndex: 10 - Math.abs(stackPosition),
  }

  if (!isActive) {
    return (
      <motion.div className="absolute inset-0" style={cardStyle}>
        <Card className="h-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <CardContent className="h-full p-0">
            {card.type === "image" ? (
              <div className="h-full relative">
                <Image
                  src={card.imageUrl || "/placeholder.svg?height=600&width=400"}
                  alt="Content"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="space-y-6 text-center">
                  <div className="text-lg leading-relaxed">
                    <div className="mb-4">
                      <span className="font-semibold text-gray-800">Speaker 1:</span>{" "}
                      <span className="text-gray-700">{(card.content as any).speaker1}</span>
                    </div>
                    <div className="mb-4">
                      <span className="font-semibold text-gray-800">Speaker 2:</span>{" "}
                      <span className="text-gray-700">{(card.content as any).speaker2}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">Speaker 1:</span>{" "}
                      <span className="text-gray-700">{(card.content as any).speaker1_2}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, rotate, ...cardStyle }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
    >
      <Card className="h-full cursor-grab active:cursor-grabbing bg-white rounded-2xl shadow-xl overflow-hidden">
        <CardContent className="h-full p-0">
          {card.type === "image" ? (
            <div className="h-full relative">
              <Image
                src={card.imageUrl || "/placeholder.svg?height=600&width=400"}
                alt="Content"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8">
              <div className="space-y-6 text-center">
                <div className="text-lg leading-relaxed">
                  <div className="mb-4">
                    <span className="font-semibold text-gray-800">Speaker 1:</span>{" "}
                    <span className="text-gray-700">{(card.content as any).speaker1}</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold text-gray-800">Speaker 2:</span>{" "}
                    <span className="text-gray-700">{(card.content as any).speaker2}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Speaker 1:</span>{" "}
                    <span className="text-gray-700">{(card.content as any).speaker1_2}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
