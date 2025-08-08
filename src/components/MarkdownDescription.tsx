import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

interface MarkdownDescriptionProps {
  description: string
  className?: string
}

export function MarkdownDescription({
  description,
  className = '',
}: MarkdownDescriptionProps) {
  // Handle empty or undefined descriptions
  if (!description || description.trim() === '') {
    return null
  }

  // Clean up any problematic characters that might cause parsing issues
  const cleanDescription = description
    .replace(/^[>,\s]+/, '') // Remove leading >, commas, and whitespace
    .replace(/[>,]+\n/g, '\n') // Remove >, commas before line breaks
    .trim()

  const markdownComponents: Components = {
    // Style links to match the design
    a: ({ children, href, ...props }: any) => (
      <a
        href={href}
        className="text-pink-500 underline hover:text-pink-700"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    // Style lists with proper spacing and inherit text styles
    ul: ({ children, ...props }: any) => (
      <ul className="mt-2 list-inside list-disc space-y-1" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: any) => (
      <ol className="mt-2 list-inside list-decimal space-y-1" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: any) => (
      <li className="text-inherit" {...props}>
        {children}
      </li>
    ),
    // Handle paragraphs with proper spacing
    p: ({ children, ...props }: any) => (
      <p className="mb-2 last:mb-0" {...props}>
        {children}
      </p>
    ),
    // Style emphasis and strong text
    em: ({ children, ...props }: any) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
    strong: ({ children, ...props }: any) => (
      <strong className="font-semibold" {...props}>
        {children}
      </strong>
    ),
  }

  const chaptersMatch = cleanDescription.match(
    /(^|\n)Chapters\n((?:\d{1,2}:\d{2}(?::\d{2})? .*\n?)+)/i,
  )

  const preText = chaptersMatch
    ? cleanDescription.slice(0, chaptersMatch.index ?? 0).trim()
    : cleanDescription

  const postText = chaptersMatch
    ? cleanDescription
        .slice((chaptersMatch.index ?? 0) + chaptersMatch[0].length)
        .trim()
    : ''

  const chapterLines = chaptersMatch
    ? chaptersMatch[2]
        .trim()
        .split('\n')
        .map((line) => line.trim())
    : []

  return (
    <div className={className}>
      {preText && (
        <ReactMarkdown
          remarkPlugins={[remarkBreaks, remarkGfm]}
          components={markdownComponents}
        >
          {preText}
        </ReactMarkdown>
      )}
      {chapterLines.length > 0 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-pink-500 hover:text-pink-700">
            Chapters
          </summary>
          <ul className="mt-2 list-inside list-disc space-y-1">
            {chapterLines.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </details>
      )}
      {postText && (
        <ReactMarkdown
          remarkPlugins={[remarkBreaks, remarkGfm]}
          components={markdownComponents}
        >
          {postText}
        </ReactMarkdown>
      )}
    </div>
  )
}
