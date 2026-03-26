"use client";
import { cn } from "@shared/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";
import { useScrollContainer } from "@shared/context/ScrollContainerContext";

const navTransition = {
  type: "tween" as const,
  duration: 0.45,
  ease: [0.25, 0.1, 0.25, 1] as const,
};


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  activeLink?: string;
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, link: string) => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const scrollContainerRef = useScrollContainer();
  const { scrollY } = useScroll(
    scrollContainerRef ? { container: scrollContainerRef } : undefined,
  );
  const [visible, setVisible] = useState<boolean>(false);
  const visibleRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextVisible = latest > 100;
    if (nextVisible !== visibleRef.current) {
      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    }
  });

  return (
    <div
      className={cn(
        "sticky top-0 z-200 w-full shrink-0 self-start py-4",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
            child as React.ReactElement<{ visible?: boolean }>,
            { visible },
          )
          : child,
      )}
    </div>
  );
};

const collapsedNavSurface =
  "isolate overflow-hidden bg-white/88 backdrop-blur-[64px] backdrop-saturate-200 shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/5 dark:bg-zinc-950/88 dark:shadow-[0_8px_40px_rgba(0,0,0,0.55)] dark:ring-white/15";

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        width: visible ? "40%" : "100%",
        paddingTop: visible ? "0.875rem" : "1.75rem",
        paddingBottom: visible ? "0.875rem" : "1.75rem",
        backgroundColor: visible ? "rgba(24, 24, 27, 0.8)" : "rgba(24, 24, 27, 0)",
        backdropFilter: visible ? "blur(20px)" : "blur(0px)",
      }}
      transition={navTransition}
      className={cn(
        "relative z-201 mx-auto hidden min-h-14 min-w-0 w-full max-w-7xl flex-row items-center justify-between self-start rounded-full px-4 lg:flex",
        visible && "shadow-2xl",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { visible })
          : child
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, activeLink }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const activeIndex = items.findIndex((item) => item.link === activeLink);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative hidden flex-1 flex-row items-center justify-center space-x-2 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        const isHovered = hovered === idx;
        // Show pill if hovered, or if active and no other item is hovered
        const showPill = isHovered || (isActive && hovered === null);

        return (
          <a
            key={item.link}
            onMouseEnter={() => setHovered(idx)}
            onClick={(e) => {
              onItemClick(e, item.link);
            }}
            href={item.link}
            className={cn(
              "relative z-20 flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors duration-200",
              showPill
                ? "text-zinc-900 dark:text-white"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
            )}
          >
            {showPill && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
          </a>
        );
      })}
    </div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        width: "100%",
        paddingRight: "0px",
        paddingLeft: "0px",
        borderRadius: "1rem",
        backgroundColor: "rgba(24, 24, 27, 0)",
        backdropFilter: "none",
      }}
      transition={navTransition}
      className={cn(
        "relative z-201 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between px-3 py-2 sm:max-w-[calc(100vw-2rem)] sm:px-4 lg:hidden",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex min-h-12 w-full flex-row items-center justify-between gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className={cn(
            "absolute inset-x-0 top-16 z-210 w-full overflow-hidden rounded-2xl border border-sky-400/20 bg-zinc-950/70 px-3 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
            className,
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-zinc-950/40 backdrop-blur-[18px] backdrop-saturate-150" />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-zinc-900/45 via-zinc-950/20 to-zinc-950/45" />
          <div className="pointer-events-none absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-sky-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -right-10 bottom-2 h-20 w-20 rounded-full bg-fuchsia-500/20 blur-2xl" />
          <div className="relative z-10 flex flex-col gap-1 rounded-xl border border-white/10 bg-black/35 p-3">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & React.ComponentPropsWithoutRef<"a"> & Record<string, any>) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  const Component = Tag as any;

  return (
    <Component
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
