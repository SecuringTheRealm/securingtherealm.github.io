/**
 * Syncs YouTube videos from the Securing the Realm channel feed into the talks collection.
 * Only adds videos that don't already exist in the collection (checks by videoUrl).
 * Run this script before building: `npx tsx scripts/sync-youtube-talks.ts`
 */

import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';
import * as path from 'path';

interface YouTubeEntry {
  id: string;
  title: string;
  published: string;
  link: {
    '@_href': string;
  };
  'media:group'?: {
    'media:description'?: string;
  };
}

interface Talk {
  title: string;
  date: string;
  event: string;
  videoUrl: string;
  slidesUrl?: string;
  summary: string;
  tags: string[];
}

const YOUTUBE_CHANNEL_ID = 'UCS4KTDaZTiyiMj2yZztwmlg';
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
const TALKS_DIR = path.join(process.cwd(), 'src/content/talks');

/**
 * Fetches and parses the YouTube RSS feed
 */
async function fetchYouTubeFeed(): Promise<YouTubeEntry[]> {
  try {
    const response = await fetch(YOUTUBE_FEED_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch YouTube feed: ${response.statusText}`);
    }

    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      isArray: (name: string) => ['entry'].includes(name),
      processEntities: true,
      parseAttributeValue: true,
    });

    const parsedXml = parser.parse(xmlData);
    
    if (!parsedXml.feed || !parsedXml.feed.entry) {
      console.warn('No entries found in YouTube feed');
      return [];
    }

    return parsedXml.feed.entry as YouTubeEntry[];
  } catch (error) {
    console.error('Error fetching YouTube feed:', error);
    throw error;
  }
}

/**
 * Gets all existing talk files and extracts their videoUrls
 */
function getExistingVideoUrls(): Set<string> {
  const videoUrls = new Set<string>();
  
  if (!fs.existsSync(TALKS_DIR)) {
    fs.mkdirSync(TALKS_DIR, { recursive: true });
    return videoUrls;
  }

  const files = fs.readdirSync(TALKS_DIR);
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(TALKS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      try {
        const talk = JSON.parse(content) as Talk;
        if (talk.videoUrl) {
          videoUrls.add(talk.videoUrl);
        }
      } catch (error) {
        console.warn(`Failed to parse ${file}:`, error);
      }
    }
  }

  return videoUrls;
}

/**
 * Converts a YouTube entry to a Talk object
 */
function entryToTalk(entry: YouTubeEntry): Talk {
  const videoUrl = entry.link['@_href'] || '';
  const publishedDate = new Date(entry.published);
  
  // Extract description
  let description = '';
  if (entry['media:group'] && entry['media:group']['media:description']) {
    description = entry['media:group']['media:description'];
  }

  // Truncate description to a reasonable length for summary
  const summary = description.length > 200 
    ? description.substring(0, 197) + '...'
    : description;

  // Generate filename-safe slug from title
  const slug = entry.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return {
    title: entry.title,
    date: publishedDate.toISOString().split('T')[0],
    event: 'YouTube - Securing the Realm',
    videoUrl,
    summary: summary || 'A video from the Securing the Realm YouTube channel.',
    tags: ['YouTube', 'Video'],
  };
}

/**
 * Saves a talk to a JSON file
 */
function saveTalk(talk: Talk): string {
  // Generate filename from title
  const filename = talk.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50) // Limit filename length
    + '.json';

  const filePath = path.join(TALKS_DIR, filename);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`  ⏭️  Skipping ${filename} (file already exists)`);
    return filename;
  }

  fs.writeFileSync(filePath, JSON.stringify(talk, null, 2) + '\n', 'utf-8');
  return filename;
}

/**
 * Main function
 */
async function main() {
  console.log('🎬 Syncing YouTube videos to talks collection...\n');

  try {
    // Fetch YouTube feed
    console.log(`Fetching feed from: ${YOUTUBE_FEED_URL}`);
    const entries = await fetchYouTubeFeed();
    console.log(`Found ${entries.length} videos in feed\n`);

    // Get existing video URLs
    const existingUrls = getExistingVideoUrls();
    console.log(`Found ${existingUrls.size} existing talks\n`);

    // Filter and convert entries
    let addedCount = 0;
    let skippedCount = 0;

    for (const entry of entries) {
      const videoUrl = entry.link['@_href'] || '';
      
      if (existingUrls.has(videoUrl)) {
        console.log(`⏭️  Skipping: ${entry.title}`);
        console.log(`   (Already exists: ${videoUrl})\n`);
        skippedCount++;
        continue;
      }

      const talk = entryToTalk(entry);
      const filename = saveTalk(talk);
      
      console.log(`✅ Added: ${entry.title}`);
      console.log(`   File: ${filename}`);
      console.log(`   Date: ${talk.date}`);
      console.log(`   URL: ${videoUrl}\n`);
      
      addedCount++;
    }

    // Summary
    console.log('─'.repeat(60));
    console.log(`✨ Sync complete!`);
    console.log(`   Added: ${addedCount} new talks`);
    console.log(`   Skipped: ${skippedCount} existing talks`);
    console.log(`   Total in feed: ${entries.length}`);
    console.log('─'.repeat(60));

  } catch (error) {
    console.error('❌ Error syncing YouTube talks:', error);
    process.exit(1);
  }
}

// Run the script
main();
