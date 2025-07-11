"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const validatedFields = contactSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please correct the errors below.",
        success: false,
      };
    }

    // In a real application, you would send an email, save to a database, etc.
    console.log("New contact form submission:");
    console.log("Name:", validatedFields.data.name);
    console.log("Email:", validatedFields.data.email);
    console.log("Message:", validatedFields.data.message);

    return {
      message: "Thank you for your message! I will get back to you soon.",
      errors: null,
      success: true,
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
      errors: null,
      success: false,
    };
  }
}
