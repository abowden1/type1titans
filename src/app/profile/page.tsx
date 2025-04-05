'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCurrentUser, getCurrentUserFriends } from '@/services/dataService'
import { User } from '@/types/user'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [friends, setFriends] = useState<User[]>([])
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user data
    const loadUserData = () => {
      try {
        const currentUser = getCurrentUser()
        const userFriends = getCurrentUserFriends()
        
        setUser(currentUser)
        setFriends(userFriends)
      } catch (error) {
        console.error('Error loading user data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-white text-xl">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
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
      {/* Profile Header */}
      <div className="bg-[#CBCBCB] rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <Image 
              src={user.profilePicture} 
              alt={`${user.firstname} ${user.lastname}`}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-black mb-2">
              {user.firstname} {user.lastname}
            </h1>
            <p className="text-gray-600 mb-4">@{user.username}</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <p className="text-sm text-gray-500">Friends</p>
                <p className="text-xl font-semibold text-black">{user.friends.length}</p>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-xl font-semibold text-black">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short'
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-start gap-2">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md transition-colors">
                Edit Profile
              </button>
              <Link href="/users" className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition-colors">
                Find Friends
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex items-center justify-center mb-6 text-white h-14">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-lg ${
            activeTab === 'overview'
              ? 'border-b-2 border-white font-bold'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Overview
        </button>
        <span className="mx-4 text-gray-300">|</span>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-4 py-2 text-lg ${
            activeTab === 'activity'
              ? 'border-b-2 border-white font-bold'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Activity
        </button>
        <span className="mx-4 text-gray-300">|</span>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-lg ${
            activeTab === 'settings'
              ? 'border-b-2 border-white font-bold'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Settings
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="bg-[#CBCBCB] rounded-lg p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black">About Me</h2>
            <div className="bg-white rounded-lg p-4 mb-6">
              <p className="text-gray-600">
                This is a placeholder for the user's bio. In a real application, this would be editable by the user.
              </p>
            </div>
            
            <h2 className="text-xl font-semibold mb-4 text-black">Friends</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {friends.length > 0 ? (
                friends.map(friend => (
                  <div key={friend.id} className="bg-white rounded-lg p-4 text-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-2">
                      <Image 
                        src={friend.profilePicture} 
                        alt={`${friend.firstname} ${friend.lastname}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium text-black">{friend.firstname} {friend.lastname}</p>
                    <p className="text-sm text-gray-600">@{friend.username}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-2 md:col-span-4 text-center py-4">
                  <p className="text-gray-600">You don't have any friends yet.</p>
                  <Link href="/users" className="text-cyan-500 hover:underline mt-2 inline-block">
                    Find friends
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black">Recent Activity</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-600">No recent activity to display.</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black">Account Settings</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium text-black mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.firstname}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.lastname}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input 
                      type="text" 
                      defaultValue={user.username}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md transition-colors">
                  Save Changes
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-medium text-black mb-2">Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 