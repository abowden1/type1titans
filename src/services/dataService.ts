import { User } from '@/types/user'
import { Space } from '@/types/space'
import { Post } from '@/types/post'
import { Comment } from '@/types/comment'

// Import the sample data
import sampleData from '../../data/sample_forum_data.json'

// Get the current user (the one with isTestUser: true)
export function getCurrentUser(): User {
  return sampleData.users.find(user => user.isTestUser) as User
}

// Get all users
export function getAllUsers(): User[] {
  return sampleData.users
}

// Get a user by ID
export function getUserById(id: string): User | undefined {
  return sampleData.users.find(user => user.id === id)
}

// Get friends of the current user
export function getCurrentUserFriends(): User[] {
  const currentUser = getCurrentUser()
  return sampleData.users.filter(user => currentUser.friends.includes(user.id))
}

// Get all spaces
export function getAllSpaces(): Space[] {
  return sampleData.spaces
}

// Get a space by ID
export function getSpaceById(id: string): Space | undefined {
  return sampleData.spaces.find(space => space.id === id)
}

// Get all posts
export function getAllPosts(): Post[] {
  return sampleData.posts
}

// Get posts by space ID
export function getPostsBySpaceId(spaceId: string): Post[] {
  return sampleData.posts.filter(post => post.spaceId === spaceId)
}

// Get all comments
export function getAllComments(): Comment[] {
  return sampleData.comments
}

// Get comments by post ID
export function getCommentsByPostId(postId: string): Comment[] {
  return sampleData.comments.filter(comment => comment.postId === postId)
} 