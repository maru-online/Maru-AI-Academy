import { Metadata } from 'next'
import { Badge, Button, Card } from '@/components/ui'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import PayFastButton from '@/components/pricing/PayFastButton'
import PayPalButtonWrapper from '@/components/pricing/PayPalButton'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Launch pricing for Maru AI Academy. From free starter plans to team training - find the right plan for your AI learning journey.',
}

// Upcoming courses data
const upcomingCourses = [
  {
    id: 1,
    title: 'AI Mastery for Finance Professionals',
    description: 'Automate financial analysis, forecasting, and reporting with AI-powered workflows.',
    icon: '💰',
    category: 'Advanced Role-Specific',
    comingSoon: 'Q2 2026',
  },
  {
    id: 2,
    title: 'AI Mastery for Marketing & Sales',
    description: 'Build AI-driven lead generation, content creation, and campaign optimization systems.',
    icon: '📈',
    category: 'Advanced Role-Specific',
    comingSoon: 'Q2 2026',
  },
  {
    id: 3,
    title: 'AI Mastery for HR & People Operations',
    description: 'Streamline recruitment, onboarding, and employee engagement with intelligent automation.',
    icon: '👥',
    category: 'Advanced Role-Specific',
    comingSoon: 'Q3 2026',
  },
  {
    id: 4,
    title: 'Building Your Industry AI Tech Stack',
    description: 'Design and implement the optimal AI toolkit for Hospitality, Retail, Healthcare, and more.',
    icon: '🏗️',
    category: 'Advanced Strategy',
    comingSoon: 'Q3 2026',
  },
];

export default async function PricingPage() {
  const session = await getServerSession(authOptions)
  const user: any = session?.user

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Launch Pricing – Limited Time Offer
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
            Invest in Your Future Productivity
          </h1>
          <p className="text-xl text-gray-600">
            Simple, transparent pricing. Choose the plan that fits your learning goals.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Free Explorer Tier */}
          <Card className="relative flex flex-col p-6 border hover:border-primary-200" hover>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">Free Explorer</h3>
              <p className="text-gray-500 text-sm mt-1">Start your AI journey.</p>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">R0</span>
              <span className="text-gray-500 text-sm">/month</span>
            </div>
            <Link href={session ? "/dashboard" : "/auth/signup?plan=starter"} className="w-full mb-6">
              <Button variant="outline" fullWidth size="sm">{session ? 'Go to Dashboard' : 'Get Started Free'}</Button>
            </Link>
            
            <div className="space-y-3 flex-grow">
              <p className="font-medium text-gray-900 text-sm">Includes:</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  First Module Free
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Basic Prompt Library
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  AI Learning Assistant
                </li>
              </ul>
            </div>
          </Card>

          {/* Learner Tier */}
          <Card className="relative flex flex-col p-6 border hover:border-primary-200" hover>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">AI Cadet</h3>
              <p className="text-gray-500 text-sm mt-1">Beginner Stream access.</p>
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">R199</span>
              <span className="text-gray-500 text-sm">/month</span>
              <span className="text-xs text-gray-400">($11)</span>
            </div>
            
            <div className="w-full mb-6">
              {session ? (
                <PayFastButton plan="LEARNER" amount={199} label="Subscribe" />
              ) : (
                <Link href="/auth/signup?plan=learner">
                  <Button variant="outline" fullWidth size="sm">Start 7-Day Trial</Button>
                </Link>
              )}
            </div>
            
            <div className="space-y-3 flex-grow">
              <p className="font-medium text-gray-900 text-sm">Everything in Free, plus:</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <strong>All Beginner Modules</strong>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Prompt Templates
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Aviator Badge
                </li>
              </ul>
            </div>
          </Card>

          {/* Pro Tier (Popular) */}
          <Card className="relative flex flex-col p-6 border-2 border-primary-500 shadow-xl scale-105 z-10" hover>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              BEST VALUE
            </div>
            <div className="mb-4 mt-2">
              <h3 className="text-lg font-bold text-gray-900">AI Captain</h3>
              <p className="text-gray-500 text-sm mt-1">Full access to all content.</p>
            </div>
            <div className="mb-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">R399</span>
              <span className="text-gray-500 text-sm">/month</span>
              <span className="text-xs text-gray-400">($22)</span>
            </div>
            <p className="text-xs text-green-600 font-medium mb-4">🎉 Launch price – save 28%</p>
            
            <div className="w-full mb-6 space-y-2">
              {session ? (
                <>
                  <PayFastButton plan="PRO" amount={399} />
                  <p className="text-center text-xs text-gray-400">PayPal coming soon</p>
                </>
              ) : (
                <Link href="/auth/signup?plan=pro">
                  <Button variant="primary" fullWidth size="sm">Start 7-Day Free Trial</Button>
                </Link>
              )}
            </div>
            
            <div className="space-y-3 flex-grow">
              <p className="font-medium text-gray-900 text-sm">Everything in AI Cadet, plus:</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  <strong>All Intermediate Modules</strong>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Full Resource Library
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  AI Learning Assistant
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Accomplishment Badge
                </li>
              </ul>
            </div>
          </Card>

          {/* Team Tier */}
          <Card className="relative flex flex-col p-6 border hover:border-purple-200" hover>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">AI Crew</h3>
              <p className="text-gray-500 text-sm mt-1">For organizations (5+ seats).</p>
            </div>
            <div className="mb-4 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-gray-900">R299</span>
              <span className="text-gray-500 text-sm">/user/mo</span>
              <span className="text-xs text-gray-400">($16)</span>
            </div>
            <div className="w-full mb-6">
              <Link href="/contact">
                <Button variant="outline" fullWidth size="sm">Contact Sales</Button>
              </Link>
            </div>
            
            <div className="space-y-3 flex-grow">
              <p className="font-medium text-gray-900 text-sm">Everything in Pro, plus:</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Admin Dashboard
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Team Analytics
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Custom Learning Paths
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Priority Support
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Upcoming Courses Section */}
        <div className="mt-24 pt-16 border-t border-gray-200">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="primary" className="mb-4">Coming Soon</Badge>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4">
              Advanced AI Courses
            </h2>
            <p className="text-lg text-gray-600">
              Expand your skills with role-specific AI mastery courses. Subscribe now and get early access when they launch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {upcomingCourses.map((course) => (
              <div 
                key={course.id}
                className="relative bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all group"
              >
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {course.comingSoon}
                  </span>
                </div>
                <div className="text-4xl mb-4">{course.icon}</div>
                <div className="text-xs font-medium text-primary-600 uppercase tracking-wide mb-2">
                  {course.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {course.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              Want to be notified when these courses launch?{' '}
              <Link href="/auth/signup" className="text-primary-600 font-medium hover:underline">
                Create a free account
              </Link>
              {' '}to get early access.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
