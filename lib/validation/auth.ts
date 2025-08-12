import { z } from 'zod'

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^09\d{9}$/, 'شماره باید 11 رقم و با 09 شروع شود')

export const loginSchema = z.object({
  phone: phoneSchema
})

export type LoginForm = z.infer<typeof loginSchema>