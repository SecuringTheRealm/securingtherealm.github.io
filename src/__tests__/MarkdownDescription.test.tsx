import { render, screen } from '@testing-library/react'
import { MarkdownDescription } from '../components/MarkdownDescription'

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))
jest.mock('remark-breaks', () => () => null)

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
})
