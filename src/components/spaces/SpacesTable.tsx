'use client'

import { useState } from 'react'
import { Space } from '@/types/space'
import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({ subsets: ['latin'] })

interface SpacesTableProps {
  spaces: Space[]
  onSpaceSelect: (space: Space) => void
}

export default function SpacesTable({ spaces, onSpaceSelect }: SpacesTableProps) {
  const [activeTab, setActiveTab] = useState<'mine' | 'popular'>('mine')
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)
  
  // Filter spaces based on active tab (for now, we'll just use all spaces)
  const filteredSpaces = spaces
  
  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space)
    onSpaceSelect(space)
  }
  
  return (
    <div className="bg-[#CBCBCB] rounded-lg p-6">
      {/* Tabs */}
      <div className="flex items-center justify-center mb-6 text-black h-14">
        <button
          onClick={() => setActiveTab('mine')}
          className={`px-4 py-2 text-lg ${orbitron.className} ${
            activeTab === 'mine'
              ? 'border-b-2 border-black font-bold'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          Mine
        </button>
        <span className="mx-4 text-gray-600">|</span>
        <button
          onClick={() => setActiveTab('popular')}
          className={`px-4 py-2 text-lg ${orbitron.className} ${
            activeTab === 'popular'
              ? 'border-b-2 border-black font-bold'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          Popular
        </button>
      </div>
      
      {/* Selected Space Details */}
      {selectedSpace && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-black">Space Details</h2>
            <button 
              onClick={() => {
                setSelectedSpace(null)
                onSpaceSelect(null)
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-600 hover:text-black hover:border-black transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="text-lg font-semibold text-black mb-2">{selectedSpace.space}</h3>
            <p className="text-gray-600 mb-4">{selectedSpace.description}</p>
            <div className="text-sm text-gray-500">
              Created: {new Date(selectedSpace.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-400">
              <th className="py-3 px-4 text-left text-black font-semibold">Space</th>
              <th className="py-3 px-4 text-left text-black font-semibold">Description</th>
              <th className="py-3 px-4 text-left text-black font-semibold">Created</th>
            </tr>
          </thead>
          <tbody>
            {filteredSpaces.map(space => (
              <tr 
                key={space.id} 
                className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSpaceClick(space)}
              >
                <td className="py-3 px-4">
                  <p className="font-medium text-black">{space.space}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-600">{space.description}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-gray-600">
                    {new Date(space.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 