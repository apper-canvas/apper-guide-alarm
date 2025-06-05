import SectionHeader from '@/components/molecules/SectionHeader'
      import PromptBlock from '@/components/molecules/PromptBlock'

      const ExamplesSection = ({ examples }) => {
        if (!examples || examples.length === 0) return null

        return (
          <div className="space-y-6">
            <SectionHeader iconName="Lightbulb" title="Try These Examples" />
            <div className="grid gap-6">
              {examples.map((example) => (
                <PromptBlock key={example.id} example={example} />
              ))}
            </div>
          </div>
        )
      }

      export default ExamplesSection