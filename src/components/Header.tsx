import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faStar,
  faPrint,
  faImages,
  faPhone,
  faChevronDown,
  faBars,
  faTimes,
  faPlay,
  faAward,
  faUsers,
  faRocket
} from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/media/sarasvathiprinterslogo.svg';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 23, 42, 0.1)', 'rgba(15, 23, 42, 0.95)']
  );
  const headerBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(20px)']
  );

  const heroOpacity = useTransform(
    scrollY,
    [0, 300],
    [1, 0]
  );
  const heroScale = useTransform(
    scrollY,
    [0, 300],
    [1, 0.9]
  );

  const navItems = [
    { id: "home", label: "Home", icon: faHome, color: "from-blue-500 to-blue-600" },
    { id: "services", label: "Services", icon: faPrint, color: "from-emerald-500 to-emerald-600" },
    { id: "gallery", label: "Portfolio", icon: faImages, color: "from-purple-500 to-purple-600" },
    { id: "contact", label: "Contact", icon: faPhone, color: "from-rose-500 to-rose-600" }
  ];

  // Check if mobile/tablet
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = headerRef.current?.offsetHeight ?? 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setActiveSection(id);
  };

  // Mobile navigation variants
  const mobileItemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        className="fixed w-full top-0 z-50 overflow-hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          background: headerBackground,
          backdropFilter: headerBlur,
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <nav className="flex items-center justify-between px-3 sm:px-4 lg:px-8 xl:px-[5%] max-w-[1400px] mx-auto h-16 lg:h-20 relative">
          {/* Logo - Bigger in mobile */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="flex items-center gap-2 lg:gap-4 group"
            >
              <motion.img
                src={logo}
                alt="Saraswathi Printers Logo"
                className="h-14 sm:h-16 lg:h-14 w-auto drop-shadow-2xl" // Increased mobile size
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              />
            </motion.a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.ul className="hidden lg:flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.li
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-3 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl backdrop-blur-md border border-white/10 transition-all duration-300 relative overflow-hidden group text-sm lg:text-base
                    ${activeSection === item.id ? `bg-gradient-to-r ${item.color} shadow-lg` : 'bg-white/5 hover:bg-white/10'}`}
                  whileHover={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    borderColor: "rgba(255,255,255,0.2)"
                  }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 flex items-center gap-2 lg:gap-3">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`text-xs lg:text-sm ${activeSection === item.id ? 'text-white' : 'text-cyan-400'}`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </div>

                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    />
                  )}
                </motion.button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Navigation - Smaller items */}
          <AnimatePresence>
            {isMobile && (
              <motion.div
                className="lg:hidden flex-1 flex justify-end ml-2" // Added margin left
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.ul className="flex items-center gap-1 overflow-x-auto custom-scrollbar">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.id}
                      custom={index}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="flex-shrink-0"
                    >
                      <motion.button
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center gap-1 px-2 py-1.5 rounded-lg transition-all duration-300 relative overflow-hidden group text-[10px] xs:text-xs
                          ${activeSection === item.id ? `bg-gradient-to-r ${item.color} shadow-lg` : 'bg-white/5 hover:bg-white/10'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Animated background */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100`}
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />

                        <div className="relative z-10 flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={item.icon}
                            className={`${activeSection === item.id ? 'text-white' : 'text-cyan-400'} text-[10px]`} // Smaller icon
                          />
                          <span className={`font-medium whitespace-nowrap ${activeSection === item.id ? 'text-white' : 'text-gray-200'
                            }`}>
                            {item.label}
                          </span>
                        </div>

                        {activeSection === item.id && (
                          <motion.div
                            className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-white rounded-full" // Smaller indicator
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          />
                        )}
                      </motion.button>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>

      {/* Add custom CSS for better mobile navigation */}
      <style jsx>{`
        :global(html) {
          scroll-padding-top: 80px;
        }
        
        /* Custom scrollbar for mobile navigation */
        :global(.custom-scrollbar) {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        
        :global(.custom-scrollbar::-webkit-scrollbar) {
          height: 3px;
        }
        
        :global(.custom-scrollbar::-webkit-scrollbar-track) {
          background: transparent;
        }
        
        :global(.custom-scrollbar::-webkit-scrollbar-thumb) {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 1.5px;
        }
        
        :global(.custom-scrollbar::-webkit-scrollbar-thumb:hover) {
          background-color: rgba(255, 255, 255, 0.5);
        }

        /* Extra small screen optimizations */
        @media (max-width: 360px) {
          :global(.custom-scrollbar) {
            max-width: 180px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;