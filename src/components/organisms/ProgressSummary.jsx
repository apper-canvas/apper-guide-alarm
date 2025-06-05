import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import ProgressBar from '@/components/atoms/ProgressBar'
      import Text from '@/components/atoms/Text'

      const ProgressSummary = ({ completionPercentage, sidebarOpen }) => {
        return (
          <div className="p-6 border-b border-surface-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="GraduationCap" className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <Title level="h1" className="text-xl">ApperGuide</Title>
                  <Text className="text-sm text-gray-500">Master Apper in 15 steps</Text>
                </div>
              )}
            </div>
            
            {sidebarOpen && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <ProgressBar progress={completionPercentage} />
              </div>
            )}
          </div>
        )
      }

      export default ProgressSummary