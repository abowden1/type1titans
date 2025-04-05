'use client'

import { useEffect, useState } from 'react'
import UsersTable from '@/components/users/UsersTable'
import { getCurrentUser, getAllUsers } from '@/services/dataService'
import { User } from '@/types/user'

export default function UsersPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load data
    const loadData = () => {
      try {
        const user = getCurrentUser()
        const users = getAllUsers()
        
        setCurrentUser(user)
        setAllUsers(users)
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-white text-xl">User not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      
      {/* Users Table */}
      <UsersTable users={allUsers} currentUser={currentUser} />
    </div>
  )
} 