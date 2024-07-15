import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
export const NewWebsiteSchema = z
  .object({
    name: z
      .string({ required_error: "Website name is required." })
      .min(3, { message: "Website name must be at least 3 characters" }),
    url: z.string().url({ message: "Invalid url" }),
  })
  .required();

export const NewHubSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Hub name must be at least 3 characters" }),
  topic: z
    .string()
    .min(3, { message: "Hub topic must be at least 3 characters" }),
  addToMatrix: z.boolean().optional(),
});
