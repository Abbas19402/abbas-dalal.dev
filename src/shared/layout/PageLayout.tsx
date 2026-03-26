"use client";

import { motion, Transition, Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { CiMenuFries } from "react-icons/ci";
import {
  FaArrowDown,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaCode
} from "react-icons/fa";
import Header from "@shared/components/Header";
import Logo from "@shared/components/Logo";
import { ScrollContainerContext } from "@shared/context/ScrollContainerContext";

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

const socialIconHover = {
  scale: 1.2,
  rotate: 5,
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 10,
  },
};

const menuButtonHover = {
  scale: 1.1,
  rotate: 90,
  transition: {
    type: "spring" as const,
    stiffness: 300,
    damping: 15,
  },
};

const logoHover = {
  scale: 1.05,
  transition: {
    type: "spring" as const,
    stiffness: 400,
    damping: 20,
  },
};

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

const scrollBounceTransition: Transition = {
  duration: 1.5,
  repeat: Infinity,
  ease: "easeInOut" as const,
  repeatType: "reverse" as const,
};

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = scrollContainerRef.current;
    const content = scrollContentRef.current;
    if (!wrapper || !content) return;

    const lenis = new Lenis({
      wrapper,
      content,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId = 0;
    let isDocumentVisible = document.visibilityState === "visible";
    function raf(time: number) {
      lenis.raf(time);
      if (isDocumentVisible) {
        rafId = requestAnimationFrame(raf);
      }
    }
    rafId = requestAnimationFrame(raf);

    const handleVisibilityChange = () => {
      const wasVisible = isDocumentVisible;
      isDocumentVisible = document.visibilityState === "visible";

      if (!isDocumentVisible && rafId) {
        cancelAnimationFrame(rafId);
      }

      if (isDocumentVisible && !wasVisible) {
        rafId = requestAnimationFrame(raf);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-zinc-950 text-gray-100 font-sans overflow-hidden">

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

      <div
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(245, 158, 11, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-20 flex h-dvh min-h-0 w-full flex-col">
        <ScrollContainerContext.Provider value={scrollContainerRef}>
          <div
            ref={scrollContainerRef}
            className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden custom-scrollbar pb-10 px-6 md:px-10 lg:px-12"
          >
            <header className="z-50 pointer-events-none">
              <div className="w-full fixed top-0 left-0 z-50 pointer-events-auto">
                <Header />
              </div>
            </header>
            <div ref={scrollContentRef} className="flex min-h-min min-w-0 flex-col mt-20">
              {children}
            </div>
          </div>
        </ScrollContainerContext.Provider>

        <div className="fixed top-0 left-0 right-0 h-24 bg-linear-to-b from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none z-40" />
        <div className="fixed bottom-0 left-0 right-0 h-24 bg-linear-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none z-40" />
      </div>

      <motion.div
        className="pointer-events-none relative z-30 min-h-screen w-full"
        variants={mainContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="pointer-events-auto fixed hidden lg:flex right-0 top-0 bottom-0 z-40 flex-col items-end justify-center space-y-6 py-32 pr-6 md:pr-10 lg:pr-12"
          initial="hidden"
          animate="show"
          transition={{
            staggerChildren: 0.1,
            delayChildren: 0.8
          } as Transition}
        >
          <motion.div
            className="absolute right-6 md:right-10 lg:right-14 top-32 bottom-32 w-px bg-linear-to-b from-transparent via-sky-500/30 to-transparent"
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
                className="relative group text-gray-400 hover:text-sky-500 transition-colors"
                variants={socialIconVariants}
                whileHover={socialIconHover}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
              >
                <Icon size={20} />

                <motion.div
                  className="absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
                  style={{
                    background: "radial-gradient(circle, rgba(245, 158, 11, 0.6) 0%, transparent 70%)",
                  }}
                />

                <motion.span
                  className="absolute right-full mr-4 px-3 py-1 bg-zinc-800 text-sky-500 text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  initial={{ x: 10 }}
                  whileHover={{ x: 0 }}
                >
                  {label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="fixed hidden lg:flex bottom-10 right-10 flex-col items-center justify-center z-30"
          variants={scrollIndicatorVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-col items-center">
            <motion.div
              className="w-px h-12 mb-2 bg-linear-to-b from-transparent via-sky-500 to-transparent"
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

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={scrollBounceTransition}
              className="relative"
            >
              <FaArrowDown className="text-sky-500 relative z-10" size={24} />

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

            <motion.span
              className="mt-2 text-xs text-sky-500/70 tracking-widest"
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
      </motion.div>
    </main>
  );
}