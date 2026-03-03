"use client";

import { motion, Variants } from 'motion/react';
import { cn } from '@shared/utils';

interface LogoProps {
    className?: string;
    animated?: boolean;
}

export default function Logo({ className, animated = false }: LogoProps) {
    const draw: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: 0.2, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: 0.2, duration: 0.01 }
            }
        },
        static: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0 }
        }
    };

    return (
        <div className={cn("relative w-fit h-full", className)}>
            <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full stroke-white stroke-[2px] fill-transparent"
                style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
            >
                {/* Letter A */}
                <motion.path
                    d="M 20 80 L 40 20 L 60 80"
                    variants={draw}
                    initial={animated ? "hidden" : "static"}
                    animate={animated ? "visible" : "static"}
                />
                <motion.path
                    d="M 30 50 L 50 50"
                    variants={draw}
                    initial={animated ? "hidden" : "static"}
                    animate={animated ? "visible" : "static"}
                />

                {/* Letter D */}
                <motion.path
                    d="M 60 20 L 60 80 L 70 80 C 90 80 90 20 70 20 Z"
                    variants={draw}
                    initial={animated ? "hidden" : "static"}
                    animate={animated ? "visible" : "static"}
                />
            </motion.svg>
        </div>
    );
}
