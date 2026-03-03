"use client";

import { motion } from 'motion/react';
import { useUIStore } from '@shared/store/useUIStore';
import portfolioData from '@shared/constants/portfolioData.json';

export default function About() {
    const setCursorVariant = useUIStore((state) => state.setCursorVariant);

    const { title, subtitle, principles, stats } = portfolioData.approach;

    return (
        <section className="relative py-32 px-6 md:px-10 lg:px-20 bg-zinc-950" id="about">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6">{title}</h2>
                    <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </motion.div>

                {/* Principles grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {principles.map((principle, index) => (
                        <motion.div
                            key={principle.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onMouseEnter={() => setCursorVariant('text')}
                            onMouseLeave={() => setCursorVariant('default')}
                            className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 hover:border-opacity-50 transition-all"
                            style={{
                                borderColor: `${principle.color}20`,
                            }}
                        >
                            {/* Glow effect on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${principle.color}10, transparent 70%)`,
                                }}
                            />

                            <div className="relative">
                                {/* Icon */}
                                <div
                                    className="text-6xl mb-4"
                                    style={{ filter: `drop-shadow(0 0 20px ${principle.color})` }}
                                >
                                    {principle.icon}
                                </div>

                                {/* Title */}
                                <h3
                                    className="text-2xl md:text-3xl font-bold mb-3"
                                    style={{ color: principle.color }}
                                >
                                    {principle.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-300 leading-relaxed">
                                    {principle.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats bar */}
                <motion.div
                    className="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 md:p-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                <p className="text-4xl md:text-5xl font-bold bg-linear-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </p>
                                <p className="text-gray-400 text-sm tracking-wide">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Decorative element */}
                <motion.div
                    className="absolute top-1/4 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>
        </section>
    );
}
