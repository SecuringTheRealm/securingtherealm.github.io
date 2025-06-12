'use client'

import { useState } from 'react'
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '@/lib/youtube'

interface YouTubeEmbedProps {
  url: string
  title: string
  className?: string
}

export function YouTubeEmbed({ url, title, className = '' }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoId = extractYouTubeVideoId(url)

  if (!videoId) {
    return null
  }

  const embedUrl = getYouTubeEmbedUrl(videoId)

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg">
          <button
            onClick={() => setIsLoaded(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            aria-label={`Play video: ${title}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 5v10l8-5-8-5z" />
            </svg>
            Play Video
          </button>
        </div>
      )}
      {isLoaded && (
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full rounded-lg"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      )}
    </div>
  )
}