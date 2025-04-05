import { render, screen, fireEvent } from '@testing-library/react'
import CommunitiesPage from './page'

describe('CommunitiesPage', () => {
  it('renders tab buttons', () => {
    render(<CommunitiesPage />)
    
    const mineTab = screen.getByRole('button', { name: /mine/i })
    const popularTab = screen.getByRole('button', { name: /popular/i })
    
    expect(mineTab).toBeInTheDocument()
    expect(popularTab).toBeInTheDocument()
  })

  it('switches tabs correctly', () => {
    render(<CommunitiesPage />)
    
    const mineTab = screen.getByRole('button', { name: /mine/i })
    const popularTab = screen.getByRole('button', { name: /popular/i })
    
    // Mine tab should be active by default
    expect(mineTab).toHaveClass('bg-cyan-400')
    expect(popularTab).not.toHaveClass('bg-cyan-400')
    
    // Click popular tab
    fireEvent.click(popularTab)
    expect(popularTab).toHaveClass('bg-cyan-400')
    expect(mineTab).not.toHaveClass('bg-cyan-400')
  })

  it('renders search bar', () => {
    render(<CommunitiesPage />)
    
    const searchInput = screen.getByPlaceholderText(/search/i)
    expect(searchInput).toBeInTheDocument()
    expect(searchInput).toHaveAttribute('type', 'text')
  })

  it('renders content sections', () => {
    render(<CommunitiesPage />)
    
    // Find sections by their headings
    const communitiesHeading = screen.getByRole('heading', { name: /communities/i })
    const postsHeading = screen.getByRole('heading', { name: /posts/i })
    
    expect(communitiesHeading).toBeInTheDocument()
    expect(postsHeading).toBeInTheDocument()
  })
}) 