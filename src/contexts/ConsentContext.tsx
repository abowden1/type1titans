'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ConsentContextType {
  hasConsented: boolean
  setHasConsented: (value: boolean) => void
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined)

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [hasConsented, setHasConsented] = useState(false)
  
  useEffect(() => {
    // Check if user has already consented in this session
    const consent = sessionStorage.getItem('userConsent')
    if (consent === 'true') {
      setHasConsented(true)
    }
  }, [])
  
  // Simple setter that only sets the state to true and updates sessionStorage
  const updateConsent = (value: boolean) => {
    if (value) {
      setHasConsented(true)
      sessionStorage.setItem('userConsent', 'true')
    }
  }
  
  return (
    <ConsentContext.Provider value={{ hasConsented, setHasConsented: updateConsent }}>
      {children}
    </ConsentContext.Provider>
  )
}

export function useConsent() {
  const context = useContext(ConsentContext)
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider')
  }
  return context
} 