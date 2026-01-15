"use client";

import { Button } from '@/components/ui/button';
import { Mail, Linkedin } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import React from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Get In Touch
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-full max-w-sm space-y-2 flex justify-center gap-4"
        >
          {socialLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              size="icon"
              asChild
              className="rounded-full w-12 h-12 border-primary/20 hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]"
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                {React.createElement(link.icon, { className: "h-6 w-6" })}
              </a>
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
