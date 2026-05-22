/**
 * Zod schemas for auth-related Server Action inputs.
 *
 * Every Server Action validates its FormData through one of these schemas
 * before touching the database. Per the cross-cutting principle "Zod at
 * boundaries."
 */

import { z } from "zod";

export const LoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username must be at most 30 characters."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(200, "Password too long."),
});

export type LoginInput = z.infer<typeof LoginSchema>;
