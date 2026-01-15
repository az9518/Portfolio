"use client";

import { skills } from '@/lib/data';
import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Total frames in the laptop animation sequence (using all frames for smoother animation)
const FRAME_STEP = 1; // Use every frame
const TOTAL_FRAMES = 40; // All 40 frames

// Preload images for smooth playback
function useImageSequence(frameCount: number) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = String((i * FRAME_STEP) + 1).padStart(3, '0');
      img.src = `/sequence2/ezgif-frame-${frameNum}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      
      loadedImages.push(img);
    }
  }, [frameCount]);

  return { images, isLoaded };
}

// Skill card component with enhanced styling
function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.02,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.05,
        y: -6,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      className="group cursor-pointer"
    >
      <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
        {/* Animated gradient background on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
        </div>
        
        <div className="relative flex flex-col items-center gap-3">
          {/* Icon container with glow */}
          <div className="relative p-3.5 rounded-xl bg-white/[0.05] group-hover:bg-cyan-500/10 transition-all duration-300">
            <skill.icon className="w-6 h-6 text-white/70 group-hover:text-cyan-400 transition-colors duration-300" />
            {/* Icon glow */}
            <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Skill name */}
          <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors duration-300 tracking-wide text-center">
            {skill.name}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, isLoaded } = useImageSequence(TOTAL_FRAMES);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  });

  // Smooth spring for animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Frame index based on scroll (first 50% of scroll controls the animation)
  const frameProgress = useTransform(smoothProgress, [0, 0.45], [0, TOTAL_FRAMES - 1]);

  // 3D perspective transforms for skills grid
  const skillsRotateX = useTransform(smoothProgress, [0.35, 0.6], [20, 0]);
  const skillsScale = useTransform(smoothProgress, [0.35, 0.6], [0.9, 1]);
  const skillsOpacity = useTransform(smoothProgress, [0.3, 0.45], [0, 1]);
  const skillsY = useTransform(smoothProgress, [0.35, 0.6], [60, 0]);

  // Canvas opacity (fades out as skills appear)
  const canvasOpacity = useTransform(smoothProgress, [0.35, 0.5], [1, 0]);
  const canvasScale = useTransform(smoothProgress, [0.35, 0.5], [1, 0.95]);
  const canvasY = useTransform(smoothProgress, [0.35, 0.5], [0, -30]);

  // Draw frame on canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !images[frameIndex]) return;

    const img = images[frameIndex];
    
    // Calculate dimensions to maintain aspect ratio
    const containerWidth = canvas.parentElement?.clientWidth || 800;
    const containerHeight = canvas.parentElement?.clientHeight || 500;
    
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate centered position maintaining aspect ratio
    const imgAspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, drawX, drawY;
    
    if (imgAspect > canvasAspect) {
      drawWidth = canvas.width * 0.95;
      drawHeight = drawWidth / imgAspect;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height * 0.95;
      drawWidth = drawHeight * imgAspect;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, [images]);

  // Update canvas on scroll
  useEffect(() => {
    if (!isLoaded) return;

    const unsubscribe = frameProgress.on('change', (latest) => {
      const frameIndex = Math.min(Math.floor(latest), TOTAL_FRAMES - 1);
      drawFrame(frameIndex);
    });

    // Draw initial frame
    drawFrame(0);

    return () => unsubscribe();
  }, [isLoaded, frameProgress, drawFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded && images.length > 0) {
        const currentFrame = Math.floor(frameProgress.get());
        drawFrame(currentFrame);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, images, frameProgress, drawFrame]);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="relative w-full"
      style={{ 
        backgroundColor: '#050505',
        height: '220vh'
      }}
    >
      {/* Sticky container for animations */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        
        {/* Fixed Header - Always at top */}
        <div className="flex-shrink-0 pt-8 pb-4 px-4 text-center z-30 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Technologies</span>
            </h2>
            <p className="mt-3 text-white/40 text-sm md:text-base max-w-xl mx-auto">
              The tools and technologies I use to bring ideas to life
            </p>
          </motion.div>
        </div>

        {/* Animation Container - Below Header */}
        <div 
          ref={animationContainerRef}
          className="flex-1 relative overflow-hidden"
        >
          {/* Ambient background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
          </div>

          {/* Canvas for laptop animation */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center px-2"
            style={{ 
              opacity: canvasOpacity, 
              scale: canvasScale,
              y: canvasY
            }}
          >
            <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
              <canvas 
                ref={canvasRef}
                className="w-full h-auto max-h-[85vh] object-contain"
              />
              
              {/* Loading indicator */}
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                    <span className="text-white/40 text-xs tracking-wider">Loading...</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Skills Grid with 3D tilt effect */}
          <motion.div 
            className="absolute inset-0 flex items-start justify-center pt-4 px-4 md:px-8 overflow-y-auto scrollbar-hide"
            style={{
              opacity: skillsOpacity,
              y: skillsY,
              perspective: 1000,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <motion.div
              className="w-full max-w-5xl pb-20"
              style={{
                rotateX: skillsRotateX,
                scale: skillsScale,
                transformStyle: 'preserve-3d',
                transformOrigin: 'center top',
              }}
            >
              {/* Skills grid - compact layout */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 md:gap-4">
                {skills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
          style={{ opacity: useTransform(smoothProgress, [0, 0.15], [1, 0]) }}
        >
          <span className="text-white/30 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <motion.div 
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          >
            <motion.div 
              className="w-1 h-1 bg-cyan-400/80 rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Progress indicator */}
        <motion.div 
          className="absolute right-4 top-1/2 -translate-y-1/2 w-0.5 h-20 bg-white/10 rounded-full overflow-hidden z-20"
          style={{ opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]) }}
        >
          <motion.div 
            className="w-full bg-gradient-to-b from-cyan-400 to-purple-400 rounded-full"
            style={{ height: useTransform(smoothProgress, [0, 1], ['0%', '100%']) }}
          />
        </motion.div>
      </div>
    </section>
  );
}
