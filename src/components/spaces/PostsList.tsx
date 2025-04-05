'use client'

import { useState } from 'react'
import { Post } from '@/types/post'
import { Space } from '@/types/space'
import { Comment } from '@/types/comment'
import PostDetails from './PostDetails'

interface PostsListProps {
  posts: Post[]
  comments: Comment[]
  selectedSpace: Space | null
}

export default function PostsList({ posts, comments, selectedSpace }: PostsListProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  
  // Filter posts based on selected space
  const filteredPosts = selectedSpace 
    ? posts.filter(post => post.spaceId === selectedSpace.id)
    : []
  
  const handlePostClick = (post: Post) => {
    setSelectedPost(post)
  }
  
  const handleClosePostDetails = () => {
    setSelectedPost(null)
  }
  
  return (
    <div className="bg-[#CBCBCB] rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-black">
        {selectedSpace ? `Posts in ${selectedSpace.space}` : 'All Posts'}
      </h2>
      
      {selectedPost ? (
        <PostDetails 
          post={selectedPost} 
          comments={comments} 
          onClose={handleClosePostDetails} 
        />
      ) : (
        <>
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <div 
                  key={post.id} 
                  className="bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handlePostClick(post)}
                >
                  <h3 className="text-lg font-semibold text-black mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.content}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div>
                      Posted: {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{post.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{post.downvotes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {selectedSpace 
                  ? `No posts found in ${selectedSpace.space}.` 
                  : 'Select a space to view its posts.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
} 