import type { FastifyInstance } from "fastify"
import { createTaskController, listTasksController, getTaskByIdController, updateTaskController, deleteTaskController} from "../controllers/task.controller.js"

export async function tasksRoutes(app: FastifyInstance) {

  app.post("/tasks", createTaskController)

  app.get("/tasks", listTasksController)

  app.get("/tasks/:id", getTaskByIdController)

  app.put("/tasks/:id", updateTaskController)

  app.delete("/tasks/:id", deleteTaskController)
}