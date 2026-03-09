import { z } from "zod"

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable().default(null)
}).strict()

export const taskParamsSchema = z.object({
  id: z.string()
})

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.union([z.string(), z.null()]).optional()
}).strict()
export const updateTaskParamsSchema = z.object({
  id: z.string()
})
export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>