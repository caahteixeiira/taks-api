import type { FastifyRequest, FastifyReply } from "fastify"
import { TaskService, UpdateTaskService } from "../services/task.service.js"
import { TasksRepository } from "../repositories/tasks.repository.js"
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js"
import { taskParamsSchema } from "../schemas/task.schema.js"

const repository = new TasksRepository()
const service = new TaskService(repository)

export async function createTaskController(
  request: FastifyRequest,
  reply: FastifyReply
) {
   const data = createTaskSchema.parse(request.body)
   

  const task = await service.create(data)

  return reply.status(201).send(task)
}
export async function listTasksController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const tasks = await service.list()

  return reply.send(tasks)
}

export async function getTaskByIdController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = taskParamsSchema.parse(request.params)

  const task = await service.getById(id)

  if (!task) {
    return reply.status(404).send({
      message: "Task not found"
    })
  }

  return reply.send(task)
}

export async function updateTaskController(request: FastifyRequest, reply: FastifyReply) {

  const { id } = taskParamsSchema.parse(request.params)
  const data = updateTaskSchema.parse(request.body)

  const service = new UpdateTaskService(repository)

  const task = await service.execute(id, data)

  return reply.send(task)
}

export async function deleteTaskController(request: FastifyRequest, reply: FastifyReply) {

  const { id } = taskParamsSchema.parse(request.params)

  const deleted = repository.delete(id)

  if (!deleted) {
    return reply.status(404).send({
      message: "Task not found"
    })
  }

  return reply.status(204).send()
}