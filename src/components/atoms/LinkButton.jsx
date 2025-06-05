import { motion } from 'framer-motion'
      import Icon from './Icon'

      const LinkButton = ({ children, onClick, className, iconName, title, disabled = false, ...props }) => {
        return (
          <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={onClick}
            className={`p-2 hover:bg-surface-100 rounded-lg transition-colors
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${className}
            `}
            title={title}
            disabled={disabled}
            {...props}
          >
            <Icon name={iconName} className="w-5 h-5" />
            {children}
          </motion.button>
        )
      }

      export default LinkButton