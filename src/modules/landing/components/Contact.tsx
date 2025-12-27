"use client";

import { motion } from 'motion/react';
import { useUIStore } from '@shared/store/useUIStore';
import portfolioData from '@shared/constants/portfolioData.json';

export default function Contact() {
    const setCursorVariant = useUIStore((state) => state.setCursorVariant);
    const { title, subtitle, email, availability } = portfolioData.contact;
    const social = portfolioData.meta.social;

    return (
        <section className="relative py-32 px-6 md:px-10 lg:px-20 bg-zinc-950">
            <div className="max-w-5xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-6 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10"
                        animate={{
                            boxShadow: [
                                '0 0 0 0 rgba(34, 197, 94, 0.4)',
                                '0 0 0 20px rgba(34, 197, 94, 0)',
                            ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <span className="text-green-400 text-sm tracking-wide">● {availability}</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-7xl font-bold mb-6">{title}</h2>
                    <p className="text-gray-400 text-xl tracking-wide max-w-2xl mx-auto">{subtitle}</p>
                </motion.div>

                {/* Email CTA */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.a
                        href={`mailto:${email}`}
                        className="inline-block group relative"
                        onMouseEnter={() => setCursorVariant('button')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <motion.div
                            className="absolute inset-0 bg-linear-to-r from-sky-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="relative px-12 py-6 bg-zinc-950 border-2 border-sky-500 rounded-2xl group-hover:bg-sky-500/10 transition-colors">
                            <span className="text-3xl md:text-4xl font-bold bg-linear-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                                {email}
                            </span>
                        </div>
                    </motion.a>
                </motion.div>

                {/* Social links */}
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {Object.entries(social).map(([platform, url], index) => (
                        <motion.a
                            key={platform}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 hover:border-sky-500/50 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            whileHover={{ y: -4 }}
                            onMouseEnter={() => setCursorVariant('button')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <motion.div
                                className="absolute inset-0 bg-sky-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                            />

                            <div className="relative text-center">
                                <p className="text-xl font-bold capitalize mb-2 group-hover:text-sky-400 transition-colors">
                                    {platform}
                                </p>
                                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                    Connect →
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>

                {/* Footer note */}
                <motion.p
                    className="text-center text-gray-500 text-sm mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    Let's build something amazing together
                </motion.p>
            </div>
        </section>
    );
}
