'use client'

import { useState } from 'react'
import { PlayIcon } from '@/components/PlayIcon'
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

  if (!isLoaded) {
    return (
      <button
        onClick={() => setIsLoaded(true)}
        className="flex items-center text-sm/6 font-bold text-pink-500 hover:text-pink-700 active:text-pink-900"
        aria-label={`Play video: ${title}`}
      >
        <PlayIcon className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
        &nbsp;Play video
      </button>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full rounded-lg"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}