"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gamepad2, Menu, X } from "lucide-react";
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
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {item.label}
        </a>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        isScrolled ? "border-border/40 bg-background/80 backdrop-blur-sm" : ""
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-lg">Shahrukh</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavItems />
        </nav>
        <div className="hidden md:flex items-center gap-2">
          {socialLinks.map((social) => (
            <Button key={social.name} variant="ghost" size="icon" asChild>
              <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                <social.icon className="h-5 w-5" />
              </a>
            </Button>
          ))}
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Gamepad2 className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline text-lg">Shahrukh</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-6 mt-6">
                  <NavItems isMobile={true} />
                </nav>
                <div className="mt-auto flex justify-center gap-2 border-t pt-4">
                  {socialLinks.map((social) => (
                    <Button key={social.name} variant="ghost" size="icon" asChild>
                      <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                        <social.icon className="h-5 w-5" />
                      </a>
                    </Button>
                  ))}
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
