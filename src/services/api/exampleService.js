import exampleData from '../mockData/examples.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ExampleService {
  async getAll() {
    await delay(250)
    return [...exampleData]
  }

  async getById(id) {
    await delay(200)
    const example = exampleData.find(e => e.id === id)
    if (!example) {
      throw new Error('Example not found')
    }
    return { ...example }
  }

  async getByModuleId(moduleId) {
    await delay(300)
    return exampleData.filter(e => e.moduleId === moduleId).map(e => ({ ...e }))
  }

  async create(example) {
    await delay(400)
    const newExample = {
      ...example,
      id: Date.now().toString()
    }
    return { ...newExample }
  }

  async update(id, data) {
    await delay(350)
    const exampleIndex = exampleData.findIndex(e => e.id === id)
    if (exampleIndex === -1) {
      throw new Error('Example not found')
    }
    
    const updatedExample = { ...exampleData[exampleIndex], ...data }
    return { ...updatedExample }
  }

  async delete(id) {
    await delay(250)
    const exampleIndex = exampleData.findIndex(e => e.id === id)
    if (exampleIndex === -1) {
      throw new Error('Example not found')
    }
    
    return { success: true }
  }
}

export default new ExampleService()