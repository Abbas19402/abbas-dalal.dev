"use client";

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useUIStore } from '@shared/store/useUIStore';
import portfolioData from '@shared/constants/portfolioData.json';
import { Button } from '@shared/components/ui/moving-border';

export default function Hero() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const setCursorVariant = useUIStore((state) => state.setCursorVariant);
  const isLoading = useUIStore((state) => state.isLoading);

  const { greeting, name, tagline, description, cta, stats } = portfolioData.hero;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: isLoading ? 2.5 : 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  const nameVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1] as const
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-10 lg:px-20"
    >
      <motion.div
        className="max-w-7xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Greeting */}
        <motion.div
          variants={itemVariants}
          className="overflow-hidden mb-4"
        >
          <p className="text-sky-500 text-base md:text-lg tracking-widest font-light">
            {greeting}
          </p>
        </motion.div>

        {/* Name with staggered letter reveal */}
        <motion.h1
          variants={nameVariants}
          className="text-[44px] md:text-7xl lg:text-9xl font-bold md:mb-6 tracking-tight"
          style={{ perspective: "1000px" }}
        >
          {name.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{
                display: 'inline-block',
                transformOrigin: 'bottom'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Tagline with gradient */}
        <motion.div
          variants={itemVariants}
          className="mb-8 overflow-hidden"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-light bg-linear-to-r from-sky-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {tagline}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={itemVariants}
          className="mb-12 max-w-2xl"
        >
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed tracking-wide">
            {description}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-6 mb-20"
        >
          <Button
            borderRadius="0.75rem"
            className="bg-zinc-900 text-white border-sky-500/20 hover:border-sky-500/40 transition-all"
            onClick={() =>  document.getElementById(cta.primary.href)?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span className="px-8 py-4 text-base font-medium">
              {cta.primary.text}
            </span>
          </Button>

          <motion.div
            onClick={() => document.getElementById(cta.secondary.href)?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl border-2 border-gray-700 hover:border-purple-500/50 transition-all text-base font-medium relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span className="relative z-10">{cta.secondary.text}</span>
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-pink-600/10"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 max-w-3xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-sky-500/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="relative bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 group-hover:border-sky-500/30 transition-colors">
                  <p className="text-3xl md:text-4xl font-bold bg-linear-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base text-gray-400 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"
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
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
}