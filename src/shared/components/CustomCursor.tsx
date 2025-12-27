"use client";

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { useUIStore } from '@shared/store/useUIStore';

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const cursorVariant = useUIStore((state) => state.cursorVariant);

    // Smooth cursor position with spring physics
    const cursorX = useSpring(0, {
        damping: 30,
        stiffness: 200,
        mass: 0.5
    });
    const cursorY = useSpring(0, {
        damping: 30,
        stiffness: 200,
        mass: 0.5
    });

    useEffect(() => {
        setMounted(true);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
        };
    }, [cursorX, cursorY]);

    // Don't render on mobile or until mounted
    useEffect(() => {
        const mediaQuery = window.matchMedia('(pointer: fine)');
        if (!mediaQuery.matches) {
            setMounted(false);
        }
    }, []);

    if (!mounted) return null;

    // Cursor size variants
    const cursorSizes = {
        default: { width: 20, height: 20 },
        text: { width: 80, height: 80 },
        button: { width: 60, height: 60 },
        sticky: { width: 40, height: 40 },
    };

    const currentSize = cursorSizes[cursorVariant];

    return (
        <>
            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9999 mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        width: currentSize.width,
                        height: currentSize.height,
                    }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                    }}
                >
                    <div className="w-full h-full rounded-full bg-white" />
                </motion.div>
            </motion.div>

            {/* Outer cursor ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-9998"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30"
                    animate={{
                        width: currentSize.width + 20,
                        height: currentSize.height + 20,
                    }}
                    transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 150,
                    }}
                />
            </motion.div>
        </>
    );
}
