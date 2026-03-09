import { TasksRepository } from "../repositories/tasks.repository.js"
import type { CreateTaskDTO } from "../dtos/task.dto.js"
import type { UpdateTaskInput } from "../schemas/task.schema.js"


export class TaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(data: CreateTaskDTO) {

    if (!data.title) {
      throw new Error("Title is required")
    }

    const task = await this.tasksRepository.create(data)

    return task
  }

  async list() {
    return this.tasksRepository.list()
  }

   async getById(id: string) {
    return this.tasksRepository.findById(id)
  }

}
export class UpdateTaskService {

  constructor(private taskRepository: TasksRepository) {}

  async execute(id: string, data: UpdateTaskInput) {

    const task = this.taskRepository.update(id, data)

    if (!task) {
      throw new Error("Task not found")
    }

    return task
  }
}