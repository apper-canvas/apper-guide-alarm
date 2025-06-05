import { useEffect, useState } from 'react'
      import { motion } from 'framer-motion'
      import Text from '@/components/atoms/Text'
      import ProgressBar from '@/components/atoms/ProgressBar'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import ExamplesSection from './ExamplesSection'
      import CallToAction from '@/components/molecules/CallToAction'

      const ModuleContent = ({ currentModule, examples, onCompleteModule, isCompleted }) => {
        const [readingProgress, setReadingProgress] = useState(0)
        const [timeSpent, setTimeSpent] = useState(0)

        useEffect(() => {
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
          const interval = setInterval(() => {
            setTimeSpent(prev => prev + 1)
          }, 1000)

          return () => clearInterval(interval)
        }, [currentModule])

        useEffect(() => {
          setTimeSpent(0)
          setReadingProgress(0)
        }, [currentModule])

        const formatContent = (content) => {
          if (!content) return []
          
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
                <Icon name="BookOpen" className="w-8 h-8 text-white" />
              </motion.div>
              <Title level="h3" className="text-xl mb-2">Select a Module to Start Learning</Title>
              <Text className="text-gray-600">Choose any module from the sidebar to begin your Apper journey!</Text>
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
              <ProgressBar progress={readingProgress} className="h-1" />
            </div>

            <div className="text-center pb-8 border-b border-surface-200">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
              >
                <Icon name="BookOpen" className="w-10 h-10 text-white" />
              </motion.div>
              
              <Title level="h1" className="mb-4">{currentModule.title}</Title>
              <Text className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">{currentModule.description}</Text>
              
              <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" className="w-4 h-4" />
                  <span>{currentModule.estimatedTime} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" className="w-4 h-4" />
                  <span>Beginner friendly</span>
                </div>
                {isCompleted && (
                  <div className="flex items-center gap-2 text-secondary">
                    <Icon name="CheckCircle" className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              {formattedContent.map((section) => {
                switch (section.type) {
                  case 'h1':
                    return <Text key={section.key} type="h1">{section.content}</Text>
                  case 'h2':
                    return <Text key={section.key} type="h2">{section.content}</Text>
                  case 'h3':
                    return <Text key={section.key} type="h3">{section.content}</Text>
                  case 'paragraph':
                    return <Text key={section.key} type="paragraph">{section.content}</Text>
                  case 'list':
                    return (
                      <Text key={section.key} type="list">
                        {section.content.map((item, idx) => (
                          <Text key={idx} type="listItem">{item}</Text>
                        ))}
                      </Text>
                    )
                  case 'code':
                    return (
                      <div key={section.key} className="bg-gray-900 rounded-xl p-4 mb-6 relative group">
                        <button
                          onClick={() => navigator.clipboard.writeText(section.content)}
                          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                          title="Copy code"
                        >
                          <Icon name="Copy" className="w-4 h-4" />
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

            <ExamplesSection examples={examples} />

            {isCompleted ? (
              <CallToAction
                isCompleted={true}
                iconName="CheckCircle"
                title="Module Completed! 🎉"
                description="Great job! You've mastered this section. Ready for the next challenge?"
                buttonText="Next Module Coming Soon"
                onButtonClick={() => {}}
                buttonDisabled={true}
              />
            ) : (
              <CallToAction
                isCompleted={false}
                iconName="Target"
                title="Ready to Complete This Module?"
                description="Mark this module as complete to track your progress and unlock achievements!"
                buttonText="Mark as Complete"
                onButtonClick={() => onCompleteModule(currentModule.id)}
              />
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded-xl border border-surface-200 opacity-60">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="MessageCircle" className="w-5 h-5 text-primary" />
                  <span className="font-medium text-gray-900">Quiz</span>
                </div>
                <p className="text-sm text-gray-500">Test your knowledge - Coming soon!</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-surface-200 opacity-60">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Video" className="w-5 h-5 text-primary" />
                  <span className="font-medium text-gray-900">Video Tutorial</span>
                </div>
                <p className="text-sm text-gray-500">Watch and learn - Next update!</p>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-surface-200 opacity-60">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="Users" className="w-5 h-5 text-primary" />
                  <span className="font-medium text-gray-900">Community</span>
                </div>
                <p className="text-sm text-gray-500">Join discussions - Launching soon!</p>
              </div>
            </div>
          </motion.div>
        )
      }

      export default ModuleContent