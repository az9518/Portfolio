'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { name as devName, bio } from '@/lib/data';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    opacity: number;
    color: string;
}

interface CrystalFragment {
    x: number;
    y: number;
    size: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
}

interface EnergyTrail {
    x: number;
    y: number;
    length: number;
    speedY: number;
    opacity: number;
    color: string;
}

export default function CosmicHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        // Initialize particles (stars)
        const particles: Particle[] = [];
        for (let i = 0; i < 200; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedY: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
                color: Math.random() > 0.5 ? '#00f3ff' : '#ffffff',
            });
        }

        // Initialize crystal fragments
        const crystals: CrystalFragment[] = [];
        for (let i = 0; i < 30; i++) {
            crystals.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 30 + 10,
                speedY: Math.random() * 1.5 + 0.8,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                opacity: Math.random() * 0.6 + 0.2,
            });
        }

        // Initialize energy trails
        const energyTrails: EnergyTrail[] = [];
        for (let i = 0; i < 15; i++) {
            energyTrails.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 200 + 100,
                speedY: Math.random() * 3 + 1.5,
                opacity: Math.random() * 0.4 + 0.2,
                color: Math.random() > 0.5 ? '#00f3ff' : '#b026ff',
            });
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw and update particles
            particles.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
                ctx.fill();

                particle.y -= particle.speedY;

                // Reset particle when it goes off screen
                if (particle.y < -10) {
                    particle.y = canvas.height + 10;
                    particle.x = Math.random() * canvas.width;
                }
            });

            // Draw and update energy trails
            energyTrails.forEach((trail) => {
                const gradient = ctx.createLinearGradient(trail.x, trail.y, trail.x, trail.y + trail.length);
                gradient.addColorStop(0, `${trail.color}00`);
                gradient.addColorStop(0.5, `${trail.color}${Math.floor(trail.opacity * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${trail.color}00`);

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(trail.x, trail.y);
                ctx.lineTo(trail.x, trail.y + trail.length);
                ctx.stroke();

                // Add glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = trail.color;
                ctx.stroke();
                ctx.shadowBlur = 0;

                trail.y -= trail.speedY;

                // Reset trail when it goes off screen
                if (trail.y < -trail.length) {
                    trail.y = canvas.height + trail.length;
                    trail.x = Math.random() * canvas.width;
                }
            });

            // Draw and update crystal fragments
            crystals.forEach((crystal) => {
                ctx.save();
                ctx.translate(crystal.x, crystal.y);
                ctx.rotate(crystal.rotation);

                // Draw crystal as a glowing triangle
                ctx.beginPath();
                ctx.moveTo(0, -crystal.size / 2);
                ctx.lineTo(crystal.size / 2, crystal.size / 2);
                ctx.lineTo(-crystal.size / 2, crystal.size / 2);
                ctx.closePath();

                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, crystal.size);
                gradient.addColorStop(0, `rgba(0, 243, 255, ${crystal.opacity})`);
                gradient.addColorStop(0.5, `rgba(176, 38, 255, ${crystal.opacity * 0.6})`);
                gradient.addColorStop(1, `rgba(0, 243, 255, 0)`);

                ctx.fillStyle = gradient;
                ctx.fill();

                // Add crystal edge glow
                ctx.strokeStyle = `rgba(0, 243, 255, ${crystal.opacity * 0.8})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();

                crystal.y -= crystal.speedY;
                crystal.rotation += crystal.rotationSpeed;

                // Reset crystal when it goes off screen
                if (crystal.y < -crystal.size) {
                    crystal.y = canvas.height + crystal.size;
                    crystal.x = Math.random() * canvas.width;
                    crystal.rotation = Math.random() * Math.PI * 2;
                }
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [dimensions]);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {/* Canvas for particles and effects */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: '#000000' }}
            />

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f3ff0a_1px,transparent_1px),linear-gradient(to_bottom,#00f3ff0a_1px,transparent_1px)] bg-[size:100px_100px]" />

            {/* Central glowing data sphere */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="relative"
                >
                    {/* Outer glow rings */}
                    <div className="absolute inset-0 -m-32">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="w-full h-full rounded-full border border-cyan-500/20"
                        />
                    </div>
                    <div className="absolute inset-0 -m-40">
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                            className="w-full h-full rounded-full border border-purple-500/10"
                        />
                    </div>

                    {/* Main sphere container */}
                    <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] flex items-center justify-center">
                        {/* Glowing sphere background */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 via-purple-600/20 to-blue-500/20 blur-3xl animate-pulse" />

                        {/* Sphere with wireframe */}
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 shadow-[0_0_100px_rgba(0,243,255,0.5),inset_0_0_100px_rgba(0,243,255,0.2)]">
                            {/* Wireframe lines */}
                            <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 rotate-45" />
                            <div className="absolute inset-0 rounded-full border-2 border-purple-400/20 -rotate-45" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 text-center px-12 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                                    <span className="text-white">Hello, I'm</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,243,255,0.8)]">
                                        {devName}
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="space-y-3"
                            >
                                <p className="text-2xl md:text-3xl font-semibold text-cyan-300 drop-shadow-[0_0_10px_rgba(0,243,255,0.6)]">
                                    Full Stack Web Developer
                                </p>
                                <p className="text-sm md:text-base text-gray-300 max-w-md mx-auto leading-relaxed opacity-80">
                                    {bio.substring(0, 200)}...
                                </p>
                            </motion.div>

                            {/* Floating code snippets */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -left-24 top-20 text-cyan-400/40 font-mono text-xs"
                            >
                                {'<code>'}
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute -right-20 top-32 text-purple-400/40 font-mono text-xs"
                            >
                                {'{...props}'}
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                className="absolute -left-28 bottom-24 text-cyan-400/40 font-mono text-xs"
                            >
                                {'const dev = ()'}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-2"
                >
                    <div className="w-1 h-2 bg-cyan-400 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
