import ReactMarkdown from 'react-markdown'

interface MarkdownDescriptionProps {
  description: string
  className?: string
}

export function MarkdownDescription({ description, className = '' }: MarkdownDescriptionProps) {
  // Handle empty or undefined descriptions
  if (!description || description.trim() === '') {
    return null
  }

  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          // Style links to match the design
          a: ({ children, href, ...props }) => (
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
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-1 mt-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-1 mt-2" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-inherit" {...props}>
              {children}
            </li>
          ),
          // Handle paragraphs inline for description context
          p: ({ children, ...props }) => (
            <span {...props}>
              {children}
            </span>
          ),
          // Style emphasis and strong text
          em: ({ children, ...props }) => (
            <em className="italic" {...props}>
              {children}
            </em>
          ),
          strong: ({ children, ...props }) => (
            <strong className="font-semibold" {...props}>
              {children}
            </strong>
          ),
        }}
      >
        {description}
      </ReactMarkdown>
    </div>
  )
}