import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'

      const TabbedContent = ({ iconName, title, description }) => {
        return (
          <div className="bg-white p-4 rounded-xl border border-surface-200 opacity-60">
            <div className="flex items-center gap-3 mb-2">
              <Icon name={iconName} className="w-5 h-5 text-primary" />
              <Title level="h4">{title}</Title>
            </div>
            <Text className="text-sm text-gray-500">{description}</Text>
          </div>
        )
      }

      export default TabbedContent