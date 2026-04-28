import { z } from "zod";
export const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().optional(),
    consent: z.boolean().refine(val => val === true, {
        message: "You must agree to the terms and conditions"
    }),
    file: z.any().refine(file => 
        file?.length === 1, "File is required")
        .refine(
            file => [
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
                .includes(file[0]?.type),
            "Only PDF and DOCX files are allowed"
        )
        .refine(file => file[0]?.size <= 2.5 * 1024 * 1024, "File size must be less than 2.5MB")
})
