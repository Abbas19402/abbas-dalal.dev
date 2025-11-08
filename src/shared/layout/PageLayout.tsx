"use client";

import { motion, Transition, Variants } from "framer-motion";
import type { ReactNode } from "react";
import { CiMenuFries } from "react-icons/ci";
import {
  FaArrowDown,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

// Enhanced main container with smoother entrance
const mainContainerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
};

// Enhanced utility items with better easing
const utilityItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: -30,
    scale: 0.8,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

// Social icons with staggered reveal
const socialIconVariants: Variants = {
  hidden: { 
    opacity: 0, 
    x: 30,
    scale: 0.5,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
    },
  },
};

// Floating animation for social icons on hover
const socialIconHover = {
  scale: 1.2,
  rotate: 5,
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 10,
  },
};

// Menu button hover animation
const menuButtonHover = {
  scale: 1.1,
  rotate: 90,
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 15,
  },
};

// Logo hover animation
const logoHover = {
  scale: 1.05,
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 20,
  },
};

// Scroll indicator variants
const scrollIndicatorVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: -20,
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.5,
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    }
  },
};

// Bounce animation for scroll arrow
const scrollBounceTransition: Transition = {
  duration: 1.5,
  repeat: Infinity,
  ease: "easeInOut" as const,
  repeatType: "reverse" as const,
};

// Background gradient animation
const backgroundVariants: Variants = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 15,
      ease: "linear" as const,
      repeat: Infinity,
    },
  },
};

// Glowing orb effect variants
const orbVariants: Variants = {
  initial: {
    scale: 1,
    opacity: 0.3,
  },
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 8,
      ease: "easeInOut" as const,
      repeat: Infinity,
    },
  },
};

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="relative min-h-screen w-full bg-zinc-950 text-gray-100 font-sans overflow-hidden">
      
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 z-0"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
        style={{
          background: "linear-gradient(45deg, rgba(245, 158, 11, 0.03) 0%, rgba(9, 9, 11, 1) 50%, rgba(245, 158, 11, 0.03) 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Glowing Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0"
        variants={orbVariants}
        initial="initial"
        animate="animate"
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none z-0"
        variants={orbVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 10,
          ease: "easeInOut" as const,
          repeat: Infinity,
          delay: 2,
        }}
        style={{
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(245, 158, 11, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      <motion.div
        className="relative w-full h-full min-h-screen z-10"
        variants={mainContainerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* Enhanced Header - FIXED POSITION */}
        <header className="fixed top-0 left-0 right-0 p-6 md:p-10 lg:p-12 flex justify-between items-center z-40 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-transparent">
          <motion.div
            className="relative text-2xl font-bold tracking-widest cursor-pointer group"
            variants={utilityItemVariants}
            whileHover={logoHover}
          >
            <span className="relative z-10 text-amber-500 group-hover:text-amber-400 transition-colors">
              A
            </span>
            <span className="relative z-10 text-gray-100 group-hover:text-gray-200 transition-colors">
              BBAS ALI DALAL
            </span>
            
            {/* Logo underline effect */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600"
              initial={{ width: "0%" }}
              whileHover={{ 
                width: "100%",
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                }
              }}
            />
          </motion.div>

          <motion.button
            className="lg:hidden relative text-2xl text-gray-300 hover:text-amber-500 transition-colors focus:outline-none group"
            variants={utilityItemVariants}
            whileHover={menuButtonHover}
            whileTap={{ scale: 0.9 }}
            aria-label="Open Menu"
          >
            <CiMenuFries />
            
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"
              style={{
                background: "radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, transparent 70%)",
              }}
            />
          </motion.button>
        </header>

        {/* Enhanced Social Icons Bar - FIXED POSITION */}
        <motion.div
          className="fixed hidden lg:flex right-0 top-0 bottom-0 pr-6 md:pr-10 lg:pr-12 py-32 flex-col space-y-6 items-end justify-center z-40"
          initial="hidden"
          animate="show"
          transition={{ 
            staggerChildren: 0.1, 
            delayChildren: 0.8 
          } as Transition}
        >
          {/* Vertical line */}
          <motion.div
            className="absolute right-6 md:right-10 lg:right-[3.5rem] top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-amber-500/30 to-transparent"
            initial={{ scaleY: 0 }}
            animate={{ 
              scaleY: 1,
              transition: {
                delay: 1.2,
                duration: 0.8,
                ease: "easeOut" as const,
              }
            }}
          />

          <motion.div
            className="flex flex-col space-y-6 relative"
          >
            {[
              { Icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
              { Icon: FaGithub, label: "GitHub", href: "#" },
              { Icon: FaInstagram, label: "Instagram", href: "#" },
              { Icon: FaEnvelope, label: "Email", href: "#" },
            ].map(({ Icon, label, href }, index) => (
              <motion.a
                key={label}
                href={href}
                className="relative group text-gray-400 hover:text-amber-500 transition-colors"
                variants={socialIconVariants}
                whileHover={socialIconHover}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon size={20} />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
                  style={{
                    background: "radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, transparent 70%)",
                  }}
                />

                {/* Tooltip */}
                <motion.span
                  className="absolute right-full mr-4 px-3 py-1 bg-zinc-800 text-amber-500 text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  initial={{ x: 10 }}
                  whileHover={{ x: 0 }}
                >
                  {label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="fixed hidden lg:flex bottom-10 right-10 flex-col items-center justify-center z-30"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-col items-center">
            {/* Animated line */}
            <motion.div
              className="w-px h-12 mb-2 bg-gradient-to-b from-transparent via-amber-500 to-transparent"
              animate={{
                scaleY: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
            />
            
            {/* Arrow with pulse effect */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={scrollBounceTransition}
              className="relative"
            >
              <FaArrowDown className="text-amber-500 relative z-10" size={24} />
              
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 2, 2],
                  opacity: [0.5, 0, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut" as const,
                }}
                style={{
                  border: "2px solid rgba(245, 158, 11, 0.5)",
                }}
              />
            </motion.div>

            {/* Scroll text */}
            <motion.span
              className="mt-2 text-xs text-amber-500/70 tracking-widest"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut" as const,
              }}
            >
              SCROLL
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Content Area with fade-in edges */}
        {/* // 🛑 FIX APPLIED HERE: 
          // Replaced h-screen with flex flex-col to enable proper space filling
          // of the scrollable child div.
        */}
        <div className="relative z-20 w-full min-h-screen flex flex-col"> 
          
          {/* Top fade overlay (Remains fixed and visible) */}
          <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/50 to-transparent pointer-events-none z-30" />
          
          {/* // 🛑 FIX APPLIED HERE: 
            // Added flex-grow to ensure this element takes up all remaining vertical space 
            // and removed h-full since flex-grow handles the height.
            // Increased padding-top for guaranteed clearance under the fixed header.
          */}
          <div className="relative flex-grow overflow-y-auto custom-scrollbar pt-24 md:pt-32 lg:pt-44 pb-10 px-6 md:px-10 lg:px-12">
            {children}
          </div>
          
          {/* Bottom fade overlay (Remains fixed and visible) */}
          <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-30" />
        </div>
      </motion.div>
    </main>
  );
}