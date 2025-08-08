import { render, screen } from '@testing-library/react'
import { Container } from '../components/Container'

describe('Container', () => {
  it('renders children correctly', () => {
    render(
      <Container>
        <div>Test content</div>
      </Container>,
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Container className="custom-class">
        <div>Test content</div>
      </Container>,
    )

    const container = screen.getByText('Test content').closest('.custom-class')
    expect(container).toBeInTheDocument()
  })

  it('has correct default structure', () => {
    render(
      <Container data-testid="container">
        <div>Test content</div>
      </Container>,
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveClass('lg:px-8')
  })
})
