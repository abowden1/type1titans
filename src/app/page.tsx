import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome to Type 1 Titans!</h1>
      <p className="text-xl text-white mb-8">
        Join our spaces and start discussions with other members.
      </p>
      <div className="space-x-4">
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
