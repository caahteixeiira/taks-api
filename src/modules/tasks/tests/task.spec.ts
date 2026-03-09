import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { buildApp } from "../../../app.js"
import type { FastifyInstance } from "fastify"

let app: FastifyInstance

beforeEach(async () => {
  app = buildApp()
  await app.ready()
})

afterEach(async () => {
  await app.close()
  // Clear repository data between tests
  const { TasksRepository } = await import('../repositories/tasks.repository.js')
  // Access the global instance if it exists
  if ((globalThis as any).taskRepository) {
    (globalThis as any).taskRepository.clear()
  }
})

describe("Tasks API", () => {

  it("should create a task", async () => {

    const response = await app.inject({
      method: "POST",
      url: "/tasks",
      payload: {
        title: "Study Fastify"
      }
    })

    expect(response.statusCode).toBe(201)

    const body = response.json()

    expect(body.title).toBe("Study Fastify")
    expect(body.description).toBeNull()
  })

  it("should list tasks", async () => {

    await app.inject({
      method: "POST",
      url: "/tasks",
      payload: {
        title: "Study Fastify"
      }
    })

    const response = await app.inject({
      method: "GET",
      url: "/tasks"
    })

    expect(response.statusCode).toBe(200)

    const body = response.json()

    expect(body.length).toBeGreaterThan(0)
  })

  it("should not create task without title", async () => {

    const response = await app.inject({
      method: "POST",
      url: "/tasks",
      payload: {
        description: "task sem titulo"
      }
    })

    expect(response.statusCode).toBe(400)
  })

  it("should get task by id", async () => {

    const createResponse = await app.inject({
      method: "POST",
      url: "/tasks",
      payload: {
        title: "Study Fastify"
      }
    })

    const createdTask = createResponse.json()

    const response = await app.inject({
      method: "GET",
      url: `/tasks/${createdTask.id}`
    })

    expect(response.statusCode).toBe(200)

    const body = response.json()

    expect(body.id).toBe(createdTask.id)
  })

  it("should return 404 if task does not exist", async () => {

    const response = await app.inject({
      method: "GET",
      url: "/tasks/invalid-id"
    })

    expect(response.statusCode).toBe(404)
  })

  it("should update a task", async () => {

  const create = await app.inject({
    method: "POST",
    url: "/tasks",
    payload: {
      title: "Task test"
    }
  })

  const task = create.json()

  const response = await app.inject({
    method: "PUT",
    url: `/tasks/${task.id}`,
    payload: {
      title: "Updated task"
    }
  })

  expect(response.statusCode).toBe(200)

  const updated = response.json()

  expect(updated.title).toBe("Updated task")
})

it("should delete a task", async () => {

  const create = await app.inject({
    method: "POST",
    url: "/tasks",
    payload: {
      title: "Task to delete"
    }
  })

  const task = JSON.parse(create.payload)

  const response = await app.inject({
    method: "DELETE",
    url: `/tasks/${task.id}`
  })

  expect(response.statusCode).toBe(204)

})
})