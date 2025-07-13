// API utility functions for Gemini Veo3 and Imagen

export interface VideoGenerationRequest {
  prompt: string
  storyboard?: any[]
}

export interface VideoGenerationResponse {
  success: boolean
  videoUrl?: string
  taskId?: string
  status?: string
  error?: string
}

export interface ImageGenerationRequest {
  prompt: string
  style?: string
  aspectRatio?: string
}

export interface ImageGenerationResponse {
  success: boolean
  images?: Array<{
    imageUrl: string
    mimeType: string
  }>
  error?: string
}

export interface VideoStatusResponse {
  success: boolean
  status?: string
  videoUrl?: string
  progress?: number
  error?: string
}

// Generate video using Gemini Veo3
export async function generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
  try {
    const response = await fetch('/api/gemini-veo3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Video generation error:', error)
    return {
      success: false,
      error: 'Failed to generate video'
    }
  }
}

// Check video generation status
export async function checkVideoStatus(taskId: string): Promise<VideoStatusResponse> {
  try {
    const response = await fetch(`/api/gemini-veo3?taskId=${taskId}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Video status check error:', error)
    return {
      success: false,
      error: 'Failed to check video status'
    }
  }
}

// Generate image using Imagen
export async function generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
  try {
    const response = await fetch('/api/imagen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Image generation error:', error)
    return {
      success: false,
      error: 'Failed to generate image'
    }
  }
}

// Get Imagen API info
export async function getImagenInfo() {
  try {
    const response = await fetch('/api/imagen')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Imagen info error:', error)
    return null
  }
}

// Utility function to poll video status until completion
export async function pollVideoStatus(
  taskId: string, 
  onProgress?: (progress: number) => void,
  maxAttempts: number = 60,
  intervalMs: number = 5000
): Promise<VideoStatusResponse> {
  let attempts = 0
  
  while (attempts < maxAttempts) {
    const status = await checkVideoStatus(taskId)
    
    if (!status.success) {
      return status
    }
    
    if (status.progress && onProgress) {
      onProgress(status.progress)
    }
    
    if (status.status === 'completed' && status.videoUrl) {
      return status
    }
    
    if (status.status === 'failed') {
      return {
        success: false,
        error: 'Video generation failed'
      }
    }
    
    attempts++
    await new Promise(resolve => setTimeout(resolve, intervalMs))
  }
  
  return {
    success: false,
    error: 'Video generation timed out'
  }
} 