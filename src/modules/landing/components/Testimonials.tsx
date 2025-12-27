"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import portfolioData from '@shared/constants/portfolioData.json';

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const { title, subtitle, items } = portfolioData.testimonials;

    return (
        <section className="relative py-32 px-6 md:px-10 lg:px-20">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-400 text-lg tracking-wide">{subtitle}</p>
                </motion.div>

                {/* Testimonial display */}
                <div className="relative min-h-[400px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                        >
                            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-12">
                                {/* Quote icon */}
                                <div className="text-6xl text-sky-500/20 mb-6">"</div>

                                {/* Quote */}
                                <p className="text-2xl md:text-3xl font-light text-gray-200 mb-8 leading-relaxed">
                                    {items[activeIndex].quote}
                                </p>

                                {/* Author info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-linear-to-r from-sky-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                                        {items[activeIndex].author[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">{items[activeIndex].author}</p>
                                        <p className="text-gray-400">{items[activeIndex].role}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {items.map((_, index) => (
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
                        onClick={() => setActiveIndex((prev) => (prev - 1 + items.length) % items.length)}
                        className="w-12 h-12 rounded-full border-2 border-zinc-700 hover:border-sky-500 flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        ←
                    </motion.button>
                    <motion.button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % items.length)}
                        className="w-12 h-12 rounded-full border-2 border-zinc-700 hover:border-sky-500 flex items-center justify-center transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        →
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
