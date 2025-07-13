import React from "react"

interface DialogueCardProps {
  speaker1: string
  speaker2: string
  speaker1_2: string
}

export default function DialogueCard({
  speaker1,
  speaker2,
  speaker1_2,
}: DialogueCardProps) {
  return (
    <div className="w-[90vw] max-w-[500px] min-h-[400px] bg-neutral-50 rounded-3xl shadow-xl p-6 flex flex-col justify-center space-y-6">
      {/* Speaker 1 */}
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-indigo-200 text-indigo-800 font-bold rounded-full flex items-center justify-center flex-shrink-0">
          1
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-gray-800 max-w-[70%]">
          {speaker1}
        </div>
      </div>

      {/* Speaker 2 */}
      <div className="flex items-start space-x-3 flex-row-reverse">
        <div className="w-8 h-8 bg-pink-200 text-pink-800 font-bold rounded-full flex items-center justify-center flex-shrink-0">
          2
        </div>
        <div className="bg-pink-100 px-4 py-2 rounded-xl shadow-sm text-gray-800 max-w-[70%]">
          {speaker2}
        </div>
      </div>

      {/* Speaker 1 again */}
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-indigo-200 text-indigo-800 font-bold rounded-full flex items-center justify-center flex-shrink-0">
          1
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-gray-800 max-w-[70%]">
          {speaker1_2}
        </div>
      </div>
    </div>
  )
} 