"use client";

import { motion, Variants, HTMLMotionProps, easeOut, easeInOut } from "framer-motion";
import { ReactNode } from "react";

// Define prop interface for better type safety and clarity
type AnimatedActionButtonBaseProps = Omit<HTMLMotionProps<"button">, "children"> & {
  className?: string;
  variants?: Variants;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant: 'outline' | 'filled';
};

type AnimatedActionButtonWithTitle = {
  title: string;
  children?: never;
};

type AnimatedActionButtonWithChildren = {
  title?: never;
  children: ReactNode;
};

type AnimatedActionButtonProps = AnimatedActionButtonBaseProps & (
  | AnimatedActionButtonWithTitle
  | AnimatedActionButtonWithChildren
);

const rippleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  hover: {
    scale: [0, 1.5, 2.2],
    opacity: [0, 0.6, 0],
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom easing for organic feel
      times: [0, 0.4, 1],
    },
  },
};

// Improved sweep animation with smoother easing
const innerVariants: Variants = {
  initial: { 
    scaleX: 0,
    opacity: 0,
    originX: 0,
  },
  hover: {
    scaleX: 1,
    opacity: [0, 1, 1],
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // Bouncy easing for impact
      opacity: {
        duration: 0.3,
        times: [0, 0.3, 1],
      }
    },
  },
};

// Shine effect for premium feel
const shineVariants: Variants = {
  initial: {
    x: '-100%',
    opacity: 0,
  },
  hover: {
    x: '200%',
    opacity: [0, 1, 0],
    transition: {
      duration: 0.8,
      ease: easeInOut,
      times: [0, 0.5, 1],
    },
  },
};

// Particle burst effect
const particleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 0,
    x: 0,
    y: 0,
  },
  hover: {
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    x: [0, 'var(--x)'],
    y: [0, 'var(--y)'],
    transition: {
      duration: 0.6,
      ease: easeOut,
      times: [0, 0.3, 1],
    },
  },
};

export default function AnimatedActionButton({ 
  children, 
  title,
  className = "", 
  variants, 
  onClick, 
  type = "button", 
  variant = 'outline',
  ...rest 
}: AnimatedActionButtonProps) {
  
  // Enhanced hover animation with stagger
  const whileHoverProps = {
    scale: 1.05,
    y: -2,
    boxShadow: variant === 'outline' 
      ? "0 10px 40px oklch(28.5% 0.169 237.323), 0 0 0 1px oklch(28.5% 0.169 237.323)"
      : "0 10px 40px oklch(28.5% 0.169 237.323), 0 0 0 1px oklch(28.5% 0.169 237.323)",
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    }
  };

  const whileTapProps = {
    scale: 0.97,
    y: 0,
    boxShadow: "0 2px 10px rgba(245, 158, 11, 0.2)",
    transition: {
      duration: 0.1,
      ease: easeOut,
    }
  };

  const baseClasses = variant === 'outline'
    ? 'bg-transparent text-sky-500 border-2 border-sky-500/40 hover:border-sky-400'
    : 'bg-gradient-to-br from-sky-500 to-sky-600 text-zinc-950 border-2 border-sky-400/50';

  const initialTextColor: string = variant === 'outline' ? "#f59e0b" : "#09090b";
  const hoverTextColor: string = "#09090b";

  // Particle positions for burst effect
  const particlePositions: Array<{ x: string; y: string }> = [
    { x: '40px', y: '-30px' },
    { x: '-40px', y: '-30px' },
    { x: '50px', y: '10px' },
    { x: '-50px', y: '10px' },
    { x: '30px', y: '30px' },
    { x: '-30px', y: '30px' },
  ];

  return (
    <motion.button
      type={type}
      variants={variants}
      onClick={onClick}
      {...rest}
      whileHover={whileHoverProps}
      whileTap={whileTapProps}
      className={`
        relative overflow-hidden group 
        px-10 py-4 rounded-xl 
        font-bold tracking-widest text-base 
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-4 focus:ring-sky-500/50
        shadow-lg
        ${baseClasses}
        ${className}
      `}
    >
      {/* Multi-layered ripple effect */}
      <motion.span
        className="absolute inset-0 pointer-events-none rounded-xl"
        initial="initial"
        whileHover="hover"
        variants={rippleVariants}
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, rgba(245, 158, 11, 0) 70%)',
        }}
      />

      {/* Secondary ripple for depth */}
      <motion.span
        className="absolute inset-0 pointer-events-none rounded-xl"
        initial="initial"
        whileHover="hover"
        variants={{
          initial: { scale: 0, opacity: 0 },
          hover: {
            scale: [0, 1.8, 2.5],
            opacity: [0, 0.3, 0],
            transition: {
              duration: 1,
              ease: easeOut,
              times: [0, 0.5, 1],
              delay: 0.1,
            },
          },
        } as Variants}
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(251, 191, 36, 0) 70%)',
        }}
      />
      
      {/* Main sweep layer with enhanced gradient */}
      <motion.span
        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl"
        initial="initial"
        whileHover="hover"
        variants={innerVariants}
        style={{
          background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.95) 0%, rgba(245, 158, 11, 1) 50%, rgba(251, 191, 36, 0.95) 100%)',
          transformOrigin: 'left center',
        }}
      />

      {/* Shine effect overlay */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial="initial"
        whileHover="hover"
        variants={shineVariants}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
          width: '50%',
        }}
      />

      {/* Particle burst effects */}
      {particlePositions.map((pos, i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full pointer-events-none"
          initial="initial"
          whileHover="hover"
          variants={particleVariants}
          style={{
            backgroundColor: 'rgba(251, 191, 36, 0.8)',
            ['--x' as string]: pos.x,
            ['--y' as string]: pos.y,
          }}
          transition={{
            delay: i * 0.05,
          }}
        />
      ))}

      {/* Border glow effect */}
      <motion.span
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: [0, 1, 0.8],
          transition: { 
            duration: 0.5,
            times: [0, 0.3, 1]
          }
        }}
        style={{
          boxShadow: 'inset 0 0 20px rgba(251, 191, 36, 0.5)',
        }}
      />

      {/* Content layer with enhanced text animation */}
      <motion.span
        className="relative z-10 block"
        variants={{ 
          hover: { 
            color: hoverTextColor,
            scale: 1.02,
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
            transition: { 
              duration: 0.3,
              ease: easeOut,
            } 
          }, 
          initial: { 
            color: initialTextColor,
            scale: 1,
            filter: 'drop-shadow(0 0 0 rgba(0, 0, 0, 0))',
          }
        } as Variants}
      >
        {title ?? children}
      </motion.span>
    </motion.button>
  );
}