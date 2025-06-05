import { motion, AnimatePresence } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import ProgressSummary from '@/components/organisms/ProgressSummary'
      import ModuleList from '@/components/organisms/ModuleList'
      import LinkButton from '@/components/atoms/LinkButton'

      const CourseLayout = ({
        sidebarOpen,
        setSidebarOpen,
        modules,
        currentModule,
        handleModuleSelect,
        isModuleCompleted,
        completionPercentage,
        children,
        showBackToTop,
        scrollToTop
      }) => {
        return (
          <div className="min-h-screen bg-surface-50 flex">
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: sidebarOpen ? 0 : -280 }}
              className={`fixed lg:relative z-30 h-screen bg-white shadow-card border-r border-surface-200 ${
                sidebarOpen ? 'w-80' : 'w-0 lg:w-16'
              } transition-all duration-300`}
            >
              <ProgressSummary completionPercentage={completionPercentage} sidebarOpen={sidebarOpen} />

              <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
                {sidebarOpen && (
                  <ModuleList
                    modules={modules}
                    currentModule={currentModule}
                    isModuleCompleted={isModuleCompleted}
                    onModuleSelect={handleModuleSelect}
                  />
                )}
              </div>
            </motion.aside>

            <div className="flex-1 flex flex-col">
              {children}
            </div>

            <AnimatePresence>
              {showBackToTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  onClick={scrollToTop}
                  className="fixed bottom-6 right-6 z-30 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
                >
                  <Icon name="ArrowUp" className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/20 z-20 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
          </div>
        )
      }

      export default CourseLayout