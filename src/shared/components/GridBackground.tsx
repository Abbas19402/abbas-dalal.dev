"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function GridBackground() {
    const [mounted, setMounted] = useState(false);
    const { scrollYProgress } = useScroll();

    // Grid fades in/out based on scroll position
    const opacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.9, 1],
        [0.05, 0.02, 0.02, 0.05]
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity }}
        >
            <div
                className="w-full h-full"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.05) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            />
        </motion.div>
    );
}
