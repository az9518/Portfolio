"use client";

import { useEffect, useRef, useCallback } from 'react';

interface CodeSnippet {
    x: number;
    y: number;
    speed: number;
    text: string;
    opacity: number;
    size: number;
    color: 'cyan' | 'magenta';
    blur: number;
}

export default function CodeRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return null;

        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        // Set canvas size with device pixel ratio for sharpness
        const dpr = Math.min(window.devicePixelRatio, 2);
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.scale(dpr, dpr);

        return { ctx, width: rect.width, height: rect.height };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let animationId: number;
        let init = initCanvas();
        if (!init) return;

        let { ctx, width, height } = init;

        // Refined code snippets - more programming focused
        const codeTexts = [
            // Keywords
            'const', 'let', 'function', 'return', 'import', 'export', 'async', 'await',
            'class', 'interface', 'type', 'enum', 'void', 'null', 'true', 'false',
            // Symbols
            '=>', '{ }', '[ ]', '( )', '===', '!==', '&&', '||', '...', '::',
            // Binary (more subtle)
            '01', '10', '11', '00',
            // Tech terms
            'tsx', 'jsx', 'api', 'npm', 'git',
            // React hooks
            'useState', 'useEffect', 'useMemo', 'useRef',
            // Framework
            'React', 'Next', 'Node',
        ];

        // Initialize code snippets with depth layers
        const snippets: CodeSnippet[] = [];
        const snippetCount = 45;

        for (let i = 0; i < snippetCount; i++) {
            const isBackLayer = Math.random() > 0.6;
            snippets.push({
                x: Math.random() * width,
                y: Math.random() * height,
                speed: isBackLayer ? Math.random() * 0.3 + 0.1 : Math.random() * 0.5 + 0.2,
                text: codeTexts[Math.floor(Math.random() * codeTexts.length)],
                opacity: isBackLayer ? Math.random() * 0.08 + 0.02 : Math.random() * 0.12 + 0.04,
                size: isBackLayer ? 10 : 12 + Math.random() * 4,
                color: Math.random() > 0.7 ? 'magenta' : 'cyan',
                blur: isBackLayer ? 1 : 0,
            });
        }

        // Handle resize
        const handleResize = () => {
            init = initCanvas();
            if (init) {
                ctx = init.ctx;
                width = init.width;
                height = init.height;
                // Reset positions on resize
                snippets.forEach((snippet) => {
                    if (snippet.x > width) snippet.x = Math.random() * width;
                });
            }
        };
        window.addEventListener('resize', handleResize);

        // Animation loop
        const animate = () => {
            // Clear with fade for trail effect
            ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
            ctx.fillRect(0, 0, width, height);

            snippets.forEach((snippet) => {
                // Set font
                ctx.font = `${snippet.size}px "JetBrains Mono", "Fira Code", monospace`;

                // Apply blur for back layer
                if (snippet.blur > 0) {
                    ctx.filter = `blur(${snippet.blur}px)`;
                } else {
                    ctx.filter = 'none';
                }

                // Color based on type
                const baseColor = snippet.color === 'cyan' ? '0, 243, 255' : '176, 38, 255';
                ctx.fillStyle = `rgba(${baseColor}, ${snippet.opacity})`;

                // Draw code snippet
                ctx.fillText(snippet.text, snippet.x, snippet.y);

                // Update position - falling down
                snippet.y += snippet.speed;

                // Reset to top when reaching bottom
                if (snippet.y > height + 30) {
                    snippet.y = -20;
                    snippet.x = Math.random() * width;
                    snippet.text = codeTexts[Math.floor(Math.random() * codeTexts.length)];
                    // Slight opacity variation
                    snippet.opacity = snippet.blur > 0
                        ? Math.random() * 0.08 + 0.02
                        : Math.random() * 0.12 + 0.04;
                }
            });

            // Reset filter
            ctx.filter = 'none';

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
        };
    }, [initCanvas]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
            aria-hidden="true"
        />
    );
}
