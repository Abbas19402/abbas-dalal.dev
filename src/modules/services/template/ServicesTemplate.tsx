"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useUIStore } from '@shared/store/useUIStore';
import portfolioData from '@shared/constants/portfolioData.json';
import {
    FaCode,
    FaPalette,
    FaCube,
    FaRocket
} from 'react-icons/fa';

const iconMap: Record<string, any> = {
    code: FaCode,
    palette: FaPalette,
    cube: FaCube,
    rocket: FaRocket,
};

export default function ServicesTemplate() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const setCursorVariant = useUIStore((state) => state.setCursorVariant);

    const { title, subtitle, offerings } = portfolioData.services;

    return (
        <section className="relative min-h-screen py-32 px-6 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-4">{title}</h1>
                    <p className="text-gray-400 text-lg tracking-wide">{subtitle}</p>
                </motion.div>

                {/* Services Grid/Accordion */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {offerings.map((service, index) => {
                        const Icon = iconMap[service.icon];
                        const isHovered = hoveredIndex === index;
                        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

                        return (
                            <motion.div
                                key={service.id}
                                className="relative group cursor-pointer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isOtherHovered ? 0.3 : 1,
                                    scale: isHovered ? 1.02 : 1,
                                }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    opacity: { duration: 0.3 },
                                    scale: { duration: 0.3 }
                                }}
                                onMouseEnter={() => {
                                    setHoveredIndex(index);
                                    setCursorVariant('button');
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(null);
                                    setCursorVariant('default');
                                }}
                            >
                                <div className="relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden p-8 min-h-[300px] flex flex-col">
                                    {/* Background gradient on hover */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1), transparent 70%)',
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <motion.div
                                            className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-sky-500/10 border border-sky-500/20"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            <Icon className="text-sky-500 text-2xl" />
                                        </motion.div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-gray-400 leading-relaxed mb-6">
                                            {service.description}
                                        </p>

                                        {/* Details - Expand on hover */}
                                        <AnimatePresence>
                                            {isHovered && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="space-y-4 mt-6 pt-6 border-t border-zinc-800"
                                                >
                                                    {/* Details list */}
                                                    <div className="space-y-2">
                                                        {service.details.map((detail: string, idx: number) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.05 }}
                                                                className="flex items-center gap-2 text-sm text-gray-300"
                                                            >
                                                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                                                {detail}
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {/* Technologies */}
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {service.technologies.slice(0, 4).map((tech: string, idx: number) => (
                                                            <motion.span
                                                                key={tech}
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 0.1 + idx * 0.05 }}
                                                                className="px-3 py-1 text-xs rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20"
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Hover indicator */}
                                    <motion.div
                                        className="absolute bottom-4 right-4 text-gray-600 group-hover:text-sky-500 transition-colors"
                                        animate={{
                                            rotate: isHovered ? 45 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
