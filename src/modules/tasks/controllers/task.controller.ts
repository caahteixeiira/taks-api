import type { FastifyRequest, FastifyReply } from "fastify"
import { TasksRepository } from "../repositories/tasks.repository.js"
import { createTaskSchema } from "../schemas/task.schema.js"
import { CreateTaskUseCase } from "../../../application/use-cases/tasks/create-task.js"

const repository = new TasksRepository()

export async function createTaskController(
  request: FastifyRequest,
  reply: FastifyReply
) {

  const data = createTaskSchema.parse(request.body)

  const useCase = new CreateTaskUseCase(repository)

  const task = await useCase.execute(data)

  return reply.status(201).send(task)
}