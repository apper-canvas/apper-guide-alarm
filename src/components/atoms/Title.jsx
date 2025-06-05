const Title = ({ children, className, level = 'h1', ...props }) => {
        switch (level) {
          case 'h1':
            return <h1 className={`text-3xl lg:text-4xl font-bold gradient-text ${className}`} {...props}>{children}</h1>
          case 'h2':
            return <h2 className={`font-semibold text-gray-900 ${className}`} {...props}>{children}</h2>
          case 'h3':
            return <h3 className={`font-semibold text-gray-900 ${className}`} {...props}>{children}</h3>
          case 'h4':
            return <h4 className={`font-medium text-gray-900 ${className}`} {...props}>{children}</h4>
          default:
            return <h1 className={className} {...props}>{children}</h1>
        }
      }

      export default Title