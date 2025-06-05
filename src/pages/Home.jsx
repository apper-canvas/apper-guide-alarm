import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import moduleService from '../services/api/moduleService'
import exampleService from '../services/api/exampleService'
import progressService from '../services/api/progressService'

const Home = () => {
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
        
        // Set first module as current if none selected
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
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setSidebarOpen(false)
    }
  }

  const handleCompleteModule = async (moduleId) => {
    try {
      const newProgress = {
        moduleId,
        completedAt: new Date().toISOString(),
        timeSpent: Math.floor(Math.random() * 20) + 10 // Simulated time
      }
      
      const result = await progressService.create(newProgress)
      setProgress(prev => [...(prev || []), result])
      
      // Celebration animation
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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="text-center p-8">
          <ApperIcon name="AlertTriangle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className={`fixed lg:relative z-30 h-screen bg-white shadow-card border-r border-surface-200 ${
          sidebarOpen ? 'w-80' : 'w-0 lg:w-16'
        } transition-all duration-300`}
      >
        <div className="p-6 border-b border-surface-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="GraduationCap" className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold gradient-text">ApperGuide</h1>
                <p className="text-sm text-gray-500">Master Apper in 15 steps</p>
              </div>
            )}
          </div>
          
          {sidebarOpen && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Overall Progress</span>
                <span>{completionPercentage}%</span>
              </div>
              <div className="w-full bg-surface-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
          {sidebarOpen && (
            <nav className="space-y-2">
              {modules.map((module, index) => {
                const completed = isModuleCompleted(module.id)
                const isCurrent = currentModule?.id === module.id
                
                return (
                  <motion.button
                    key={module.id}
                    data-module-id={module.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleModuleSelect(module)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      isCurrent
                        ? 'bg-primary text-white shadow-lg'
                        : completed
                        ? 'bg-secondary/10 border border-secondary/20 hover:bg-secondary/20'
                        : 'hover:bg-surface-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        completed
                          ? 'bg-secondary text-white'
                          : isCurrent
                          ? 'bg-white text-primary'
                          : 'bg-surface-200 text-gray-600'
                      }`}>
                        {completed ? (
                          <ApperIcon name="Check" className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium text-sm mb-1 ${
                          isCurrent ? 'text-white' : 'text-gray-900'
                        }`}>
                          {module.title}
                        </h3>
                        <p className={`text-xs ${
                          isCurrent ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {module.estimatedTime} min
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </nav>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-surface-200 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-surface-100 rounded-lg transition-colors lg:hidden"
            >
              <ApperIcon name={sidebarOpen ? "X" : "Menu"} className="w-5 h-5" />
            </button>
            
            {currentModule && (
              <div>
                <h2 className="font-semibold text-gray-900">{currentModule.title}</h2>
                <p className="text-sm text-gray-500">{currentModule.description}</p>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              title="Search coming soon!"
              className="p-2 hover:bg-surface-100 rounded-lg transition-colors opacity-50 cursor-not-allowed"
            >
              <ApperIcon name="Search" className="w-5 h-5" />
            </button>
            <button
              title="Bookmarks coming soon!"
              className="p-2 hover:bg-surface-100 rounded-lg transition-colors opacity-50 cursor-not-allowed"
            >
              <ApperIcon name="Bookmark" className="w-5 h-5" />
            </button>
            <button
              title="Settings coming soon!"
              className="p-2 hover:bg-surface-100 rounded-lg transition-colors opacity-50 cursor-not-allowed"
            >
              <ApperIcon name="Settings" className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Learning Content */}
        <main className="flex-1 main-content overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 lg:p-8">
            <MainFeature
              currentModule={currentModule}
              examples={getCurrentModuleExamples()}
              onCompleteModule={handleCompleteModule}
              isCompleted={currentModule ? isModuleCompleted(currentModule.id) : false}
            />
          </div>
        </main>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-30 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
          >
            <ApperIcon name="ArrowUp" className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Home