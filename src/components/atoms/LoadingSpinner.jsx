import { motion } from 'framer-motion'

      const LoadingSpinner = ({ className }) => {
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className={`w-8 h-8 border-3 border-primary border-t-transparent rounded-full ${className}`}
          />
        )
      }

      export default LoadingSpinner