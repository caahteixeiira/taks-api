import Fastify from "fastify"
import { ZodError } from "zod"

import { healthRoutes } from "./routes/health.js"
import { tasksRoutes } from "./modules/tasks/routes/tasks.routes.js"

export function buildApp() {

  const app = Fastify({
    logger: true
  })

  app.register(healthRoutes)
  app.register(tasksRoutes)

  app.setErrorHandler((error, request, reply) => {

    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: "Validation error",
        issues: error.issues
      })
    }

    request.log.error(error)

    return reply.status(500).send({
      message: "Internal server error"
    })
  })

  return app
}