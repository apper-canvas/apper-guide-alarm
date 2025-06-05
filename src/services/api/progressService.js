import progressData from '../mockData/progress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ProgressService {
  constructor() {
    this.progressData = [...progressData]
  }

  async getAll() {
    await delay(200)
    return [...this.progressData]
  }

  async getById(id) {
    await delay(150)
    const progress = this.progressData.find(p => p.id === id)
    if (!progress) {
      throw new Error('Progress record not found')
    }
    return { ...progress }
  }

  async getByModuleId(moduleId) {
    await delay(200)
    return this.progressData.filter(p => p.moduleId === moduleId).map(p => ({ ...p }))
  }

  async create(progress) {
    await delay(300)
    const newProgress = {
      ...progress,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    this.progressData.push(newProgress)
    return { ...newProgress }
  }

  async update(id, data) {
    await delay(250)
    const progressIndex = this.progressData.findIndex(p => p.id === id)
    if (progressIndex === -1) {
      throw new Error('Progress record not found')
    }
    
    this.progressData[progressIndex] = { ...this.progressData[progressIndex], ...data }
    return { ...this.progressData[progressIndex] }
  }

  async delete(id) {
    await delay(200)
    const progressIndex = this.progressData.findIndex(p => p.id === id)
    if (progressIndex === -1) {
      throw new Error('Progress record not found')
    }
    
    this.progressData.splice(progressIndex, 1)
    return { success: true }
  }
}

export default new ProgressService()