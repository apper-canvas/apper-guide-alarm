import { useState, useEffect } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import moduleService from '@/services/api/moduleService'
      import exampleService from '@/services/api/exampleService'
      import progressService from '@/services/api/progressService'
      import CourseLayout from '@/components/templates/CourseLayout'
      import LoadingSpinner from '@/components/atoms/LoadingSpinner'
      import ErrorState from '@/components/organisms/ErrorState'
      import ModuleHeader from '@/components/organisms/ModuleHeader'
      import ModuleContent from '@/components/organisms/ModuleContent'

      const HomePage = () => {
        const [modules, setModules] = useState([])
        const [examples, setExamples] = useState([])
        const [progress, setProgress] = useState([])
        const [currentModule, setCurrentModule] = useState(null)
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [sidebarOpen, setSidebarOpen] = useState(true)
        const [showBackToTop, setShowBackToTop] = useState(false)

        useEffect(() => {
          const loadData = async () => {
            setLoading(true)
            try {
              const [moduleResult, exampleResult, progressResult] = await Promise.all([
                moduleService.getAll(),
                exampleService.getAll(),
                progressService.getAll()
              ])
              setModules(moduleResult || [])
              setExamples(exampleResult || [])
              setProgress(progressResult || [])
              
              if (moduleResult?.length > 0) {
                setCurrentModule(moduleResult[0])
              }
            } catch (err) {
              setError(err.message)
              toast.error("Failed to load course content")
            } finally {
              setLoading(false)
            }
          }
          loadData()
        }, [])

        useEffect(() => {
          const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400)
          }
          window.addEventListener('scroll', handleScroll)
          return () => window.removeEventListener('scroll', handleScroll)
        }, [])

        const completedModules = progress?.length || 0
        const totalModules = modules?.length || 15
        const completionPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

        const handleModuleSelect = (module) => {
          setCurrentModule(module)
          if (window.innerWidth < 1024) {
            setSidebarOpen(false)
          }
        }

        const handleCompleteModule = async (moduleId) => {
          try {
            const newProgress = {
              moduleId,
              completedAt: new Date().toISOString(),
              timeSpent: Math.floor(Math.random() * 20) + 10 
            }
            
            const result = await progressService.create(newProgress)
            setProgress(prev => [...(prev || []), result])
            
            const moduleElement = document.querySelector(`[data-module-id="${moduleId}"]`)
            if (moduleElement) {
              moduleElement.classList.add('celebrate')
              setTimeout(() => moduleElement.classList.remove('celebrate'), 600)
            }
            
            toast.success("Module completed! 🎉", {
              icon: "🎓"
            })
          } catch (err) {
            toast.error("Failed to save progress")
          }
        }

        const scrollToTop = () => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }

        const getCurrentModuleExamples = () => {
          if (!currentModule || !examples) return []
          return examples.filter(ex => ex.moduleId === currentModule.id)
        }

        const isModuleCompleted = (moduleId) => {
          return progress?.some(p => p.moduleId === moduleId) || false
        }

        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-surface-50">
              <LoadingSpinner />
            </div>
          )
        }

        if (error) {
          return <ErrorState message={error} onRetry={() => window.location.reload()} />
        }

        return (
          <CourseLayout
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            modules={modules}
            currentModule={currentModule}
            handleModuleSelect={handleModuleSelect}
            isModuleCompleted={isModuleCompleted}
            completionPercentage={completionPercentage}
            showBackToTop={showBackToTop}
            scrollToTop={scrollToTop}
          >
            <ModuleHeader
              currentModule={currentModule}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              sidebarOpen={sidebarOpen}
            />
            <main className="flex-1 main-content overflow-y-auto">
              <div className="max-w-4xl mx-auto p-6 lg:p-8">
                <ModuleContent
                  currentModule={currentModule}
                  examples={getCurrentModuleExamples()}
                  onCompleteModule={handleCompleteModule}
                  isCompleted={currentModule ? isModuleCompleted(currentModule.id) : false}
                />
              </div>
            </main>
          </CourseLayout>
        )
      }

      export default HomePage