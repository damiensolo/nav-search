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

  return (
    <div className={cn(
      "fixed top-4 right-4 flex items-center",
      isOpen && "border-b-2 border-zinc-950"
    )}>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "w-[320px] opacity-100" : "w-0 opacity-0"
        )}
      >
        <Input
          ref={inputRef}
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="w-[320px] h-8 border-0 rounded-none focus:ring-0 bg-transparent [&::-webkit-search-cancel-button]:hidden px-0 placeholder:text-zinc-950"
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-transparent p-0 h-8 w-auto ml-2"
      >
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Search className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}
