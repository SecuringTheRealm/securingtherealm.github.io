/**
 * YouTube utility functions
 */

/**
 * Extracts YouTube video ID from a URL and returns the embed URL
 * @param url - YouTube video URL (e.g., https://youtube.com/watch?v=...)
 * @returns Embed URL (e.g., https://www.youtube-nocookie.com/embed/...) or null if invalid
 */
export function getYouTubeEmbedUrl(url: string | undefined): string | null {
	if (!url) return null;

	try {
		const urlObj = new URL(url);

		// Handle youtu.be short links
		if (urlObj.hostname === 'youtu.be') {
			const videoId = urlObj.pathname.slice(1);
			return `https://www.youtube-nocookie.com/embed/${videoId}`;
		}

		// Handle youtube.com URLs
		if (urlObj.hostname.includes('youtube.com')) {
			const videoId = urlObj.searchParams.get('v');
			if (videoId) {
				return `https://www.youtube-nocookie.com/embed/${videoId}`;
			}
		}

		return null;
	} catch {
		return null;
	}
}
