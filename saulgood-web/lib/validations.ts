import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  property: z.string().trim().min(2, "Property name & website is required.").max(300),
  location: z.string().trim().min(2, "Location is required.").max(200),
  services: z
    .array(z.string().max(60))
    .min(1, "Please select at least one service.")
    .max(6),
  timeline: z.string().trim().min(1, "Please provide a preferred timeline.").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters.").max(5000),
  // Honeypot field: checked in the API route BEFORE validation
  _hp_company: z.string().max(200).optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
