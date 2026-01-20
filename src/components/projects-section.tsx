"use client";

import Image from 'next/image';
import { useRef } from 'react';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, ExternalLink } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Project card component with hover effects
function ProjectCard({
  project,
  index
}: {
  project: typeof projects[0];
  index: number;
}) {
  const projectImage = PlaceHolderImages.find(p => p.id === project.image);
  const cardRef = useRef<HTMLDivElement>(null);

  // Varying card heights for masonry effect
  const heights = ['min-h-[420px]', 'min-h-[480px]', 'min-h-[400px]', 'min-h-[460px]'];
  const cardHeight = heights[index % heights.length];

  return (
    <motion.div
      ref={cardRef}
      className={`${cardHeight} w-full`}
      whileHover={{
        scale: 1.03,
        y: -8,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }}
    >
      <a
        href={project.liveDemoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer group"
      >
        {/* Image section */}
        <div className="relative h-[55%] overflow-hidden">
          {projectImage && (
            <Image
              src={projectImage.imageUrl}
              alt={`Screenshot of ${project.title}`}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={projectImage.imageHint}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Action buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <span
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.liveDemoUrl, '_blank');
              }}
            >
              <ExternalLink className="w-5 h-5 text-gray-800" />
            </span>
            <span
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.repoUrl, '_blank');
              }}
            >
              <Github className="w-5 h-5 text-gray-800" />
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 h-[45%] flex flex-col justify-between bg-white">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Bottom pill */}
          <div className="mt-4">
            <span className="inline-flex items-center px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold group-hover:bg-amber-200 transition-colors duration-200">
              View Project →
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress for 3D to 2D animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start start']
  });

  // Smooth spring for perspective animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values for 3D perspective effect
  const rotateX = useTransform(smoothProgress, [0, 1], [20, 0]);
  const rotateY = useTransform(smoothProgress, [0, 1], [8, 0]); // Added horizontal tilt
  const perspective = useTransform(smoothProgress, [0, 1], [1000, 1000]);
  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.3], [0.8, 1]);

  // Horizontal parallax offsets for odd/even columns - start tilted right, settle into place
  const leftColumnX = useTransform(scrollYProgress, [0, 1], [80, 0]);  // Starts offset right
  const rightColumnX = useTransform(scrollYProgress, [0, 1], [120, 0]); // Starts more offset right

  const smoothLeftX = useSpring(leftColumnX, { stiffness: 100, damping: 30 });
  const smoothRightX = useSpring(rightColumnX, { stiffness: 100, damping: 30 });

  // Split projects into columns for masonry
  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="w-full min-h-screen py-20 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: '#FFD700' }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 md:px-6 relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-black/10 rounded-full text-sm font-medium text-gray-800 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Featured Work
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">
            My Projects
          </h2>
          <p className="text-xl text-gray-700/80 max-w-2xl mx-auto">
            A collection of work that showcases my passion for building beautiful, functional experiences.
          </p>
        </motion.div>

        {/* 3D Perspective Grid Container */}
        <motion.div
          style={{
            perspective: perspective,
            transformStyle: 'preserve-3d',
          }}
          className="relative"
        >
          <motion.div
            style={{
              rotateX: rotateX,
              rotateY: rotateY,
              scale: scale,
              opacity: opacity,
              transformOrigin: 'center top',
            }}
          >
            {/* Masonry Grid with Parallax Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Left/Odd Column */}
              <motion.div
                className="flex flex-col gap-6 md:gap-8"
                style={{ x: smoothLeftX }}
              >
                {leftColumn.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i * 2}
                  />
                ))}
              </motion.div>

              {/* Right/Even Column - offset for masonry effect */}
              <motion.div
                className="flex flex-col gap-6 md:gap-8 md:mt-16"
                style={{ x: smoothRightX }}
              >
                {rightColumn.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={i * 2 + 1}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://github.com/az9518"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 shadow-xl hover:shadow-2xl hover:scale-105 transform"
          >
            <Github className="w-5 h-5" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}