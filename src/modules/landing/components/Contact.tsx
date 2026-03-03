"use client";

import { motion } from 'motion/react';
import { Mail, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useUIStore } from '@shared/store/useUIStore';
import portfolioData from '@shared/constants/portfolioData.json';

export default function Contact() {
    const setCursorVariant = useUIStore((state) => state.setCursorVariant);
    const { title, subtitle, email, availability } = portfolioData.contact;
    const social = portfolioData.meta.social;

    return (
        <section className="relative py-20 md:py-32 px-6 md:px-10 lg:px-20 bg-background overflow-hidden" id="contact">

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        {availability}
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6 text-foreground tracking-tight">
                        {title}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Premium Email Button */}
                    <motion.div
                        className="relative inline-block group"
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-linear-to-r from-primary via-purple-500 to-secondary rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />

                        <a
                            href={`mailto:${email}`}
                            className="relative flex items-center gap-4 bg-card hover:bg-card/90 border border-border px-8 py-5 rounded-xl transition-all duration-300 transform group-hover:-translate-y-1"
                            onMouseEnter={() => setCursorVariant('button')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <Mail size={24} />
                            </div>
                            <div className="text-left">
                                <div className="text-sm text-muted-foreground font-medium">Send me an email</div>
                                <div className="text-xl md:text-2xl font-bold text-foreground font-heading">
                                    {email}
                                </div>
                            </div>
                            <div className="ml-4 text-muted-foreground group-hover:text-primary transition-colors">
                                <ArrowRight size={20} />
                            </div>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Additional Links Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {/* Calendly Card */}
                    <a
                        href={portfolioData.contact.calendly}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-6 bg-card/50 hover:bg-card border border-border/50 hover:border-border rounded-2xl transition-all"
                        onMouseEnter={() => setCursorVariant('button')}
                        onMouseLeave={() => setCursorVariant('default')}
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-secondary/10 rounded-xl text-secondary group-hover:scale-110 transition-transform">
                                <Calendar size={20} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-foreground">Schedule a Call</h3>
                                <p className="text-sm text-muted-foreground">Book a meeting directly</p>
                            </div>
                        </div>
                        <ArrowRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Socials Card */}
                    <div className="flex items-center justify-between p-6 bg-card/50 border border-border/50 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                                <Sparkles size={20} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-foreground">Follow Me</h3>
                                <p className="text-sm text-muted-foreground">Check my latest work</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {Object.entries(social).map(([platform, url]) => (
                                <a
                                    key={platform}
                                    href={url as string}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
                                    aria-label={platform}
                                    onMouseEnter={() => setCursorVariant('button')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    {/* Simple icon mapping or text fallback */}
                                    <span className="capitalize text-xs font-bold">{platform[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.p
                    className="text-center text-muted-foreground/60 text-sm mt-20"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    © {new Date().getFullYear()} Abbas Ali Dalal. All rights reserved.
                </motion.p>
            </div>
        </section>
    );
}
