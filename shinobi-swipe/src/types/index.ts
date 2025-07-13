export interface DialogueContent {
  speaker1: string
  speaker2: string
  speaker1_2: string
}

export interface CardData {
  id: number
  type: "image" | "dialogue" | "text"
  content: string | DialogueContent
  imageUrl?: string
  caption?: string
} 