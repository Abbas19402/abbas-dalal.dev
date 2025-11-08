// components/SkillsSection.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiSpringboot,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: React.JSX.Element;
  color: string; 
};

const skills: Skill[] = [
  { name: "JavaScript", icon: <SiJavascript />, color: "rgb(247 223 30)" },
  { name: "TypeScript", icon: <SiTypescript />, color: "rgb(49 120 198)" },
  { name: "React", icon: <SiReact />, color: "rgb(97 218 251)" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "rgb(255 255 255)" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "rgb(83 162 73)" },
  { name: "Express", icon: <SiExpress />, color: "rgb(255 255 255)" },
  { name: "Spring Boot", icon: <SiSpringboot />, color: "rgb(109 179 63)" },
  { name: "MongoDB", icon: <SiMongodb />, color: "rgb(71 162 72)" },
];

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const currentSkill = hoveredSkill !== null ? skills[hoveredSkill] : null;

  return (
    <motion.section
      className="relative w-full overflow-hidden py-24 sm:py-32 text-neutral-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-16 text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Core{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Technologies
          </span>
        </h2>

        <div className="relative flex min-h-[400px] flex-col md:flex-row">
          
          <div className="w-full md:w-1/2">
            <ul className="flex flex-col gap-4">
              {skills.map((skill, index) => (
                <motion.li
                  key={skill.name}
                  className="cursor-pointer"
                  onHoverStart={() => setHoveredSkill(index)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <motion.span
                    className="text-3xl md:text-5xl font-medium tracking-tight"
                    animate={{
                      opacity: hoveredSkill === null || hoveredSkill === index ? 1 : 0.3,
                      color: hoveredSkill === index ? skill.color : "rgb(229 229 229)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.name}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="pointer-events-none absolute inset-0 right-0 w-full md:w-1/2 md:relative">
            <AnimatePresence mode="wait">
              {currentSkill && (
                <motion.div
                  key={currentSkill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.div
                    className="text-[300px] lg:text-[400px] opacity-20"
                    style={{ color: currentSkill.color }} 
                    animate={{
                      y: ["0px", "-20px", "0px"],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {currentSkill.icon}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;