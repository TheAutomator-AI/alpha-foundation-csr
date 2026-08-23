"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export type CursorState =
  | "DEFAULT"
  | "EXPLORE"
  | "DISCOVER"
  | "ROTATE"
  | "FUND"
  | "CONNECT"
  | "VERIFY";

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorState: "DEFAULT",
  setCursorState: () => {},
  cursorText: "",
  setCursorText: () => {},
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>("DEFAULT");
  const [cursorText, setCursorText] = useState<string>("");
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Precision springs for responsive yet luxurious trailing
  const springConfig = { damping: 30, stiffness: 320, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 45, stiffness: 700, mass: 0.08 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Only enable if device supports hover and fine pointer
    const mediaQuery = window.matchMedia("(pointer: fine) and (hover: hover)");
    const updateDeviceType = () => {
      setIsTouchDevice(!mediaQuery.matches);
    };

    updateDeviceType();
    mediaQuery.addEventListener("change", updateDeviceType);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener("change", updateDeviceType);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  // Read data-cursor attribute automatically from hovered elements
  useEffect(() => {
    if (isTouchDevice) return;

    const handleElementHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        "[data-cursor]"
      ) as HTMLElement | null;

      if (target) {
        const state = target.getAttribute("data-cursor") as CursorState;
        if (state) {
          setCursorState(state);
          const customText = target.getAttribute("data-cursor-text") || "";
          setCursorText(customText);
          return;
        }
      }
      setCursorState("DEFAULT");
      setCursorText("");
    };

    window.addEventListener("mouseover", handleElementHover);
    return () => {
      window.removeEventListener("mouseover", handleElementHover);
    };
  }, [isTouchDevice]);

  // Dynamic styling variants for each cursor state
  const getCursorVariant = () => {
    switch (cursorState) {
      case "VERIFY":
        return {
          scale: 2.3,
          borderColor: "rgba(212, 175, 55, 0.9)",
          backgroundColor: "rgba(212, 175, 55, 0.12)",
          borderWidth: "1.5px",
        };
      case "EXPLORE":
        return {
          scale: 1.9,
          borderColor: "rgba(34, 211, 238, 0.8)",
          backgroundColor: "rgba(34, 211, 238, 0.12)",
          borderWidth: "1.5px",
        };
      case "DISCOVER":
        return {
          scale: 2.3,
          borderColor: "rgba(255, 255, 255, 0.85)",
          backgroundColor: "rgba(255, 255, 255, 0.09)",
          borderWidth: "1px",
        };
      case "ROTATE":
        return {
          scale: 2.2,
          borderColor: "rgba(34, 211, 238, 0.7)",
          backgroundColor: "rgba(6, 182, 212, 0.1)",
          borderWidth: "1.5px",
        };
      case "FUND":
        return {
          scale: 2.5,
          borderColor: "rgba(34, 211, 238, 0.95)",
          backgroundColor: "rgba(34, 211, 238, 0.22)",
          borderWidth: "1.5px",
        };
      case "CONNECT":
        return {
          scale: 2.1,
          borderColor: "rgba(255, 255, 255, 0.9)",
          backgroundColor: "rgba(255, 255, 255, 0.16)",
          borderWidth: "1.5px",
        };
      default:
        return {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.02)",
          borderWidth: "1px",
        };
    }
  };

  const displayText =
    cursorText || (cursorState !== "DEFAULT" ? cursorState : "");

  return (
    <CursorContext.Provider
      value={{ cursorState, setCursorState, cursorText, setCursorText }}
    >
      {children}

      {!isTouchDevice && isVisible && (
        <>
          {/* Central ultra-precise dot */}
          <motion.div
            className={`pointer-events-none fixed z-[9999] top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
              cursorState === "VERIFY"
                ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]"
            }`}
            style={{
              x: dotX,
              y: dotY,
            }}
          />

          {/* Smooth magnetic follower ring with label */}
          <motion.div
            className="pointer-events-none fixed z-[9998] top-0 left-0 flex items-center justify-center rounded-full backdrop-blur-[1px]"
            style={{
              x: smoothX,
              y: smoothY,
              width: 36,
              height: 36,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={getCursorVariant()}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
          >
            {displayText && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                className={`select-none font-mono text-[7px] font-bold uppercase tracking-widest ${
                  cursorState === "VERIFY" ? "text-amber-200" : "text-cyan-200"
                }`}
              >
                {displayText}
              </motion.span>
            )}
          </motion.div>
        </>
      )}
    </CursorContext.Provider>
  );
}
