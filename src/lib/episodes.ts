import { parse as parseFeed } from 'rss-to-json'
import { array, number, object, parse, string } from 'valibot'

export interface Episode {
  id: number
  title: string
  published: Date
  description: string
  content: string
  audio: {
    src: string
    type: string
  }
}

export async function getAllEpisodes() {
  // Get the feed from YouTube
  const feed = await parseFeed(
    'https://www.youtube.com/feeds/videos.xml?channel_id=UCS4KTDaZTiyiMj2yZztwmlg',
  )
  
  // Access the items directly without schema validation
  const items = feed.items

  let episodes: Array<Episode> = items.map(
    ({ id, title, description, published, link, enclosures }) => {
      // Extract videoId from the id field (format: "yt:video:VIDEO_ID")
      const videoId = id.split(':').pop() || ''
      
      return {
        id: parseInt(videoId.replace(/\D/g, ''), 10) || 0, // Extract numbers or use 0
        title: title,
        published: new Date(published),
        description: description,
        content: description,
        audio: {
          // Use the first enclosure or fallback to the YouTube link
          src: enclosures?.[0]?.url || link || '',
          type: enclosures?.[0]?.type || 'video/mp4',
        },
      }
    },
  )

  return episodes
}
