import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { ReactNode, AnchorHTMLAttributes, HTMLAttributes } from 'react'

interface MarkdownDescriptionProps {
  description: string
  className?: string
}

export function MarkdownDescription({ description, className = '' }: MarkdownDescriptionProps) {
  // Handle empty or undefined descriptions
  if (!description || description.trim() === '') {
    return null
  }

  const markdownComponents = {
    // Style links to match the design
    a: ({ children, href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children?: ReactNode }) => (
      <a
        href={href}
        className="text-pink-500 hover:text-pink-700 underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    ),
    // Style lists with proper spacing and inherit text styles
    ul: ({ children, ...props }: HTMLAttributes<HTMLUListElement> & { children?: ReactNode }) => (
      <ul className="list-disc list-inside space-y-1 mt-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: HTMLAttributes<HTMLOListElement> & { children?: ReactNode }) => (
      <ol className="list-decimal list-inside space-y-1 mt-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: HTMLAttributes<HTMLLIElement> & { children?: ReactNode }) => (
      <li className="text-inherit" {...props}>
        {children}
      </li>
    ),
    // Ensure paragraphs render on separate lines
    p: ({ children, ...props }: HTMLAttributes<HTMLParagraphElement> & { children?: ReactNode }) => (
      <p className="mt-2 first:mt-0" {...props}>
        {children}
      </p>
    ),
    // Style emphasis and strong text
    em: ({ children, ...props }: HTMLAttributes<HTMLElement> & { children?: ReactNode }) => (
      <em className="italic" {...props}>
        {children}
      </em>
    ),
    strong: ({ children, ...props }: HTMLAttributes<HTMLElement> & { children?: ReactNode }) => (
      <strong className="font-semibold" {...props}>
        {children}
      </strong>
    ),
  }

  const chaptersMatch = description.match(/(^|\n)Chapters\n((?:\d{1,2}:\d{2}(?::\d{2})? .*\n?)+)/i)

  const preText = chaptersMatch
    ? description.slice(0, chaptersMatch.index ?? 0).trim()
    : description

  const postText = chaptersMatch
    ? description
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
          <ul className="list-disc list-inside space-y-1 mt-2">
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