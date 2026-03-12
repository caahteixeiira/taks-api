import type { TaskRepository } from "../../../domain/repositories/task-repository.js"
import type { Task } from "../../../domain/entities/task.js"
import type { CreateTaskInput, UpdateTaskInput } from "../schemas/task.schema.js"

export class TasksRepository implements TaskRepository {

  private tasks: Task[] = []

  async create(data: CreateTaskInput): Promise<Task> {
    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description ?? null
    }

    this.tasks.push(task)

    return task
  }

  async list(): Promise<Task[]> {
    return this.tasks
  }

  async findById(id: string): Promise<Task | undefined> {
    return this.tasks.find(task => task.id === id)
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task | null> {
    const task = this.tasks.find(task => task.id === id)

    if (!task) return null

    if (data.title !== undefined) task.title = data.title
    if (data.description !== undefined) task.description = data.description

    return task
  }

  delete(id: string): boolean {
    const index = this.tasks.findIndex(task => task.id === id)

    if (index === -1) return false

    this.tasks.splice(index, 1)

    return true
  }
}