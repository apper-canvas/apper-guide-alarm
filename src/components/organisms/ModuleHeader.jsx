import Icon from '@/components/atoms/Icon'
      import LinkButton from '@/components/atoms/LinkButton'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'

      const ModuleHeader = ({ currentModule, onToggleSidebar, sidebarOpen }) => {
        return (
          <header className="bg-white border-b border-surface-200 p-4 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <LinkButton
                onClick={onToggleSidebar}
                iconName={sidebarOpen ? "X" : "Menu"}
                className="lg:hidden"
              />
              
              {currentModule && (
                <div>
                  <Title level="h2">{currentModule.title}</Title>
                  <Text className="text-sm text-gray-500">{currentModule.description}</Text>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <LinkButton
                title="Search coming soon!"
                iconName="Search"
                disabled
              />
              <LinkButton
                title="Bookmarks coming soon!"
                iconName="Bookmark"
                disabled
              />
              <LinkButton
                title="Settings coming soon!"
                iconName="Settings"
                disabled
              />
            </div>
          </header>
        )
      }

      export default ModuleHeader