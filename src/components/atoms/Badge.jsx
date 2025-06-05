import { motion } from 'framer-motion'

      const Badge = ({ children, className, icon: IconComponent, iconClass, ...props }) => {
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex items-center gap-2 text-sm font-medium rounded-full px-3 py-1 ${className}`}
            {...props}
          >
            {IconComponent && <IconComponent className={`w-4 h-4 ${iconClass}`} />}
            {children}
          </motion.div>
        )
      }

      export default Badge