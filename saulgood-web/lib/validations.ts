import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  property: z.string().min(2, "Property name & website is required."),
  location: z.string().min(2, "Location is required."),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service."),
  timeline: z.string().min(1, "Please provide a preferred timeline."),
  message: z.string().min(10, "Message must be at least 10 characters."),
  // Honeypot field (must remain empty)
  _hp_company: z.string().max(0, "Bot detected").optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
