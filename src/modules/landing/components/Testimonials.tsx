"use client";

import { motion } from 'motion/react';
import { Lightbulb, Code2, Keyboard, Moon, Coffee, Palette, Eraser } from 'lucide-react';
import portfolioData from '@shared/constants/portfolioData.json';
import Carousel from '@shared/components/Carousel';
import InsightCard from './InsightCard';

export default function Testimonials() {
    const { title, subtitle, items } = portfolioData.testimonials;

    const getIcon = (id: string) => {
        switch (id) {
            case 'fact-1': return <Moon className="w-8 h-8 text-sky-400" />;
            case 'fact-2': return <Code2 className="w-8 h-8 text-purple-400" />;
            case 'fact-3': return <Keyboard className="w-8 h-8 text-pink-400" />;
            case 'fact-4': return <Coffee className="w-8 h-8 text-amber-400" />;
            case 'fact-5': return <Palette className="w-8 h-8 text-indigo-400" />;
            case 'fact-6': return <Eraser className="w-8 h-8 text-rose-400" />;
            default: return <Lightbulb className="w-8 h-8 text-yellow-400" />;
        }
    };

    return (
        <section className="relative py-32 px-6 md:px-10 lg:px-20" id="testimonials">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-4">{title}</h2>
                    <p className="text-gray-400 text-lg tracking-wide">{subtitle}</p>
                </motion.div>

                <Carousel
                    items={items}
                    itemsPerSlide={2}
                    gap={24}
                    renderItem={(item) => (
                        <InsightCard
                            icon={getIcon(item.id)}
                            title={item.author}
                            category={item.role}
                            content={item.quote}
                        />
                    )}
                />
            </div>
        </section>
    );
}
