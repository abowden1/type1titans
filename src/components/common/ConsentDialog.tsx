'use client'

import { useConsent } from '@/contexts/ConsentContext'

interface ConsentDialogProps {
  onClose: () => void
}

export default function ConsentDialog({ onClose }: ConsentDialogProps) {
  const { setHasConsented } = useConsent()
  
  const handleAgree = () => {
    setHasConsented(true)
    onClose()
  }
  
  const handleDisagree = () => {
    window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Demo Site Notice</h2>
        <p className="text-gray-600 mb-6">
          I recognize that this is a demo site and data is currently fictional. The features of this site are currently very limited.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleAgree}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Agree
          </button>
          <button
            onClick={handleDisagree}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Disagree
          </button>
        </div>
      </div>
    </div>
  )
} 