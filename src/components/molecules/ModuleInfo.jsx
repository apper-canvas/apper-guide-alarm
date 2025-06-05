import Icon from '@/components/atoms/Icon'

      const ModuleInfo = ({ iconName, text }) => {
        return (
          <div className="flex items-center gap-2">
            <Icon name={iconName} className="w-4 h-4" />
            <span>{text}</span>
          </div>
        )
      }

      export default ModuleInfo