'use client'

import { useState } from 'react'
import { LoadingScreen } from './components/loading-screen'
import { Dashboard } from './components/dashboard'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      {!isLoading && <Dashboard />}
    </>
  )
}