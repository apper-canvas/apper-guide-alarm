import { useState } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { toast } from 'react-toastify'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'

      const PromptBlock = ({ example }) => {
        const [expanded, setExpanded] = useState(false)
        const [copied, setCopied] = useState(false)

        const copyPrompt = async (prompt) => {
          try {
            await navigator.clipboard.writeText(prompt)
            setCopied(true)
            toast.success("Prompt copied to clipboard!", {
              icon: "📋"
            })
            setTimeout(() => setCopied(false), 2000)
          } catch (err) {
            toast.error("Failed to copy prompt")
          }
        }

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-card border border-surface-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Title level="h3">Try This Prompt</Title>
                <Button
                  onClick={() => copyPrompt(example.prompt)}
                  icon={Icon}
                  iconName={copied ? "Check" : "Copy"}
                  className="px-4 py-2"
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              
              <div className="bg-surface-50 rounded-lg p-4 mb-4 border-l-4 border-primary">
                <Text type="code">{example.prompt}</Text>
              </div>
              
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
              >
                <Icon 
                  name={expanded ? "ChevronUp" : "ChevronDown"} 
                  className="w-4 h-4" 
                />
                {expanded ? "Hide" : "Show"} Expected Output
              </button>
              
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 space-y-4"
                  >
                    <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                      <Title level="h4" className="mb-2">Expected Output:</Title>
                      <Text type="paragraph" className="text-sm">{example.output}</Text>
                    </div>
                    
                    {example.explanation && (
                      <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                        <Title level="h4" className="mb-2">How It Works:</Title>
                        <Text type="paragraph" className="text-sm">{example.explanation}</Text>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      }

      export default PromptBlock