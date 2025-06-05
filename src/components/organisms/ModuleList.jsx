import ModuleCard from '@/components/molecules/ModuleCard'

      const ModuleList = ({ modules, currentModule, isModuleCompleted, onModuleSelect }) => {
        return (
          <nav className="space-y-2">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                isCurrent={currentModule?.id === module.id}
                isCompleted={isModuleCompleted(module.id)}
                onSelect={onModuleSelect}
              />
            ))}
          </nav>
        )
      }

      export default ModuleList