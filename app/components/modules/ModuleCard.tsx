import Link from 'next/link'
import { Card, Badge, Button } from '../ui'
import { Module } from '@/types/modules'

interface ModuleCardProps {
  module: Module
  compact?: boolean
  isLocked?: boolean
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, compact = false, isLocked = false }) => {
  const getIcon = (iconName?: string) => {
    switch(iconName) {
      case 'bulb': return '💡'
      case 'message': return '💬'
      case 'tool': return '🛠️'
      case 'rocket': return '🚀'
      case 'repeat': return '🔄'
      case 'search': return '🔍'
      case 'puzzle': return '🧩'
      case 'shield': return '🛡️'
      default: return '📚'
    }
  }

  return (
    <Card className={`h-full flex flex-col group relative overflow-hidden ${isLocked ? 'opacity-75 grayscale-[0.5]' : ''}`} hover={!isLocked}>
      {/* Background decoration */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform duration-300">
          {isLocked ? '🔒' : getIcon(module.icon)}
        </div>
        <Badge variant={isLocked ? 'neutral' : (module.stream === 'beginner' ? 'success' : 'primary')} size="sm">
          {isLocked ? 'Pro Only' : `Module ${module.order}`}
        </Badge>
      </div>

      <div className="flex-grow relative z-10">
        <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
          {module.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {module.description}
        </p>
        
        {!compact && (
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {module.duration}
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {module.lessonsCount} Lessons
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-gray-100">
        <Link href={isLocked ? '/pricing' : `/modules/${module.slug}`} className="w-full">
          <Button 
            variant={isLocked ? 'primary' : 'outline'} 
            fullWidth 
            size="sm" 
            className={isLocked ? '' : 'group-hover:bg-primary-50 group-hover:border-primary-200'}
          >
            {isLocked ? 'Upgrade to Unlock 🔓' : 'Start Module'}
          </Button>
        </Link>
      </div>
    </Card>
  )
}

export default ModuleCard
