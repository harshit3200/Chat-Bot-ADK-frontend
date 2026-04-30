import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  comment: z.string().optional(),

  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree",
  }),

  file: z
    .any()
    // // file upload required
    .optional()
    .refine(
      (file) =>
        file &&
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Upload PDF or DOCX only"
    )
    .refine(
      (file) => file && file.size <= 10 * 1024 * 1024,
      "Max file size is 10MB"
    ),
});