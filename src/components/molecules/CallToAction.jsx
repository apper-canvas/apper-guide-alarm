import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const CallToAction = ({
        iconName,
        iconClass,
        title,
        description,
        buttonText,
        onButtonClick,
        buttonDisabled,
        isCompleted
      }) => {
        return (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 text-center border border-primary/20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4"
            >
              <div className={`w-16 h-16 mx-auto ${isCompleted ? 'bg-secondary' : 'bg-primary'} text-white rounded-full flex items-center justify-center`}>
                <Icon name={iconName} className={`w-8 h-8 ${iconClass}`} />
              </div>
              <Title level="h3" className="text-xl">{title}</Title>
              <Text className="text-gray-600">{description}</Text>
              <Button onClick={onButtonClick} disabled={buttonDisabled}>
                {buttonText}
              </Button>
            </motion.div>
          </div>
        )
      }

      export default CallToAction