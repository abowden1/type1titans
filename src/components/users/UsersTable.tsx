'use client'

import { useState } from 'react'
import Image from 'next/image'
import { User } from '@/types/user'
import UserProfile from './UserProfile'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

interface UsersTableProps {
  users: User[]
  currentUser: User
}

export default function UsersTable({ users, currentUser }: UsersTableProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'friends'>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // Filter users based on active tab
  const filteredUsers = activeTab === 'all' 
    ? users 
    : users.filter(user => currentUser.friends.includes(user.id))
  
  const handleUserClick = (user: User) => {
    setSelectedUser(user)
  }
  
  return (
    <div className="bg-[#CBCBCB] rounded-lg p-6">
      {/* Tabs */}
      <div className="flex items-center justify-center mb-6 text-black h-14">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-lg ${orbitron.className} ${
            activeTab === 'all'
              ? 'border-b-2 border-black font-bold'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          All Users
        </button>
        <span className="mx-4 text-gray-600">|</span>
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 text-lg ${orbitron.className} ${
            activeTab === 'friends'
              ? 'border-b-2 border-black font-bold'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          Friends
        </button>
      </div>
      
      {/* Selected User Profile */}
      {selectedUser && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-black">User Details</h2>
            <button 
              onClick={() => setSelectedUser(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:text-black hover:border-black transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <UserProfile user={selectedUser} />
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-3 px-4 text-left text-black font-semibold">User</th>
              <th className="py-3 px-4 text-left text-black font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-black font-semibold">Member Since</th>
              <th className="py-3 px-4 text-left text-black font-semibold">Friends</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr 
                key={user.id} 
                className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleUserClick(user)}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image 
                        src={user.profilePicture} 
                        alt={`${user.firstname} ${user.lastname}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-black">{user.firstname} {user.lastname}</p>
                      <p className="text-sm text-gray-600">{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-600">{user.email}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-600">{user.friends.length}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 