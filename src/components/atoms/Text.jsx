const Text = ({ children, className, type = 'paragraph', ...props }) => {
        switch (type) {
          case 'h1':
            return <h1 className={`text-2xl font-bold text-gray-900 mt-8 mb-4 ${className}`} {...props}>{children}</h1>
          case 'h2':
            return <h2 className={`text-xl font-semibold text-gray-900 mt-6 mb-3 ${className}`} {...props}>{children}</h2>
          case 'h3':
            return <h3 className={`text-lg font-medium text-gray-900 mt-4 mb-2 ${className}`} {...props}>{children}</h3>
          case 'paragraph':
            return <p className={`text-gray-700 leading-relaxed mb-4 ${className}`} {...props}>{children}</p>
          case 'list':
            return (
              <ul className={`list-disc list-inside space-y-2 mb-4 text-gray-700 ${className}`} {...props}>
                {children}
              </ul>
            )
          case 'listItem':
            return <li className={className} {...props}>{children}</li>
          case 'code':
            return <code className={`text-gray-800 font-mono text-sm ${className}`} {...props}>{children}</code>
          default:
            return <p className={className} {...props}>{children}</p>
        }
      }

      export default Text