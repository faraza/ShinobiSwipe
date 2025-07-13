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
}

export function SwipeCard({ card, isActive, onSwipe, stackPosition }: SwipeCardProps) {
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
    ...(isActive ? { x, rotate } : {}),
  }

  const renderCardContent = () => {
    if (card.type === "image") {
      return (
        <div className="flex flex-col items-center space-y-3">
          <p className="text-sm text-muted-foreground">Prompt by user</p>
          <h2 className="text-xl font-semibold text-center">Here’s a cool idea</h2>

          <div className="rounded-xl overflow-hidden shadow-md w-full max-w-[320px] aspect-square bg-gray-100">
            <ImageCard imageUrl={card.imageUrl || "/placeholder.svg?height=600&width=400"} />
          </div>

          <p className="text-center text-sm text-gray-600">This would be so funny if we added a twist at the end.</p>
        </div>
      )
    } else {
      const dialogueContent = card.content as {
        speaker1: string
        speaker2: string
        speaker1_2: string
      }
      return (
        <DialogueCard
          speaker1={dialogueContent.speaker1}
          speaker2={dialogueContent.speaker2}
          speaker1_2={dialogueContent.speaker1_2}
        />
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
      <Card className="h-full bg-white rounded-2xl shadow-xl overflow-visible cursor-grab active:cursor-grabbing">
        <CardContent className="h-full p-6 flex items-center justify-center">
          {renderCardContent()}
        </CardContent>
      </Card>
    </motion.div>
  )
}
