import { motion } from 'framer-motion'

      const ProgressBar = ({ progress, className }) => {
        return (
          <div className={`w-full bg-surface-200 rounded-full h-2 ${className}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
            />
          </div>
        )
      }

      export default ProgressBar