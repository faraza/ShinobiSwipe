"use client"

import { motion, type PanInfo, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CardData } from "@/types"
import { ImageCard } from "./ImageCard"
import DialogueCard from "./DialogueCard"

interface SwipeCardProps {
  card: CardData
  isActive: boolean
  onSwipe: (direction: "left" | "right") => void
  stackPosition: number
  totalCards: number
}

export function SwipeCard({ card, isActive, onSwipe, stackPosition, totalCards }: SwipeCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-300, 300], [-15, 15])
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      onSwipe("right")
    } else if (info.offset.x < -100) {
      onSwipe("left")
    }
  }

  const scale = Math.max(0.9, 1 - Math.abs(stackPosition) * 0.05)
  const yOffset = Math.abs(stackPosition) * 8
  const cardOpacity = stackPosition > 2 ? 0 : 1 - Math.abs(stackPosition) * 0.2

  if (!isActive && stackPosition !== 1 && stackPosition !== 2) return null

  const cardStyle = {
    scale,
    y: yOffset,
    opacity: cardOpacity,
    zIndex: 10 - Math.abs(stackPosition),
    ...(isActive ? { x, rotate } : {}),
  }

  const renderCardContent = () => {
    if (card.type === "image") {
      return (
        <div className="w-full flex flex-col items-center text-center space-y-4">
          <p className="text-sm text-purple-600">Video Frame</p>
          
          <div className="rounded-2xl overflow-hidden w-full max-w-[300px] aspect-square shadow-md bg-gray-100">
            <img 
              src={card.imageUrl || "/placeholder.svg"} 
              alt={card.caption || "Card image"}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold text-center text-black leading-snug">
            {card.caption}
          </h1>
        </div>
      )
    } else if (card.type === "text") {
      return (
        <div className="w-full flex flex-col items-center text-center space-y-4">
          <p className="text-sm text-purple-600">Dialogue</p>
          <h1 className="text-2xl font-bold text-center text-black leading-snug">
            {card.content as string}
          </h1>
        </div>
      )
    } else {
      const dialogueContent = card.content as {
        speaker1: string
        speaker2: string
        speaker1_2: string
      }
      return (
        <div className="w-full flex flex-col items-center text-center space-y-4">
          <p className="text-sm text-purple-600">Dialogue</p>
          <h1 className="text-2xl font-bold text-center text-black leading-snug">
            {dialogueContent.speaker1}
          </h1>
          <p className="text-lg text-center text-gray-600">
            {dialogueContent.speaker2}
          </p>
        </div>
      )
    }
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={cardStyle}
      drag={isActive ? "x" : false}
      dragConstraints={isActive ? { left: 0, right: 0 } : undefined}
      onDragEnd={isActive ? handleDragEnd : undefined}
      whileDrag={isActive ? { scale: 1.05 } : undefined}
    >
      <div className="h-full w-full rounded-3xl bg-gradient-to-b from-purple-400 to-blue-200 p-6 flex flex-col justify-between">
        {/* Tip at the top */}
        <div className="flex items-center gap-2 text-sm text-white/90">
          <span className="text-xl">💡</span>
          <span>You can swipe right or left to answer positive or negative respectively.</span>
        </div>

        {/* Main card content */}
        <Card className="bg-white rounded-3xl shadow-xl px-6 py-8">
          <CardContent className="flex flex-col items-center space-y-4">
            {renderCardContent()}
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <button 
            className="w-14 h-14 rounded-full bg-white shadow-md text-2xl hover:bg-gray-50 transition-colors"
            onClick={() => onSwipe("left")}
          >
            👎
          </button>
          <button 
            className="w-14 h-14 rounded-full bg-white shadow-md text-2xl hover:bg-gray-50 transition-colors"
            onClick={() => onSwipe("right")}
          >
            👍
          </button>
        </div>
      </div>
    </motion.div>
  )
}
