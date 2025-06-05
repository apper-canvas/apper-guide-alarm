import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const ErrorState = ({ message, onRetry }) => {
        return (
          <div className="min-h-screen flex items-center justify-center bg-surface-50">
            <div className="text-center p-8">
              <Icon name="AlertTriangle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <Title level="h2" className="text-2xl mb-2">Oops! Something went wrong</Title>
              <Text className="text-gray-600 mb-4">{message}</Text>
              <Button onClick={onRetry} className="bg-primary text-white px-6 py-2 rounded-xl">
                Try Again
              </Button>
            </div>
          </div>
        )
      }

      export default ErrorState