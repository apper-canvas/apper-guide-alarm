import { motion } from 'framer-motion'

      const Button = ({ children, onClick, className, icon: IconComponent, disabled, ...props }) => {
        return (
          <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors shadow-lg
              ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-primary text-white hover:bg-primary-dark'}
              ${className}
            `}
            disabled={disabled}
            {...props}
          >
            {IconComponent && <IconComponent className="w-5 h-5" />}
            {children}
          </motion.button>
        )
      }

      export default Button