'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    itemsPerSlide?: number;
    gap?: number;
}

export default function Carousel<T>({
    items,
    renderItem,
    className = '',
    itemsPerSlide = 1,
    gap = 24
}: CarouselProps<T>) {
    const [activeIndex, setActiveIndex] = useState(0);

    const totalPages = Math.ceil(items.length / itemsPerSlide);
    const currentItems = items.slice(
        activeIndex * itemsPerSlide,
        (activeIndex + 1) * itemsPerSlide
    );

    const next = () => {
        setActiveIndex((prev) => (prev + 1) % totalPages);
    };

    const prev = () => {
        setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <div className={`w-full ${className}`}>
            <div className="relative min-h-[400px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={{
                            hidden: { opacity: 0, x: 20 },
                            visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.5,
                                    staggerChildren: 0.1
                                }
                            },
                            exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
                        }}
                        className="w-full"
                    >
                        <div
                            className="grid w-full"
                            style={{
                                gridTemplateColumns: `repeat(${itemsPerSlide}, minmax(0, 1fr))`,
                                gap: `${gap}px`
                            }}
                        >
                            {currentItems.map((item, index) => (
                                <motion.div
                                    key={`${activeIndex}-${index}`}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                        exit: { opacity: 0, y: -20 }
                                    }}
                                    className="h-full"
                                >
                                    {renderItem(item, activeIndex * itemsPerSlide + index)}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-3 mt-12">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${activeIndex === index
                            ? 'bg-sky-500 w-8'
                            : 'bg-zinc-700 hover:bg-zinc-600'
                            }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-4 mt-8">
                <motion.button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border-2 border-zinc-700 hover:border-sky-500 flex items-center justify-center transition-colors text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous slide"
                >
                    ←
                </motion.button>
                <motion.button
                    onClick={next}
                    className="w-12 h-12 rounded-full border-2 border-zinc-700 hover:border-sky-500 flex items-center justify-center transition-colors text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next slide"
                >
                    →
                </motion.button>
            </div>
        </div>
    );
}
