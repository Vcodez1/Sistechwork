"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Text Animation Opacities
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const opacityFeature1 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const opacityFeature2 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
    const opacityCTA = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            for (let i = 1; i <= 48; i++) {
                const img = new Image();
                const src = `/frames/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
                img.src = src;
                await new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve; // Continue even if error
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setLoaded(true);
        };

        loadImages();
    }, []);

    // Update canvas on scroll
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const frameIndex = Math.min(
            Math.floor(latest * (images.length - 1)),
            images.length - 1
        );
        const img = images[frameIndex];

        if (img) {
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw image (contain fit)
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.min(hRatio, vRatio); // Use min to contain
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                centerShift_x,
                centerShift_y,
                img.width * ratio,
                img.height * ratio
            );
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set canvas to full window size for high resolution
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Loading Spinner */}
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-50">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}

                {/* Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-contain"
                />

                {/* Text Overlays */}

                {/* 0% Scroll: Hero */}
                <motion.div
                    style={{ opacity: opacityHero }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 text-center">
                        vhomofi
                    </h1>
                </motion.div>

                {/* 30% Scroll: Feature 1 (Left) */}
                <motion.div
                    style={{ opacity: opacityFeature1 }}
                    className="absolute inset-0 flex items-center justify-start pl-10 md:pl-32 pointer-events-none"
                >
                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold text-white/90 mb-4">Precision Engineering</h2>
                        <p className="text-xl text-white/60">
                            Every component is meticulously crafted for maximum performance.
                        </p>
                    </div>
                </motion.div>

                {/* 60% Scroll: Feature 2 (Right) */}
                <motion.div
                    style={{ opacity: opacityFeature2 }}
                    className="absolute inset-0 flex items-center justify-end pr-10 md:pr-32 pointer-events-none"
                >
                    <div className="max-w-md text-right">
                        <h2 className="text-4xl font-bold text-white/90 mb-4">Core Intelligence</h2>
                        <p className="text-xl text-white/60">
                            Powered by advanced algorithms that adapt to your workflow.
                        </p>
                    </div>
                </motion.div>

                {/* 90% Scroll: CTA (Center) */}
                <motion.div
                    style={{ opacity: opacityCTA }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white/90 mb-8 text-center">
                        Experience the Future
                    </h2>
                    <button className="px-8 py-4 bg-white text-black rounded-full font-semibold text-lg hover:bg-white/90 pointer-events-auto transition-colors">
                        Pre-order Now
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
