'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card, Button } from '@/components/ui'
import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'You do not have permission to sign in.',
    Verification: 'The verification link has expired or has already been used.',
    OAuthSignin: 'Error in constructing an authorization URL.',
    OAuthCallback: 'Error in handling the response from the OAuth provider.',
    OAuthCreateAccount: 'Could not create OAuth provider user in the database.',
    EmailCreateAccount: 'Could not create email provider user in the database.',
    Callback: 'Error in the OAuth callback handler route.',
    OAuthAccountNotLinked: 'This email is already associated with another account.',
    EmailSignin: 'The email could not be sent.',
    CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
    SessionRequired: 'Please sign in to access this page.',
    Default: 'An unexpected error occurred.',
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          ⚠️
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-6">
          {errorMessage}
        </p>
        {error && (
          <p className="text-xs text-gray-400 mb-6 font-mono bg-gray-100 p-2 rounded">
            Error code: {error}
          </p>
        )}
        <div className="space-y-3">
          <Link href="/auth/signin" className="block">
            <Button variant="primary" fullWidth>
              Try Again
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" fullWidth>
              Go Home
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  )
}
