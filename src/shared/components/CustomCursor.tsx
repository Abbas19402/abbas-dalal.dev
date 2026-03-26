"use client";

import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';
import { useUIStore } from '@shared/store/useUIStore';

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const cursorVariant = useUIStore((state) => state.cursorVariant);
    const setCursorVariant = useUIStore((state) => state.setCursorVariant);
    const isLoading = useUIStore((state) => state.isLoading);
    const currentTheme = useUIStore((state) => state.currentTheme);

    // Theme-based colors for the cursor
    const themeColor = useMemo(() => {
        const colors = {
            'default': '#ffffff',
            'project-1': '#38bdf8', // sky-400
            'project-2': '#a855f7', // purple-500
            'project-3': '#ec4899', // pink-500
            'project-4': '#10b981', // emerald-500
        };
        return colors[currentTheme] || colors.default;
    }, [currentTheme]);

    // Ultra-responsive cursor position (Inner Dot)
    const cursorX = useSpring(0, {
        damping: 30,
        stiffness: 800,
        mass: 0.1
    });
    const cursorY = useSpring(0, {
        damping: 30,
        stiffness: 800,
        mass: 0.1
    });

    // Liquid Trailing Position (Outer Ring)
    const ringX = useSpring(0, {
        damping: 40,
        stiffness: 300,
        mass: 0.2
    });
    const ringY = useSpring(0, {
        damping: 40,
        stiffness: 300,
        mass: 0.2
    });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        ringX.set(e.clientX);
        ringY.set(e.clientY);
    }, [cursorX, cursorY, ringX, ringY]);

    const handleMouseOver = useCallback((e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target) return;

        const computedStyle = window.getComputedStyle(target);
        
        if (
            computedStyle.cursor === 'pointer' || 
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' ||
            target.closest('a') || 
            target.closest('button') ||
            target.getAttribute('role') === 'button'
        ) {
            setCursorVariant('button');
        } else if (
            computedStyle.cursor === 'text' ||
            target.tagName === 'INPUT' ||
            target.tagName === 'TEXTAREA' ||
            target.getAttribute('contenteditable') === 'true'
        ) {
            setCursorVariant('text');
        } else {
            setCursorVariant('default');
        }
    }, [setCursorVariant]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(pointer: fine)');
        if (!mediaQuery.matches) {
            setMounted(false);
            return;
        }

        setMounted(true);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [handleMouseMove, handleMouseOver]);

    if (!mounted) return null;

    const cursorSizes = {
        default: { width: 8, height: 8, opacity: 1, ringScale: 1 },
        text: { width: 2, height: 28, opacity: 1, ringScale: 0 },
        button: { width: 4, height: 4, opacity: 0.3, ringScale: 2.5 },
        sticky: { width: 6, height: 6, opacity: 0.3, ringScale: 3 },
    };

    const currentSize = cursorSizes[cursorVariant] || cursorSizes.default;

    return (
        <div className="fixed inset-0 pointer-events-none z-[99999]">
            {/* Outer Liquid Ring */}
            <motion.div
                className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
                style={{
                    x: ringX,
                    y: ringY,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 backdrop-blur-[1px]"
                    animate={{
                        width: cursorVariant === 'text' ? 0 : 36 * (currentSize.ringScale),
                        height: cursorVariant === 'text' ? 0 : 36 * (currentSize.ringScale),
                        borderColor: cursorVariant === 'button' ? themeColor : 'rgba(255, 255, 255, 0.3)',
                        borderWidth: cursorVariant === 'button' ? 1.5 : 1,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 250,
                    }}
                >
                    {/* Inner glowing pulse for button hover */}
                    <AnimatePresence>
                        {cursorVariant === 'button' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.2 }}
                                className="absolute inset-0 rounded-full"
                                style={{ backgroundColor: `${themeColor}15` }}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>

            {/* Main Precision Dot */}
            <motion.div
                className="absolute top-0 left-0 flex items-center justify-center pointer-events-none mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    animate={{
                        width: currentSize.width,
                        height: currentSize.height,
                        opacity: currentSize.opacity,
                        backgroundColor: (cursorVariant === 'button' || cursorVariant === 'sticky') ? themeColor : '#ffffff'
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 400,
                        mass: 0.5
                    }}
                />
            </motion.div>

            {/* Loading Ring */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute top-0 left-0 flex items-center justify-center pointer-events-none"
                        style={{
                            x: cursorX,
                            y: cursorY,
                        }}
                    >
                        <motion.div
                            className="relative -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-[1.5px] border-transparent border-t-white"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
