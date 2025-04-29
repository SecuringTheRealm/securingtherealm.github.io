import { parse as parseFeed } from 'rss-to-json'
import { array, number, object, parse, string } from 'valibot'

export interface Episode {
  id: number
  title: string
  published: Date
  description: string
  content: string
  url: string
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
    ({ id, title, content, description, published, link, enclosures }) => {
      // Extract videoId from the id field (format: "yt:video:VIDEO_ID")
      const videoId = id.split(':').pop() || ''

      // Parse the published date with proper error handling
      let publishedDate: Date;
      try {
        // The YouTube feed provides dates in ISO 8601 format
        publishedDate = new Date(published);

        // Validate the date is not Invalid Date
        if (isNaN(publishedDate.getTime())) {
          console.warn(`Invalid date format for episode: ${title}. Using current date instead.`);
          publishedDate = new Date();
        }
      } catch (error) {
        console.error(`Error parsing date for episode: ${title}`, error);
        publishedDate = new Date();
      }

      return {
        id: parseInt(videoId.replace(/\D/g, ''), 10) || 0, // Extract numbers or use 0
        title: title,
        published: publishedDate,
        description: description,
        content: description,
        url: link,
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
