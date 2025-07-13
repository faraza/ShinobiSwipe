import Image from "next/image"

interface ImageCardProps {
  imageUrl: string
  alt?: string
  caption?: string
}

export function ImageCard({ imageUrl, alt = "Content", caption }: ImageCardProps) {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={alt}
          width={300}
          height={400}
          className="object-contain max-h-full max-w-full"
        />
      </div>
      {caption && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 font-medium px-4">{caption}</p>
        </div>
      )}
    </div>
  )
} 