'use client'

import { Post } from '@/types/post'
import { Comment } from '@/types/comment'

interface PostDetailsProps {
  post: Post
  comments: Comment[]
  onClose: () => void
}

export default function PostDetails({ post, comments, onClose }: PostDetailsProps) {
  // Filter comments for this post
  const postComments = comments.filter(comment => comment.postId === post.id)
  
  return (
    <div className="bg-[#CBCBCB] rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">Post Details</h2>
        <button 
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:text-black hover:border-black transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Post Content */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold text-black mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.content}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div>
            Posted: {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
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
      
      {/* Comments Section */}
      <div>
        <h3 className="text-lg font-semibold text-black mb-4">
          Comments ({postComments.length})
        </h3>
        
        {postComments.length > 0 ? (
          <div className="space-y-4">
            {postComments.map(comment => (
              <div key={comment.id} className="bg-white rounded-lg p-4">
                <p className="text-gray-600 mb-2">{comment.content}</p>
                <div className="text-sm text-gray-500">
                  Posted: {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-4 text-center">
            <p className="text-gray-600">No comments yet.</p>
          </div>
        )}
      </div>
    </div>
  )
} 