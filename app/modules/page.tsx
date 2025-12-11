import { STREAMS } from '@/types/modules'
import { ModuleCard } from '@/components/modules'
import { Badge } from '@/components/ui'

export default function ModulesPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">Curriculum</Badge>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-gray-900 mb-6">
            Everything You Need to Master AI
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive, structured learning path designed to take you from novice to AI expert.
          </p>
        </div>

        <div className="space-y-20">
          {STREAMS.map((stream) => (
            <section key={stream.id} className="relative">
              {/* Stream Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-gray-200 pb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl font-heading font-bold text-gray-900">
                      {stream.title}
                    </h2>
                    <Badge variant={stream.id === 'beginner' ? 'success' : 'primary'}>
                      {stream.modules.length} Modules
                    </Badge>
                  </div>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    {stream.description}
                  </p>
                </div>
              </div>

              {/* Stream Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stream.modules.map((module) => (
                  <ModuleCard key={module.id} module={module} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* FAQ Section (Optional Enhancement) */}
        <div className="mt-24 pt-16 border-t border-gray-200 text-center">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
            Not sure where to start?
          </h2>
          <p className="text-gray-600 mb-8">
            Take our quick assessment to find the perfect learning path for your goals.
          </p>
          <button className="text-primary-600 font-semibold hover:text-primary-700 underline">
            Take the AI Readiness Assessment &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
