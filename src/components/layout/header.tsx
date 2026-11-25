"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data/nav";
import { socialLinks } from "@/lib/data/social";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavItems = ({ isMobile = false }) => (
    <>
      {navLinks.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {item.label}
        </a>
      ))}
    </>
  );

  const channelLinks = socialLinks;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-all duration-300",
        isScrolled ? "bg-background/95" : ""
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-headline text-base font-medium tracking-tight md:text-lg">
            Shahrukh Yousafzai
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            · Independent · 2017 — ∞</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <NavItems />
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          <div className="flex items-center gap-1">
            {channelLinks.slice(0, 3).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <social.icon className="h-4 w-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-4 w-4" strokeWidth={1.5} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] border-l border-border/80 bg-background p-0"
            >
              <div className="flex h-full flex-col">
                <div className="border-b border-border/80 px-6 py-5">
                  <div className="font-headline text-base font-medium tracking-tight">
                    Shahrukh Yousafzai
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Independent Creative Engineer
                  </div>
                </div>
                <nav className="flex flex-col gap-5 px-6 py-6">
                  <NavItems isMobile={true} />
                </nav>
                <div className="mt-auto space-y-5 border-t border-border/80 px-6 py-6">
                  <div>
                    <div className="eyebrow mb-3">Channels</div>
                    <div className="flex gap-2">
                      {channelLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="flex h-9 w-9 items-center justify-center border border-border/80 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                        >
                          <social.icon className="h-4 w-4" strokeWidth={1.5} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
