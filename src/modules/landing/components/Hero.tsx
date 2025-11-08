"use client";

import Avatar from "@public/avatar.png";
import AnimatedActionButton from "@shared/components/ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 }, 
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 10,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, x: 50 },
  show: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 10,
      delay: 0.6,
    },
  },
};

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center justify-center h-fit w-full p-4 md:p-8 lg:p-12">
      <div className="relative w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center justify-center">  
        <motion.div
          className="relative z-10 text-center lg:text-left order-2 lg:order-1 pt-16 lg:pt-0"
          variants={textContainerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="text-gray-400 text-base md:text-lg mb-4 flex items-center justify-center lg:justify-start gap-3 font-mono tracking-wide"
            variants={textItemVariants}
          >
            <span className="block w-10 h-px bg-amber-600"></span> Hello, I'm
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-gray-100 mb-6"
            variants={textItemVariants}
          >
            Abbas Ali <span className="text-amber-500">Dalal</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto lg:mx-0"
            variants={textItemVariants}
          >
            I craft seamless digital experiences, blending <strong className="capitalize">beautiful design</strong> with{" "}
            <strong className="text-amber-400">robust, scalable code</strong> as a
            passionate software engineer.
          </motion.p>
          <AnimatedActionButton variant="outline">Download Resume</AnimatedActionButton>
        </motion.div>

        <motion.div
          className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-end"
          variants={imageVariants}
          initial="hidden"
          animate="show"
        >
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden flex justify-center items-center ">
            <Image
              src={Avatar}
              alt="Abbas Ali Dalal's Avatar"
              fill
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
              className="object-cover object-center"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}