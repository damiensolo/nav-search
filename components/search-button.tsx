'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SearchButtonComponent() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 300) // Focus after animation
    } else {
      setSearchValue('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement your search logic here
    console.log('Searching for:', searchValue)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      setIsExpanded(false)
      setSearchValue('')
    }
  }

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-10'}`}>
        <form ref={formRef} onSubmit={handleSubmit} className="flex items-center justify-end">
          <Button
            type="button"
            onClick={handleToggle}
            className="absolute right-0 z-10 h-10 w-10 p-0 rounded-full transition-opacity duration-300 ease-in-out bg-transparent hover:bg-transparent"
            aria-label={isExpanded ? "Close search" : "Search"}
            variant="ghost"
          >
            {isExpanded ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </Button>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleChange}
            className={`pr-12 pl-4 h-10 w-full rounded-full transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
              isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />
        </form>
      </div>
    </div>
  )
}
