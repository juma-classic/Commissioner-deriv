'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="relative animate-pulse">
        <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/60 rounded-full animate-ping" style={{transformOrigin: '0 0'}}></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{transformOrigin: '0 0'}}></div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{transformOrigin: '0 0'}}></div>
      </div>
      
      <div className="mt-8 text-center animate-fade-in">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Dev Dashboard
        </h2>
        <p className="text-muted-foreground mt-2">Loading your dashboard...</p>
      </div>
    </div>
  )
}