'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function SearchButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      setSearchValue('')
    }
  }, [isOpen])

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Performing search for:', searchValue)
    // Close the search component
    setIsOpen(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="fixed top-0 right-4 p-4">
      <div className="w-[320px] flex items-center justify-end relative">
        <div
          className={cn(
            "absolute bottom-0 right-0 h-[2px] bg-zinc-950 transition-all duration-300 ease-in-out origin-right",
            isOpen ? "w-full opacity-100" : "w-0 opacity-0"
          )}
        />
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "w-[calc(100%-2rem)] opacity-100" : "w-0 opacity-0"
          )}
        >
          <Input
            ref={inputRef}
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search..."
            className="w-full h-8 border-0 rounded-none focus:ring-0 bg-transparent [&::-webkit-search-cancel-button]:hidden pl-1 pr-0 placeholder:text-zinc-500 font-inter placeholder:font-inter font-normal placeholder:font-normal"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-transparent p-0 h-8 w-auto ml-4 pr-1"
        >
          {isOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
