import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Scans the public directory for PDF files and returns their URLs
 * @param {string} siteUrl - The base site URL (e.g., 'https://securing.quest')
 * @returns {string[]} Array of PDF URLs to include in sitemap
 */
export function findPdfs(siteUrl) {
	const __dirname = fileURLToPath(new URL('.', import.meta.url));
	const publicDir = join(__dirname, '../../public');

	try {
		// Recursively read all files in public directory
		const files = readdirSync(publicDir, { recursive: true, encoding: 'utf-8' });

		// Filter for PDF files and convert to URLs
		const pdfUrls = files
			.filter(file => file.endsWith('.pdf'))
			.map(file => {
				// Convert Windows backslashes to forward slashes
				const normalizedPath = file.replace(/\\/g, '/');
				return `${siteUrl}/${normalizedPath}`;
			});

		return pdfUrls;
	} catch (error) {
		console.warn('Warning: Could not scan public directory for PDFs:', error.message);
		return [];
	}
}
