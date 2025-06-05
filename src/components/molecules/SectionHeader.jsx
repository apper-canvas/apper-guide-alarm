import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'

      const SectionHeader = ({ iconName, title, className }) => {
        return (
          <Title level="h2" className={`text-2xl flex items-center gap-3 ${className}`}>
            {iconName && <Icon name={iconName} className="w-6 h-6 text-accent" />}
            {title}
          </Title>
        )
      }

      export default SectionHeader