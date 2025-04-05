'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-4xl font-bold mb-6 text-white">Welcome to T1 Titans</h1>
      <p className="text-xl mb-8 text-white max-w-2xl">
        This is a demo site showcasing the features of our platform. Please note that all data is fictional.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/spaces" 
          className="inline-block bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors"
        >
          Browse Spaces
        </Link>
        <Link 
          href="/users" 
          className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          Find Friends
        </Link>
      </div>
    </div>
  )
}
