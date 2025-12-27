"use client";

import { motion } from 'motion/react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiSpring,
  SiExpress,
  SiNestjs,
  SiMysql,
  SiMongodb
} from 'react-icons/si';
import { DiJava } from "react-icons/di";

export default function Skills() {
  const technologies = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "React Native", icon: SiReact, color: "#61DAFB" },
    { name: "Java", icon: DiJava, color: "#f89820" },
    { name: "Spring Boot", icon: SiSpring, color: "#6DB33F" },
    { name: "Express", icon: SiExpress, color: "#FFFFFF" },
    { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
    { name: "SQL", icon: SiMysql, color: "#4479A1" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  ];

  // Duplicate for seamless loop
  const extendedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 mb-16">
        {/* Section header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-4">
            Tech Stack
          </h2>
          <p className="text-gray-400 text-lg">
            Technologies that power my work
          </p>
        </motion.div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-8">
        {/* First row - moving right */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, '-33.33%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {extendedTechs.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="relative px-12 py-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl hover:border-sky-500/50 transition-all min-w-[200px]">
                    <div className="absolute inset-0 bg-sky-500/0 group-hover:bg-sky-500/5 rounded-2xl transition-colors" />
                    <div className="relative flex items-center gap-4">
                      <Icon
                        className="text-4xl transition-colors"
                        style={{ color: tech.color }}
                      />
                      <span className="text-2xl font-bold text-gray-200 group-hover:text-sky-400 transition-colors whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Second row - moving left */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10" />

          <motion.div
            className="flex gap-8"
            animate={{
              x: ['-33.33%', 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {extendedTechs.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 group"
                >
                  <div className="relative px-12 py-8 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl hover:border-purple-500/50 transition-all min-w-[200px]">
                    <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 rounded-2xl transition-colors" />
                    <div className="relative flex items-center gap-4">
                      <Icon
                        className="text-4xl transition-colors"
                        style={{ color: tech.color }}
                      />
                      <span className="text-2xl font-bold text-gray-200 group-hover:text-purple-400 transition-colors whitespace-nowrap">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom note */}
      <motion.p
        className="text-center text-gray-500 text-sm mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Continuously evolving and learning new tools
      </motion.p>
    </section>
  );
}