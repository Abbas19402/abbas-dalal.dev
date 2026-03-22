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
    <div className="absolute left-0 top-0 h-full flex items-center pl-4 lg:pl-10 pointer-events-none">
      <div className="pointer-events-auto">
        <Logo className="h-10 w-10 shrink-0 lg:h-12 lg:w-12" />
      </div>
    </div>
  );

  React.useEffect(() => {
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
        <MobileNav>
          <MobileNavHeader>
            <Logo />
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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className={cn(
                  "relative text-neutral-600 dark:text-neutral-300",
                  activeSection === item.link && "text-black dark:text-white font-semibold"
                )}
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}

export default Header
