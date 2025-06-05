import bookmarkData from '../mockData/bookmarks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class BookmarkService {
  constructor() {
    this.bookmarkData = [...bookmarkData]
  }

  async getAll() {
    await delay(200)
    return [...this.bookmarkData]
  }

  async getById(id) {
    await delay(150)
    const bookmark = this.bookmarkData.find(b => b.id === id)
    if (!bookmark) {
      throw new Error('Bookmark not found')
    }
    return { ...bookmark }
  }

  async create(bookmark) {
    await delay(300)
    const newBookmark = {
      ...bookmark,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    this.bookmarkData.push(newBookmark)
    return { ...newBookmark }
  }

  async update(id, data) {
    await delay(250)
    const bookmarkIndex = this.bookmarkData.findIndex(b => b.id === id)
    if (bookmarkIndex === -1) {
      throw new Error('Bookmark not found')
    }
    
    this.bookmarkData[bookmarkIndex] = { ...this.bookmarkData[bookmarkIndex], ...data }
    return { ...this.bookmarkData[bookmarkIndex] }
  }

  async delete(id) {
    await delay(200)
    const bookmarkIndex = this.bookmarkData.findIndex(b => b.id === id)
    if (bookmarkIndex === -1) {
      throw new Error('Bookmark not found')
    }
    
    this.bookmarkData.splice(bookmarkIndex, 1)
    return { success: true }
  }
}

export default new BookmarkService()