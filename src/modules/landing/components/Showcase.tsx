"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { useUIStore } from '@shared/store/useUIStore';
import portfolioData from '@shared/constants/portfolioData.json';

export default function Showcase() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const { setCurrentTheme, setCursorVariant } = useUIStore();
    const { projects } = portfolioData.showcase;

    return (
        <section
            ref={containerRef}
            className="relative py-20 px-6 md:px-10 lg:px-20"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section title */}
                <motion.div
                    className="text-center mb-32"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-4">
                        {portfolioData.showcase.title}
                    </h2>
                    <p className="text-gray-400 text-lg tracking-wide">
                        {portfolioData.showcase.subtitle}
                    </p>
                </motion.div>

                {/* Projects grid */}
                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });
    const setCursorVariant = useUIStore((state) => state.setCursorVariant);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            {/* Project visual */}
            <motion.div
                className="flex-1 w-full"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
            >
                <div
                    className="relative aspect-video rounded-3xl overflow-hidden border-2 group cursor-pointer"
                    style={{
                        borderColor: project.theme.primary + '40',
                        background: `linear-gradient(135deg, ${project.theme.primary}20, ${project.theme.secondary}20)`,
                    }}
                >
                    {/* Gradient overlay */}
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            background: `radial-gradient(circle at 30% 50%, ${project.theme.primary}40, transparent 70%)`,
                        }}
                    />

                    {/* Project preview placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span
                            className="text-6xl font-bold opacity-20"
                            style={{ color: project.theme.primary }}
                        >
                            {project.title.split(' ')[0]}
                        </span>
                    </div>

                    {/* Hover overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                        <motion.button
                            className="px-8 py-4 rounded-xl border-2 font-medium text-white"
                            style={{ borderColor: project.theme.primary }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            View Project →
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Project info */}
            <div className="flex-1 space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-sm tracking-widest opacity-70 mb-2">
                        {project.category} · {project.year}
                    </p>
                    <h3
                        className="text-4xl md:text-5xl font-bold mb-4"
                        style={{ color: project.theme.primary }}
                    >
                        {project.title}
                    </h3>
                </motion.div>

                <motion.p
                    className="text-gray-300 text-lg leading-relaxed"
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    {project.description}
                </motion.p>

                {/* Tags */}
                <motion.div
                    className="flex flex-wrap gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 }}
                >
                    {project.tags.slice(0, 5).map((tag: string) => (
                        <span
                            key={tag}
                            className="px-4 py-2 text-sm rounded-full border bg-zinc-900/50"
                            style={{
                                borderColor: project.theme.primary + '30',
                                color: project.theme.primary,
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>

                {/* Metrics */}
                <motion.div
                    className="grid grid-cols-3 gap-6 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 }}
                >
                    {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                            <p
                                className="text-2xl font-bold"
                                style={{ color: project.theme.primary }}
                            >
                                {value as string}
                            </p>
                            <p className="text-xs text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Awards */}
                {project.awards && project.awards.length > 0 && (
                    <motion.div
                        className="flex items-center gap-2 pt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 }}
                    >
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: project.theme.primary }}
                        />
                        <span className="text-sm tracking-wide opacity-70">
                            {project.awards[0]}
                        </span>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
