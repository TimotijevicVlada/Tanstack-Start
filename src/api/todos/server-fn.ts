import { createServerFn } from '@tanstack/react-start'
import { asc, eq } from 'drizzle-orm'
import type {
  CreateTodoPayload,
  DeleteTodoPayload,
  GetTodoByIdPayload,
  ToggleCompletePayload,
  UpdateTodoPayload,
} from '@/api/todos/types'
import { db } from '@/db'
import { todos } from '@/db/schema'
import { requireAuth } from '@/lib/auth'

export const getTodos = createServerFn({
  method: 'GET',
}).handler(async (ctx) => {
  // Require authentication
  requireAuth(ctx)

  return await db.query.todos.findMany({
    orderBy: [asc(todos.createdAt)],
    // NOTE: if I want to include the comments:
    // with: {
    //   comments: true,
    // },
  })
})

export const getTodoById = createServerFn({
  method: 'GET',
})
  .inputValidator((data: GetTodoByIdPayload) => data)
  .handler(async (ctx) => {
    // Require authentication
    requireAuth(ctx)

    return await db.query.todos.findFirst({
      where: eq(todos.id, ctx.data.id),
    })
  })

export const createTodo = createServerFn({
  method: 'POST',
})
  .inputValidator((data: CreateTodoPayload) => data)
  .handler(async (ctx) => {
    // Require authentication
    requireAuth(ctx)

    const [newTodo] = await db
      .insert(todos)
      .values({ title: ctx.data.title, description: ctx.data.description })
      .returning()
    return newTodo
  })

export const deleteTodo = createServerFn({
  method: 'POST',
})
  .inputValidator((data: DeleteTodoPayload) => data)
  .handler(async (ctx) => {
    // Require authentication
    requireAuth(ctx)

    const [deletedTodo] = await db
      .delete(todos)
      .where(eq(todos.id, ctx.data.id))
      .returning()
    return deletedTodo
  })

export const updateTodo = createServerFn({
  method: 'POST',
})
  .inputValidator((data: UpdateTodoPayload) => data)
  .handler(async (ctx) => {
    // Require authentication
    requireAuth(ctx)

    const [updatedTodo] = await db
      .update(todos)
      .set({ title: ctx.data.title, description: ctx.data.description })
      .where(eq(todos.id, ctx.data.id))
      .returning()
    return updatedTodo
  })

export const toggleComplete = createServerFn({
  method: 'POST',
})
  .inputValidator((data: ToggleCompletePayload) => data)
  .handler(async (ctx) => {
    // Require authentication
    requireAuth(ctx)

    const [updatedTodo] = await db
      .update(todos)
      .set({ completed: !ctx.data.completed })
      .where(eq(todos.id, ctx.data.id))
      .returning()
    return updatedTodo
  })
