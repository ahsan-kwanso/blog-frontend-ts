import { z } from "zod";
import { VALIDATION_MESSAGES } from "../utils/messages";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty(VALIDATION_MESSAGES.email.required)
    .email(VALIDATION_MESSAGES.email.invalid),
  password: z.string().trim().nonempty(VALIDATION_MESSAGES.password.required),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, VALIDATION_MESSAGES.name.required),
  email: z
    .string()
    .trim()
    .min(1, VALIDATION_MESSAGES.email.required)
    .email(VALIDATION_MESSAGES.email.invalid),
  password: z
    .string()
    .trim()
    .nonempty(VALIDATION_MESSAGES.password.required)
    .min(6, VALIDATION_MESSAGES.password.minLength),
});

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .trim()
    .nonempty(VALIDATION_MESSAGES.email.required)
    .email(VALIDATION_MESSAGES.email.invalid),
  code: z
    .string()
    .trim()
    .trim()
    .nonempty(VALIDATION_MESSAGES.code.required)
    .min(1, VALIDATION_MESSAGES.reply.empty),
});

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, VALIDATION_MESSAGES.title.required)
    .max(100, VALIDATION_MESSAGES.title.maxLength),
  content: z
    .string()
    .trim()
    .min(10, VALIDATION_MESSAGES.content.minLength)
    .max(500, VALIDATION_MESSAGES.content.maxLength),
});

export const replySchema = z.object({
  reply: z
    .string()
    .trim()
    .trim()
    .min(1, VALIDATION_MESSAGES.reply.empty)
    .refine((value) => value.length > 0, VALIDATION_MESSAGES.reply.onlySpaces),
});

//make common variables
