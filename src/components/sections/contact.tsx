"use client";

import { useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send, Loader2 } from "lucide-react";
import { about } from "@/lib/data/about";
import { socialLinks } from "@/lib/data/social";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" /> Send Message
        </>
      )}
    </Button>
  );
};

const ContactSection = () => {
  const [state, formAction] = useActionState(submitContactForm, { message: null, errors: null, success: false });
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Message Sent!",
          description: state.message,
        });
        reset();
      } else {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, reset]);
  
  const serverErrors = state.errors;

  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">Get In Touch</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Form</CardTitle>
                    <CardDescription>Fill out the form below and I'll get back to you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div>
                            <Input {...register("name")} placeholder="Your Name" />
                            {(errors.name || serverErrors?.name) && <p className="text-sm text-destructive mt-1">{errors.name?.message || serverErrors?.name?.[0]}</p>}
                        </div>
                        <div>
                            <Input {...register("email")} placeholder="Your Email" type="email" />
                            {(errors.email || serverErrors?.email) && <p className="text-sm text-destructive mt-1">{errors.email?.message || serverErrors?.email?.[0]}</p>}
                        </div>
                        <div>
                           <Textarea {...register("message")} placeholder="Your Message" rows={5} />
                           {(errors.message || serverErrors?.message) && <p className="text-sm text-destructive mt-1">{errors.message?.message || serverErrors?.message?.[0]}</p>}
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
            <div className="space-y-6 pt-4">
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-full p-3 w-fit">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold font-headline">Email</h3>
                        <p className="text-muted-foreground">The best way to reach me.</p>
                        <a href={`mailto:${about.email}`} className="text-primary hover:underline">
                          {about.email}
                        </a>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary rounded-full p-3 w-fit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold font-headline">Freelance Platforms</h3>
                        <p className="text-muted-foreground">Find me on Fiverr and Upwork for project-based work.</p>
                        <div className="flex gap-4 mt-2">
                             <a href={socialLinks.find(s => s.name === "Fiverr")?.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Fiverr</a>
                             <a href={socialLinks.find(s => s.name === "Upwork")?.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Upwork</a>
                        </div>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
