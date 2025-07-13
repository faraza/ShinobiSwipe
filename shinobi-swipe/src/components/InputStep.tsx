import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { useState, useEffect } from "react"

interface InputStepProps {
  premise: string
  setPremise: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function InputStep({ premise, setPremise, onSubmit }: InputStepProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const messages = [
    "Generating punchlines",
    "Selecting punchlines"
  ]

  useEffect(() => {
    if (isLoading) {
      setMessageIndex(0)
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length)
      }, 2000) // Change message every 2 seconds (4 seconds / 2 messages)

      return () => clearInterval(interval)
    }
  }, [isLoading, messages.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!premise.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onSubmit(e)
    }, 4000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm">
          <div className="relative h-[600px]">
            <div className="absolute inset-0">
              <div className="h-full w-full rounded-3xl bg-gradient-to-b from-purple-400 to-blue-200 p-6 flex flex-col justify-between">
                {/* Tip at the top */}
                <div className="flex items-center gap-2 text-sm text-white/90">
                  <span className="text-xl">💡</span>
                  <span>You can swipe right or left to answer positive or negative respectively.</span>
                </div>

                {/* Loading card content */}
                <Card className="bg-white rounded-3xl shadow-xl px-6 py-8">
                  <CardContent className="flex flex-col items-center space-y-6">
                    <p className="text-sm text-purple-600">Processing</p>
                    <h1 className="text-2xl font-bold text-center text-black leading-snug">
                      {messages[messageIndex]}
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

                {/* Buttons (disabled) */}
                <div className="flex justify-center gap-6 mt-6">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-purple-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        <div className="relative h-[600px]">
          <div className="absolute inset-0">
            <div className="h-full w-full rounded-3xl bg-gradient-to-b from-purple-400 to-blue-200 p-6 flex flex-col justify-between">
              {/* Tip at the top */}
              <div className="flex items-center gap-2 text-sm text-white/90">
                <span className="text-xl">💡</span>
                <span>You can swipe right or left to answer positive or negative respectively.</span>
              </div>

              {/* Input card content */}
              <Card className="bg-white rounded-3xl shadow-xl px-6 py-8">
                <CardContent className="flex flex-col items-center space-y-6">
                  <p className="text-sm text-purple-600">Setup</p>
                  <h1 className="text-2xl font-bold text-center text-black leading-snug">
                    Enter your video premise
                  </h1>
                  <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <Input
                      type="text"
                      value={premise}
                      onChange={(e) => setPremise(e.target.value)}
                      placeholder="e.g., A day in the life of a programmer"
                      className="w-full h-12 rounded-xl border-2 border-gray-200 focus:border-purple-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSubmit(e)
                        }
                      }}
                    />
                  </form>
                </CardContent>
              </Card>

              {/* Buttons */}
              <div className="flex justify-center gap-6 mt-6">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 