"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUIStore } from '@shared/store/useUIStore';
import Logo from './Logo';

export default function Preloader() {
    const { isLoading, setIsLoading } = useUIStore();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2800);

        return () => clearTimeout(timer);
    }, [setIsLoading]);



    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-zinc-950"
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="relative w-32 h-32 md:w-48 md:h-48">
                        <Logo animated={true} />
                        <motion.div
                            className="absolute inset-0 bg-white mix-blend-overlay"
                            initial={{ scaleY: 0, originY: 1 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 1.7, duration: 0.5, ease: "circOut" }}
                            style={{ clipPath: "url(#logo-clip)" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
