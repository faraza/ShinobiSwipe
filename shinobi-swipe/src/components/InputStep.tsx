import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface InputStepProps {
  premise: string
  setPremise: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function InputStep({ premise, setPremise, onSubmit }: InputStepProps) {
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
          <form onSubmit={onSubmit} className="space-y-6">
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