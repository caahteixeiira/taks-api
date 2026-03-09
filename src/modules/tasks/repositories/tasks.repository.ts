import type { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema.js"

export interface Task {
  id: string
  title: string
  description: string | null
}

export class TasksRepository {

  private tasks: Task[] = []

async create(data: CreateTaskInput) {
  const task = {
    id: crypto.randomUUID(),
    ...data
  }

  this.tasks.push(task)

  return task
}

  async list() {
    return this.tasks
  }

  async findById(id: string) {
    return this.tasks.find(task => task.id === id)
  }

  clear() {
    this.tasks = []
  }
  update(id: string, data: UpdateTaskInput): Task | null {
  const task = this.tasks.find(task => task.id === id)

  if (!task) {
    return null
  }

  // Filter out undefined values
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined)
  )

  Object.assign(task, filteredData)

  return task

  
}

delete(id: string): boolean {

  const index = this.tasks.findIndex(task => task.id === id)

  if (index === -1) {
    return false
  }

  this.tasks.splice(index, 1)

  return true
}
}