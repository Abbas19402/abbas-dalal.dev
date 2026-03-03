"use client";

import React, { useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import portfolioData from '@shared/constants/portfolioData.json';
import { cn } from '@shared/utils';
import {
  Code2,
  Palette,
  Box,
  Terminal,
  Cpu,
  Globe,
  Zap,
  Layers
} from 'lucide-react';

// --- Types ---
type SkillItem = {
  name: string;
  proficiency: number;
};

type SkillCategory = {
  name: string;
  items: SkillItem[];
};

// --- Shared Components ---

const CardHeader = ({ title, icon: Icon, description }: { title: string, icon: any, description: string }) => (
  <div className="flex flex-col gap-2 mb-6 pointer-events-none">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <h3 className="text-xl font-bold font-heading">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

// --- 1. Frontend Card: Code Editor Aesthetic ---
// Interactive code typing effect + scanning

const CodeLine = ({ text, delay }: { text: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-3 text-sm font-mono items-center"
    >
      <span className="text-muted-foreground select-none w-6 text-right opacity-50 text-xs">{(delay * 10).toFixed(0)}</span>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </motion.div>
  );
}

const FrontendCard = ({ skills }: { skills: SkillItem[] }) => {
  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 overflow-hidden relative group">
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader
        title="Frontend Engineering"
        icon={Code2}
        description="Crafting scalable interfaces"
      />

      <div className="relative z-10 bg-[#09090b] rounded-xl border border-white/5 p-4 h-[240px] overflow-hidden shadow-2xl">
        {/* Editor fake header */}
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
            <div className="w-3 h-3 rounded-full bg-green-500/20" />
          </div>
          <span className="text-xs text-muted-foreground ml-2 font-mono">Component.tsx</span>
        </div>

        {/* Code Content */}
        <div className="space-y-1">
          <CodeLine delay={0.1} text="<span style='color: #c678dd'>import</span> { <span style='color: #e5c07b'>React</span> } <span style='color: #c678dd'>from</span> 'react';" />
          <CodeLine delay={0.2} text="" />
          <CodeLine delay={0.3} text="<span style='color: #c678dd'>export const</span> <span style='color: #61afef'>TechStack</span> = () => {" />
          <CodeLine delay={0.4} text="&nbsp;&nbsp;<span style='color: #c678dd'>return</span> (" />
          <div className="pl-4 pt-2 flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(56, 189, 248, 0.2)" }}
                className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/20 cursor-default"
              >
                &lt;{skill.name} /&gt;
              </motion.span>
            ))}
          </div>
          <CodeLine delay={0.8} text="&nbsp;&nbsp;)" />
          <CodeLine delay={0.9} text="}" />
        </div>
      </div>
    </div>
  );
};

// --- 2. Animation Card: Interactive Physics ---
// A playful interactive area

const AnimationCard = ({ skills }: { skills: SkillItem[] }) => {
  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 overflow-hidden relative group">
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader
        title="Animation & Interaction"
        icon={Zap}
        description="Breathing life into pixels"
      />

      <div className="relative h-[200px] flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3 w-full">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              className="bg-sidebar-accent/50 border border-sidebar-border rounded-xl p-3 flex items-center justify-between cursor-pointer"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-medium text-sm">{skill.name}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Decorative Floating Elements */}
        <motion.div
          className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

// --- 3. 3D & WebGL Card: Mini Canvas ---
// 3D Object that tracks mouse

function RotatingShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float floatIntensity={2} rotationIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0.2}
          chromaticAberration={1}
          anisotropy={0.3}
          distortion={0.4}
          distortionScale={0.3}
          temporalDistortion={0.5}
          color="#ec4899"
        />
      </mesh>
    </Float>
  );
}

const WebGLCard = ({ skills }: { skills: SkillItem[] }) => {
  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 overflow-hidden relative group">
      <div className="absolute inset-0 bg-linear-to-br from-pink-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-6 left-6 z-10">
        <CardHeader
          title="3D & WebGL"
          icon={Box}
          description="Immersive experiences"
        />
      </div>

      <div className="absolute inset-0 top-16">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <RotatingShape />
        </Canvas>
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 pointer-events-none">
        {skills.map(skill => (
          <div key={skill.name} className="px-2 py-1 bg-background/50 backdrop-blur-md rounded-md border border-white/10 text-xs font-medium">
            {skill.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. Tools Card: Grid/Dock Aesthetic ---

const ToolsCard = ({ skills }: { skills: SkillItem[] }) => {
  return (
    <div className="h-full bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-6 overflow-hidden relative group flex flex-col">
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader
        title="Tools & Workflow"
        icon={Layers}
        description="The engine room"
      />

      <div className="flex-1 grid grid-cols-2 gap-4 content-start">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="group/item relative bg-sidebar-accent/30 rounded-xl p-3 border border-sidebar-border hover:border-orange-500/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-background flex items-center justify-center text-xs font-bold text-muted-foreground group-hover/item:text-orange-500 transition-colors">
                {skill.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="text-sm font-medium">{skill.name}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};


// --- Main Layout ---

export default function Skills() {
  const categories = portfolioData.skills.categories;

  // Map categories to specific cards (simplified mapping based on index or name)
  const frontend = categories.find(c => c.name === "Frontend")?.items || [];
  const animation = categories.find(c => c.name === "Animation")?.items || [];
  const webgl = categories.find(c => c.name === "3D & WebGL")?.items || [];
  const tools = categories.find(c => c.name === "Tools & Platforms")?.items || [];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-background" id="skills">
      {/* Background noise/grain if user wants, currently clean */}

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 mb-12">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-heading text-foreground">
            Tech Arsenal
          </h2>
          <p className="text-muted-foreground text-lg">
            A curated collection of tools and technologies I use to build performant, scalable, and beautiful digital experiences.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[320px]">

          {/* Frontend - Large Card */}
          <div className="lg:col-span-2">
            <FrontendCard skills={frontend} />
          </div>

          {/* Animation - Tall/Normal Card */}
          <div className="lg:row-span-1">
            <AnimationCard skills={animation} />
          </div>

          {/* WebGL - Normal Card */}
          <div className="lg:row-span-1">
            <WebGLCard skills={webgl} />
          </div>

          {/* Tools - Wide/Large Card */}
          <div className="lg:col-span-2">
            <ToolsCard skills={tools} />
          </div>

        </div>
      </div>
    </section>
  );
}