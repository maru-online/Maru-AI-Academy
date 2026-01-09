'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '../ui'

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-transparent border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden p-1">
              <img src="/logo.png" alt="M" className="w-full h-full object-contain" />
            </div>
            <span className="font-heading font-bold text-xl text-gray-900">
              Maru AI Academy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="https://maruonline.com" className="text-gray-500 hover:text-primary-600 transition-colors font-medium text-sm flex items-center gap-1">
              ← Maru Online
            </a>
            <Link href="/modules" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Modules
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Pricing
            </Link>
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">Hi, {session.user?.name?.split(' ')[0] || 'User'}</span>
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border border-primary-200">
                    {session.user?.name?.[0] || 'U'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin">
                  <span className="text-gray-700 hover:text-primary-600 font-medium cursor-pointer">
                    Log in
                  </span>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
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
              <a href="https://maruonline.com" className="text-gray-500 hover:text-primary-600 transition-colors font-medium">
                ← Back to Maru Online
              </a>
              <Link href="/modules" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Modules
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                About
              </Link>
              <Link href="/pricing" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Pricing
              </Link>
              
              {session ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="text-left text-red-600 hover:text-red-700 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                    Log in
                  </Link>
                  <Link href="/auth/signup">
                    <Button variant="primary" size="sm" fullWidth>
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
