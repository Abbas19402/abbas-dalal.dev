'use client'

import React, { useState } from 'react'
import { cn } from '@shared/utils'
import { Navbar, NavBody, NavbarLogo, NavItems, NavbarButton, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from '@shared/components/ui/resizable-navbar'
import Logo from './Logo';
import { motion } from 'motion/react';


const Header = () => {
  const navItems = [
    {
      name: "Projects",
      link: "#projects",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Skills",
      link: "#skills",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const LogoWrapper = () => (
    <div className="pointer-events-none absolute left-0 top-0 hidden h-full items-center pl-6 lg:flex lg:pl-10">
      <div className="pointer-events-auto">
        <Logo className="h-10 w-10 shrink-0 lg:h-12 lg:w-12" />
      </div>
    </div>
  );

  React.useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    if (isMobile) return;

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.link.replace('#', ''));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    setActiveSection(link);
    const targetId = link.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full">
      <Navbar>
        <LogoWrapper />
        {/* Desktop Navigation */}
        <NavBody className="overflow-hidden">
          <NavItems items={navItems} onItemClick={handleNavClick} activeLink={activeSection} />
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav className="px-3 py-2 sm:px-4">
          <MobileNavHeader className="px-2 sm:px-3">
            <Logo className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <motion.a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.03 * idx, duration: 0.22 }}
                className={cn(
                  "group relative flex w-full items-center rounded-lg px-3 py-2.5 text-lg tracking-wide text-neutral-300 transition-colors",
                  "hover:bg-white/5 hover:text-white",
                  activeSection === item.link && "bg-white/8 text-white font-semibold"
                )}
              >
                <span className="mr-3 text-xs text-sky-400/80">{`0${idx + 1}`}</span>
                <span className="block">{item.name}</span>
              </motion.a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}

export default Header
