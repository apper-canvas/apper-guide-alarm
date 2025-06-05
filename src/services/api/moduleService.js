import moduleData from '../mockData/modules.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ModuleService {
  async getAll() {
    await delay(300)
    return [...moduleData]
  }

  async getById(id) {
    await delay(200)
    const module = moduleData.find(m => m.id === id)
    if (!module) {
      throw new Error('Module not found')
    }
    return { ...module }
  }

  async create(module) {
    await delay(400)
    const newModule = {
      ...module,
      id: Date.now().toString(),
      isCompleted: false
    }
    return { ...newModule }
  }

  async update(id, data) {
    await delay(350)
    const moduleIndex = moduleData.findIndex(m => m.id === id)
    if (moduleIndex === -1) {
      throw new Error('Module not found')
    }
    
    const updatedModule = { ...moduleData[moduleIndex], ...data }
    return { ...updatedModule }
  }

  async delete(id) {
    await delay(250)
    const moduleIndex = moduleData.findIndex(m => m.id === id)
    if (moduleIndex === -1) {
      throw new Error('Module not found')
    }
    
    return { success: true }
  }
}

export default new ModuleService()