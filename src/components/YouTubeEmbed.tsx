'use client'

import { useState } from 'react'
import { PlayIcon } from '@/components/PlayIcon'
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '@/lib/youtube'

interface YouTubeEmbedProps {
  url: string
  title: string
  className?: string
}

export function YouTubeEmbed({
  url,
  title,
  className = '',
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const videoId = extractYouTubeVideoId(url)

  if (!videoId) {
    return null
  }

  const embedUrl = getYouTubeEmbedUrl(videoId)

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-4 text-sm/6 font-bold">
        <button
          onClick={() => setIsLoaded(true)}
          className="flex items-center text-pink-500 hover:text-pink-700 active:text-pink-900"
          aria-label={`Play video: ${title}`}
        >
          <PlayIcon className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
          &nbsp;Play Video
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-pink-500 hover:text-pink-700 active:text-pink-900"
          aria-label={`Open ${title} on YouTube in new window`}
        >
          <svg
            className="h-2.5 w-2.5 fill-current"
            aria-hidden="true"
            viewBox="0 0 20 20"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-2a1 1 0 10-2 0v2H5V7h2a1 1 0 000-2H5z" />
          </svg>
          &nbsp;Open on YouTube (Opens New Window)
        </a>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        className="h-full w-full rounded-lg"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}
