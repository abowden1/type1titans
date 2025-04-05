'use client'

import { useState, useEffect } from 'react'
import { Space } from '@/types/space'
import { Post } from '@/types/post'
import { Comment } from '@/types/comment'
import SpacesTable from '@/components/spaces/SpacesTable'
import PostsList from '@/components/spaces/PostsList'
import { getAllSpaces, getAllPosts, getAllComments } from '@/services/dataService'

export default function SpacesPage() {
  const [spaces, setSpaces] = useState<Space[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState<'spaces' | 'posts'>('spaces')

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [spacesData, postsData, commentsData] = await Promise.all([
          getAllSpaces(),
          getAllPosts(),
          getAllComments()
        ])
        setSpaces(spacesData)
        setPosts(postsData)
        setComments(commentsData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleSpaceSelect = (space: Space | null) => {
    setSelectedSpace(space)
    if (isMobile) {
      setActiveSection('posts')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search spaces..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {isMobile ? (
        <div>
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  activeSection === 'spaces'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveSection('spaces')}
              >
                Spaces
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  activeSection === 'posts'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveSection('posts')}
              >
                Posts
              </button>
            </div>
          </div>

          {activeSection === 'spaces' ? (
            <SpacesTable
              spaces={spaces}
              selectedSpace={selectedSpace}
              onSpaceSelect={handleSpaceSelect}
              searchQuery={searchQuery}
            />
          ) : (
            <PostsList
              posts={posts}
              comments={comments}
              selectedSpace={selectedSpace}
            />
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SpacesTable
            spaces={spaces}
            selectedSpace={selectedSpace}
            onSpaceSelect={handleSpaceSelect}
            searchQuery={searchQuery}
          />
          <PostsList
            posts={posts}
            comments={comments}
            selectedSpace={selectedSpace}
          />
        </div>
      )}
    </div>
  )
} 