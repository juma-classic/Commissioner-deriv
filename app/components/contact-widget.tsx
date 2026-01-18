'use client'

import { useState } from 'react'
import { MessageCircle, ExternalLink, Lightbulb, X, ChevronDown } from 'lucide-react'

export function ContactWidget() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed z-50 transition-all duration-300 ease-in-out bottom-6 right-6">
      <div className="flex flex-col items-end space-y-3">
        <button
          onClick={() => setIsVisible(false)}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-foreground px-3 h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm hover:bg-accent border-border"
        >
          <X className="h-4 w-4 text-foreground" />
        </button>
        
        {isExpanded && (
          <div className="rounded-lg border text-card-foreground w-72 shadow-2xl border-border bg-background/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="tracking-tight text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Let's Build Together
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground rounded-md h-8 w-8 p-0 hover:bg-accent"
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                Expert Deriv API development & automation solutions
              </p>
            </div>
            
            <div className="p-6 pt-0 space-y-4">
              <button
                onClick={() => window.open('https://t.me/your_telegram', '_blank')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact on Telegram
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
              
              <button
                onClick={() => setIsExpanded(false)}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-accent-foreground h-10 px-4 py-2 w-full border-border hover:bg-accent"
              >
                <Lightbulb className="mr-2 h-4 w-4" />
                View Services
              </button>
            </div>
          </div>
        )}
        
        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:text-accent-foreground px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm hover:bg-accent border-border"
          >
            <MessageCircle className="h-4 w-4" />
            Contact
          </button>
        )}
      </div>
    </div>
  )
}