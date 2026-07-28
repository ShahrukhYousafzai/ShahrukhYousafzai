"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Building2, Linkedin } from "lucide-react";
import { about } from "@/lib/data/about";
import { socialLinks } from "@/lib/data/social";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    const subject = encodeURIComponent(`Founder inquiry — ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}\n\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
    const mailtoLink = `mailto:${about.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    reset();
  };

  const linkedinLink = socialLinks.find((s) => s.name === "LinkedIn");

  return (
    <section id="contact" className="bg-background">
      <div className="container py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 mb-14 md:mb-20">
          <div>
            <div className="section-label mb-3">Get In Touch</div>
            <h2 className="font-headline text-3xl font-medium leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
              Get in
              <br />
              <span className="text-muted-foreground">touch.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:pt-3 md:text-lg">
            For collaboration, speaking, founder-to-founder introductions, or
            hiring our studios &mdash; drop a line below. For active
            projects, jump straight to{" "}
            <a
              href="https://afscreativestudio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground link-underline font-medium"
            >
              AFS Creative Studio
            </a>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border/80 md:grid-cols-[1.4fr_1fr] border border-border/80">
          {/* Form */}
          <div className="bg-background p-7 md:p-10">
            <div className="border-b border-border/80 pb-3 mb-7">
              <div className="text-sm font-semibold text-foreground">Send a message</div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Name / Company
                </label>
                <Input
                  {...register("name")}
                  placeholder="Your name or company"
                  className="mt-2 h-12 rounded-lg border-border/80 bg-transparent px-4 text-base focus-visible:ring-1 focus-visible:ring-primary"
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  {...register("email")}
                  placeholder="you@example.com"
                  type="email"
                  className="mt-2 h-12 rounded-lg border-border/80 bg-transparent px-4 text-base focus-visible:ring-1 focus-visible:ring-primary"
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Message
                </label>
                <Textarea
                  {...register("message")}
                  placeholder="What are you looking to ship?"
                  rows={5}
                  className="mt-2 rounded-none border-border/80 border-x-0 border-t-0 bg-transparent px-0 text-base focus-visible:ring-0 focus-visible:border-primary resize-none"
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-destructive">
                    {errors.message?.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                <Send className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} />
                Send Message
              </Button>
            </form>
          </div>

          {/* Channels */}
          <aside className="bg-background p-7 md:p-10">
            <div className="border-b border-border/80 pb-3 mb-7">
              <div className="text-sm font-semibold text-foreground">Or reach out directly</div>
            </div>

            <ul className="divide-y divide-border/80">
              <li className="py-5">
                <div className="flex items-start gap-4">
                  <Mail className="mt-0.5 h-4 w-4 text-foreground/80" strokeWidth={1.5} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-muted-foreground">
                      Email · Founder Direct
                    </div>
                    <a
                      href={`mailto:${about.email}`}
                      className="mt-1 block break-all font-headline text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {about.email}
                    </a>
                  </div>
                </div>
              </li>
              <li className="py-5">
                <div className="flex items-start gap-4">
                  <Building2 className="mt-0.5 h-4 w-4 text-foreground/80" strokeWidth={1.5} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-muted-foreground">
                      Agency
                    </div>
                    <a
                      href="https://afscreativestudio.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block font-headline text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      afscreativestudio.netlify.app &rarr;
                    </a>
                  </div>
                </div>
              </li>
              <li className="py-5">
                <div className="flex items-start gap-4">
                  <Linkedin className="mt-0.5 h-4 w-4 text-foreground/80" strokeWidth={1.5} />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-muted-foreground">
                      LinkedIn
                    </div>
                    {linkedinLink && (
                      <a
                        href={linkedinLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block font-headline text-base font-medium text-foreground hover:text-primary transition-colors"
                      >
                        Connect &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-7 border-t border-border/80 pt-5">
              <div className="text-xs font-medium text-muted-foreground mb-2">Response time</div>
              <p className="text-sm text-muted-foreground">
                ~24 hours · routed directly to the founder
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
