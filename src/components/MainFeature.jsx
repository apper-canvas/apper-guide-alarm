import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = ({ currentModule, examples, onCompleteModule, isCompleted }) => {
  const [expandedExample, setExpandedExample] = useState(null)
  const [copiedPrompt, setCopiedPrompt] = useState(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    // Track reading progress based on scroll
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min((scrollTop / docHeight) * 100, 100)
      setReadingProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Track time spent on module
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [currentModule])

  useEffect(() => {
    // Reset time when module changes
    setTimeSpent(0)
    setReadingProgress(0)
  }, [currentModule])

  const copyPrompt = async (prompt, exampleId) => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedPrompt(exampleId)
      toast.success("Prompt copied to clipboard!", {
        icon: "📋"
      })
      setTimeout(() => setCopiedPrompt(null), 2000)
    } catch (err) {
      toast.error("Failed to copy prompt")
    }
  }

  const toggleExample = (exampleId) => {
    setExpandedExample(expandedExample === exampleId ? null : exampleId)
  }

  const handleCompleteModule = () => {
    if (currentModule && !isCompleted) {
      onCompleteModule(currentModule.id)
    }
  }

  const formatContent = (content) => {
    if (!content) return []
    
    // Split content into sections and format
    const sections = content.split('\n\n').filter(section => section.trim())
    
    return sections.map((section, index) => {
      if (section.startsWith('# ')) {
        return { type: 'h1', content: section.replace('# ', ''), key: index }
      } else if (section.startsWith('## ')) {
        return { type: 'h2', content: section.replace('## ', ''), key: index }
      } else if (section.startsWith('### ')) {
        return { type: 'h3', content: section.replace('### ', ''), key: index }
      } else if (section.startsWith('- ')) {
        const items = section.split('\n').filter(item => item.trim())
        return { type: 'list', content: items.map(item => item.replace('- ', '')), key: index }
      } else if (section.startsWith('```')) {
        const code = section.replace(/```\w*\n?/, '').replace(/```$/, '')
        return { type: 'code', content: code, key: index }
      } else {
        return { type: 'paragraph', content: section, key: index }
      }
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentModule) {
    return (
      <div className="text-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
        >
          <ApperIcon name="BookOpen" className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Module to Start Learning</h3>
        <p className="text-gray-600">Choose any module from the sidebar to begin your Apper journey!</p>
      </div>
    )
  }

  const formattedContent = formatContent(currentModule.content)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Progress Indicator */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-surface-200 -mx-6 lg:-mx-8 px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${isCompleted ? 'bg-secondary' : 'bg-primary'}`} />
            <span className="text-sm font-medium text-gray-900">
              {isCompleted ? 'Completed' : 'In Progress'}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">Time: {formatTime(timeSpent)}</span>
          </div>
          <span className="text-sm text-gray-500">{Math.round(readingProgress)}% read</span>
        </div>
        <div className="w-full bg-surface-200 rounded-full h-1">
          <motion.div
            animate={{ width: `${readingProgress}%` }}
            className="bg-primary h-1 rounded-full"
          />
        </div>
      </div>

      {/* Module Header */}
      <div className="text-center pb-8 border-b border-surface-200">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
        >
          <ApperIcon name="BookOpen" className="w-10 h-10 text-white" />
        </motion.div>
        
        <h1 className="text-3xl lg:text-4xl font-bold gradient-text mb-4">{currentModule.title}</h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">{currentModule.description}</p>
        
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <ApperIcon name="Clock" className="w-4 h-4" />
            <span>{currentModule.estimatedTime} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <ApperIcon name="Users" className="w-4 h-4" />
            <span>Beginner friendly</span>
          </div>
          {isCompleted && (
            <div className="flex items-center gap-2 text-secondary">
              <ApperIcon name="CheckCircle" className="w-4 h-4" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Module Content */}
      <div className="prose prose-lg max-w-none">
        {formattedContent.map((section) => {
          switch (section.type) {
            case 'h1':
              return (
                <h1 key={section.key} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  {section.content}
                </h1>
              )
            case 'h2':
              return (
                <h2 key={section.key} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  {section.content}
                </h2>
              )
            case 'h3':
              return (
                <h3 key={section.key} className="text-lg font-medium text-gray-900 mt-4 mb-2">
                  {section.content}
                </h3>
              )
            case 'paragraph':
              return (
                <p key={section.key} className="text-gray-700 leading-relaxed mb-4">
                  {section.content}
                </p>
              )
            case 'list':
              return (
                <ul key={section.key} className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                  {section.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )
            case 'code':
              return (
                <div key={section.key} className="bg-gray-900 rounded-xl p-4 mb-6 relative group">
                  <button
                    onClick={() => copyPrompt(section.content, section.key)}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <ApperIcon name={copiedPrompt === section.key ? "Check" : "Copy"} className="w-4 h-4" />
                  </button>
                  <pre className="text-green-400 text-sm font-mono overflow-x-auto">
                    <code>{section.content}</code>
                  </pre>
                </div>
              )
            default:
              return null
          }
        })}
      </div>

      {/* Interactive Examples */}
      {examples && examples.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <ApperIcon name="Lightbulb" className="w-6 h-6 text-accent" />
            Try These Examples
          </h2>
          
          <div className="grid gap-6">
            {examples.map((example) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-card border border-surface-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Try This Prompt</h3>
                    <button
                      onClick={() => copyPrompt(example.prompt, example.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      <ApperIcon name={copiedPrompt === example.id ? "Check" : "Copy"} className="w-4 h-4" />
                      {copiedPrompt === example.id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  
                  <div className="bg-surface-50 rounded-lg p-4 mb-4 border-l-4 border-primary">
                    <code className="text-gray-800 font-mono text-sm">{example.prompt}</code>
                  </div>
                  
                  <button
                    onClick={() => toggleExample(example.id)}
                    className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
                  >
                    <ApperIcon 
                      name={expandedExample === example.id ? "ChevronUp" : "ChevronDown"} 
                      className="w-4 h-4" 
                    />
                    {expandedExample === example.id ? "Hide" : "Show"} Expected Output
                  </button>
                  
                  <AnimatePresence>
                    {expandedExample === example.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-4"
                      >
                        <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                          <h4 className="font-medium text-gray-900 mb-2">Expected Output:</h4>
                          <p className="text-gray-700 text-sm">{example.output}</p>
                        </div>
                        
                        {example.explanation && (
                          <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                            <h4 className="font-medium text-gray-900 mb-2">How It Works:</h4>
                            <p className="text-gray-700 text-sm">{example.explanation}</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Completion Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center border border-primary/20">
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 mx-auto bg-secondary text-white rounded-full flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Module Completed! 🎉</h3>
            <p className="text-gray-600">Great job! You've mastered this section. Ready for the next challenge?</p>
            <button
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors opacity-50 cursor-not-allowed"
              disabled
            >
              Next Module Coming Soon
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center">
              <ApperIcon name="Target" className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Ready to Complete This Module?</h3>
            <p className="text-gray-600">Mark this module as complete to track your progress and unlock achievements!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCompleteModule}
              className="px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors shadow-lg"
            >
              Mark as Complete
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Coming Soon Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        <div className="bg-white p-4 rounded-xl border border-surface-200 opacity-60">
          <div className="flex items-center gap-3 mb-2">
            <ApperIcon name="MessageCircle" className="w-5 h-5 text-primary" />
            <span className="font-medium text-gray-900">Quiz</span>
          </div>
          <p className="text-sm text-gray-500">Test your knowledge - Coming soon!</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-surface-200 opacity-60">
          <div className="flex items-center gap-3 mb-2">
            <ApperIcon name="Video" className="w-5 h-5 text-primary" />
            <span className="font-medium text-gray-900">Video Tutorial</span>
          </div>
          <p className="text-sm text-gray-500">Watch and learn - Next update!</p>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-surface-200 opacity-60">
          <div className="flex items-center gap-3 mb-2">
            <ApperIcon name="Users" className="w-5 h-5 text-primary" />
            <span className="font-medium text-gray-900">Community</span>
          </div>
          <p className="text-sm text-gray-500">Join discussions - Launching soon!</p>
        </div>
      </div>
    </motion.div>
  )
}

export default MainFeature