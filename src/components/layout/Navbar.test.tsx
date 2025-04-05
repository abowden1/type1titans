import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    
    // Check if Home link exists
    const homeLink = screen.getByRole('link', { name: /home/i })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
    
    // Check if Communities link exists
    const communitiesLink = screen.getByRole('link', { name: /communities/i })
    expect(communitiesLink).toBeInTheDocument()
    expect(communitiesLink).toHaveAttribute('href', '/communities')
  })

  it('has correct styling classes', () => {
    render(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('bg-gradient-to-b', 'from-black', 'to-gray-900')
    
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      expect(link).toHaveClass('text-white', 'font-[\'Orbitron\']')
    })
  })
}) 