import { render, screen } from '@testing-library/react'
import { MarkdownDescription } from '../components/MarkdownDescription'

const mockReactMarkdown = jest.fn(({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
))

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: (props: any) => mockReactMarkdown(props),
}))

jest.mock('remark-breaks', () => () => null)
jest.mock('remark-gfm', () => () => null)

describe('MarkdownDescription', () => {
  it('renders basic text', () => {
    render(<MarkdownDescription description="Just text" />)
    expect(screen.getByText('Just text')).toBeInTheDocument()
  })

  it('renders chapters as collapsible list', () => {
    const desc = `Intro\n\nChapters\n00:00 Start\n01:00 Middle\n`
    render(<MarkdownDescription description={desc} />)

    const summary = screen.getByText('Chapters')
    expect(summary.tagName).toBe('SUMMARY')

    const details = summary.closest('details')
    expect(details).toBeInTheDocument()
    expect(details).not.toHaveAttribute('open')

    expect(screen.getByText('00:00 Start')).toBeInTheDocument()
    expect(screen.getByText('01:00 Middle')).toBeInTheDocument()
  })

  it('uses GFM and break plugins with block paragraphs', () => {
    render(<MarkdownDescription description="Line one\nhttps://example.com" />)

    const props = mockReactMarkdown.mock.calls[0][0]
    expect(props.remarkPlugins).toHaveLength(2)

    const Paragraph = props.components.p
    const { container } = render(<Paragraph>text</Paragraph>)
    expect(container.querySelector('p')).not.toBeNull()
  })
})
