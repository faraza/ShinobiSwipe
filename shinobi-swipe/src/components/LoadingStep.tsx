import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Heart } from "lucide-react"

interface LoadingStepProps {
  loadingProgress: number
}

export function LoadingStep({ loadingProgress }: LoadingStepProps) {
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