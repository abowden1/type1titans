import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome to Your Forum</h1>
      <p className="text-xl text-white mb-8">
        Join our communities and start discussions with other members.
      </p>
      <div className="space-x-4">
        <Link
          href="/communities"
          className="inline-block bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors"
        >
          Browse Communities
        </Link>
        <Link
          href="/profile"
          className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          View Profile
        </Link>
      </div>
    </div>
  )
}
