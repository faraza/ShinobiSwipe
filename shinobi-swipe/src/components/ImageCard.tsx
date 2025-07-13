import Image from "next/image"

interface ImageCardProps {
  imageUrl: string
  alt?: string
}

export function ImageCard({ imageUrl, alt = "Content" }: ImageCardProps) {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <Image
        src={imageUrl}
        alt={alt}
        width={300}
        height={400}
        className="object-contain max-h-full max-w-full"
      />
    </div>
  )
} 