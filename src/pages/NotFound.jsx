import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="mb-8">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center"
          >
            <ApperIcon name="MapPin" className="w-16 h-16 text-white" />
          </motion.div>
          
          <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Looks like you've ventured off the learning path! Let's get you back to your Apper journey.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-dark transition-colors"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Back to Course
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Need help? Check out our getting started guide!</p>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 opacity-30"
        >
          <ApperIcon name="GraduationCap" className="w-8 h-8 text-primary mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound