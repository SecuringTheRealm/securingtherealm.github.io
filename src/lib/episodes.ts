import { XMLParser } from 'fast-xml-parser'
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
  // Fetch the YouTube feed XML
  // Use the recommended Next.js data fetching pattern with proper caching
  const response = await fetch(
    'https://www.youtube.com/feeds/videos.xml?channel_id=UCS4KTDaZTiyiMj2yZztwmlg',
    {
      next: { revalidate: 3600 }, // Revalidate data every hour
    },
  )

  const xmlData = await response.text()

  // Parse the XML with fast-xml-parser - configure to handle namespaces and preserve namespaces
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    isArray: (name) => ['entry'].includes(name),
    processEntities: true,
    parseAttributeValue: true,
  })

  const parsedXml = parser.parse(xmlData)

  // Debug log the structure of the first entry to understand its format
  if (parsedXml.feed.entry && parsedXml.feed.entry.length > 0) {
    console.log(
      'First entry structure:',
      JSON.stringify(parsedXml.feed.entry[0], null, 2),
    )
  }

  // Map the entries to Episode objects
  const episodes: Array<Episode> = parsedXml.feed.entry.map((entry: any) => {
    // Extract the video ID from the entry ID
    const videoId = entry.id.split(':').pop() || ''

    // Get the published date directly from the entry
    let publishedDate: Date
    try {
      if (entry.published) {
        publishedDate = new Date(entry.published)
        console.debug(
          `Episode: "${entry.title}" - Original date: "${entry.published}" - Parsed date: ${publishedDate.toISOString()}`,
        )

        if (isNaN(publishedDate.getTime())) {
          console.warn(
            `Invalid date format for episode: ${entry.title}. Using current date instead.`,
          )
          publishedDate = new Date()
        }
      } else {
        console.warn(
          `No published date found for episode: ${entry.title}. Using current date.`,
        )
        publishedDate = new Date()
      }
    } catch (error) {
      console.error(`Error parsing date for episode: ${entry.title}`, error)
      publishedDate = new Date()
    }

    // Extract the description from media:group/media:description
    let description = ''
    try {
      // Handle different possible locations for the description
      if (entry['media:group'] && entry['media:group']['media:description']) {
        description = entry['media:group']['media:description']
      } else if (entry['media:description']) {
        description = entry['media:description']
      }
    } catch (error) {
      console.error(
        `Error extracting description for episode: ${entry.title}`,
        error,
      )
    }

    return {
      id: parseInt(videoId.replace(/\D/g, ''), 10) || 0,
      title: entry.title,
      published: publishedDate,
      description: description,
      content: description,
      url: entry.link && entry.link['@_href'] ? entry.link['@_href'] : '',
      audio: {
        src: entry.link && entry.link['@_href'] ? entry.link['@_href'] : '',
        type: 'video/mp4',
      },
    }
  })

  return episodes
}
