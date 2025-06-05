import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'

      const ModuleCard = ({ module, index, isCurrent, isCompleted, onSelect }) => {
        return (
          <motion.button
            key={module.id}
            data-module-id={module.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(module)}
            className={`w-full text-left p-4 rounded-xl transition-all ${
              isCurrent
                ? 'bg-primary text-white shadow-lg'
                : isCompleted
                ? 'bg-secondary/10 border border-secondary/20 hover:bg-secondary/20'
                : 'hover:bg-surface-100 border border-transparent'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                isCompleted
                  ? 'bg-secondary text-white'
                  : isCurrent
                  ? 'bg-white text-primary'
                  : 'bg-surface-200 text-gray-600'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Title level="h3" className={`font-medium text-sm mb-1 ${
                  isCurrent ? 'text-white' : 'text-gray-900'
                }`}>
                  {module.title}
                </Title>
                <p className={`text-xs ${
                  isCurrent ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {module.estimatedTime} min
                </p>
              </div>
            </div>
          </motion.button>
        )
      }

      export default ModuleCard