"use client";

import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/data';

export default function SocialIcons3D() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20"
            aria-label="Social media links"
        >
            {/* Glassmorphism container */}
            <div className="flex items-center gap-4 px-6 py-3 rounded-full
                           bg-black/30 backdrop-blur-xl border border-cyan-500/20
                           shadow-[0_0_30px_rgba(0,243,255,0.1)]">
                {socialLinks.map((link, index) => (
                    <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit my ${link.name} profile`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        whileHover={{
                            scale: 1.15,
                            transition: { duration: 0.2, ease: "easeOut" }
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative w-12 h-12 flex items-center justify-center rounded-full 
                                   bg-gradient-to-br from-cyan-500/10 to-transparent
                                   border border-cyan-500/30
                                   hover:border-cyan-400/80 hover:from-cyan-500/20
                                   transition-all duration-300 cursor-pointer
                                   focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-[#050505]"
                    >
                        {/* Primary glow effect on hover */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-cyan-400/0 blur-xl
                                       group-hover:bg-cyan-400/30 transition-all duration-500"
                            style={{ transform: 'scale(1.5)' }}
                        />

                        {/* Secondary magenta glow */}
                        <motion.div
                            className="absolute inset-0 rounded-full bg-purple-500/0 blur-lg
                                       group-hover:bg-purple-500/20 transition-all duration-700 delay-100"
                            style={{ transform: 'scale(1.3) translateX(5px)' }}
                        />

                        {/* Icon */}
                        <link.icon
                            className="w-5 h-5 text-gray-400 group-hover:text-cyan-300 
                                       transition-all duration-300 relative z-10
                                       group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
                            aria-hidden="true"
                        />

                        {/* Pulsing outer ring animation */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-cyan-400/0 
                                       group-hover:border-cyan-400/40 transition-all duration-300"
                            whileHover={{
                                scale: [1, 1.3, 1.3],
                                opacity: [0, 0.5, 0],
                                transition: { duration: 1, repeat: Infinity }
                            }}
                        />

                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5
                                        bg-black/80 backdrop-blur-md rounded-lg text-xs font-code
                                        text-cyan-300 border border-cyan-500/30
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-200
                                        pointer-events-none whitespace-nowrap
                                        shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                            {link.name}
                            {/* Tooltip arrow */}
                            <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px
                                            border-4 border-transparent border-t-cyan-500/30" />
                        </span>
                    </motion.a>
                ))}
            </div>
        </motion.nav>
    );
}
