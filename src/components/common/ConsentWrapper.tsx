'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useConsent } from '@/contexts/ConsentContext'
import ConsentDialog from './ConsentDialog'

interface ConsentWrapperProps {
  children: ReactNode
}

export default function ConsentWrapper({ children }: ConsentWrapperProps) {
  const { hasConsented } = useConsent()
  const [showDialog, setShowDialog] = useState(false)
  
  useEffect(() => {
    // Only show dialog if user hasn't consented
    setShowDialog(!hasConsented)
  }, [hasConsented])
  
  return (
    <>
      {showDialog && <ConsentDialog onClose={() => setShowDialog(false)} />}
      <div className={hasConsented ? '' : 'hidden'}>
        {children}
      </div>
    </>
  )
} 