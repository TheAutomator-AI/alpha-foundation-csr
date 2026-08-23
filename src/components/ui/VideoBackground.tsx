"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  priority?: boolean;
  opacity?: number;
  scaleEffect?: boolean;
  className?: string;
  vignetteStyle?: "default" | "intense" | "minimal" | "hero";
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function VideoBackground({
  src,
  poster,
  priority = false,
  opacity = 0.85,
  scaleEffect = true,
  className,
  vignetteStyle = "default",
  containerRef,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const localRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // IntersectionObserver for intelligent resource activation
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const target = containerRef?.current || localRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: "300px 0px 300px 0px",
        threshold: 0.05,
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [priority, containerRef]);

  // Manage playback based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented (e.g. browser policy), silent catch
        });
      }
    } else {
      video.pause();
    }
  }, [isInView]);

  // Scroll-based parallax scale
  const targetElement = containerRef || localRef;
  const { scrollYProgress } = useScroll({
    target: targetElement,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion || !scaleEffect ? [1, 1, 1] : [1.05, 1.0, 1.05]
  );

  return (
    <div
      ref={localRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0", className)}
      aria-hidden="true"
    >
      {/* 1. Hardware Accelerated Video Layer (Crisp & High Visibility) */}
      {isInView && (
        <motion.div
          style={{ scale }}
          className="h-full w-full will-change-transform"
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload={priority ? "auto" : "metadata"}
            onLoadedData={() => setIsLoaded(true)}
            onCanPlay={() => setIsLoaded(true)}
            className={cn(
              "h-full w-full object-cover object-center transition-opacity duration-700",
              isLoaded ? "opacity-100" : "opacity-0"
            )}
            style={{ opacity: isLoaded ? opacity : 0 }}
          />
        </motion.div>
      )}

      {/* 2. Fallback Background */}
      <div
        className={cn(
          "absolute inset-0 bg-graphite-950 transition-opacity duration-700",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
      />

      {/* 3. Subtle Non-Destructive Vignette Layer Variants (No Blanket Black Wash) */}
      {vignetteStyle === "hero" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,10,0.1)_0%,rgba(5,7,10,0.45)_70%,rgba(5,7,10,0.85)_100%)]" />
      )}
      {vignetteStyle === "default" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,10,0)_0%,rgba(5,7,10,0.25)_65%,rgba(5,7,10,0.7)_100%)]" />
      )}
      {vignetteStyle === "intense" && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,7,10,0)_0%,rgba(5,7,10,0.35)_60%,rgba(5,7,10,0.8)_100%)]" />
      )}
      {vignetteStyle === "minimal" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,10,0)_0%,rgba(5,7,10,0.2)_80%,rgba(5,7,10,0.55)_100%)]" />
      )}

      {/* 4. Gentle Top & Bottom Fades for Seamless Section Flow */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite-950/75 via-transparent to-graphite-950/75" />
    </div>
  );
}
