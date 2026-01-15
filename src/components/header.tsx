'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Code } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/30 backdrop-blur-md supports-[backdrop-filter]:bg-background/30">
      <div className="container flex h-16 items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mr-4 hidden items-center lg:flex">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline group">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Code className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-primary group-hover:to-secondary transition-all duration-300">
              Aman Srivastava
            </span>
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm lg:flex flex-1 justify-end">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative font-code text-muted-foreground transition-colors hover:text-primary hover:shadow-[0_0_10px_rgba(0,243,255,0.5)]"
            >
              <span className="relative z-10">&lt;{link.name} /&gt;</span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
            <Code className="h-6 w-6 text-primary" />
            <span>Aman Srivastava</span>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-primary/20 bg-background/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline" onClick={() => setOpen(false)}>
                    <Code className="h-6 w-6 text-primary" />
                    <span>Aman Srivastava</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-code font-medium text-muted-foreground transition-colors hover:text-primary hover:pl-2"
                  >
                    &lt;{link.name} /&gt;
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
