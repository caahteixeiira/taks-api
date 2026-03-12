import type { Task } from "../entities/task.js"
import type { CreateTaskInput, UpdateTaskInput } from "../../modules/tasks/schemas/task.schema.js"

export interface TaskRepository {

  create(data: CreateTaskInput): Promise<Task>

  list(): Promise<Task[]>

  findById(id: string): Promise<Task | undefined>

  update(id: string, data: UpdateTaskInput): Promise<Task | null>

  delete(id: string): boolean

}