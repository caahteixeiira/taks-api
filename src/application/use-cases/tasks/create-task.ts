import { TasksRepository } from "../../../modules/tasks/repositories/tasks.repository.js"
import type { Task } from "../../../domain/entities/task.js"
import type { CreateTaskInput } from "../../../modules/tasks/schemas/task.schema.js"
import type { TaskRepository } from "../../../domain/repositories/task-repository.js"

export class CreateTaskUseCase {

    constructor(private tasksRepository: TaskRepository) {}

  async execute(data: CreateTaskInput): Promise<Task> {

    const task = await this.tasksRepository.create({
      title: data.title,
      description: data.description ?? null
    })

    return task
  }

}