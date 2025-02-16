import { z, ZodString } from "zod"
export const emailSchema: ZodString = z
    .string()
    .trim()
    .email("Invalid email address")
    .min(1)
    .max(255)
export const passwordSchema: ZodString = z
    .string()
    .trim()
    .min(4)
export const registerSchema: any = z.object({
    name: z
        .string()
        .trim()
        .min(1)
        .max(255),
    email: emailSchema,
    password: passwordSchema
})
export const loginSchema: any = z.object({
    email: emailSchema,
    password: passwordSchema
})