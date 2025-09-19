import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { socialLinks } from "@/lib/data/social";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <p>
            Made with ❤️ by &copy; {new Date().getFullYear()} Shahrukh Yousafzai.
          </p>
          <Link href="/cv" className="hover:text-primary transition-colors">Printable CV</Link>
          <Link href="/portfolio/pdf" className="hover:text-primary transition-colors">Printable Portfolio</Link>
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map((social) => (
             <Button key={social.name} variant="ghost" size="icon" asChild>
              <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                 <social.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
