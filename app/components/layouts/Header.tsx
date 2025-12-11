'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui'

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">
              Maru AI Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/modules" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Modules
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Pricing
            </Link>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/modules" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Modules
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                About
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Pricing
              </Link>
              <Button variant="primary" size="sm" fullWidth>
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
