import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import logo from '../assets/media/sarasvathiprinterslogo.svg';

export const Footer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [currentYear] = useState(new Date().getFullYear());

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const socialIconVariants = {
    idle: { 
      scale: 1,
      rotate: 0
    },
    hover: { 
      scale: 1.2,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    idle: { x: 0 },
    hover: { 
      x: 5,
      color: "#3B82F6",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.footer 
      ref={sectionRef}
      className="footer relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 px-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-10 left-10 w-16 h-16 border border-blue-400/20 rounded-lg"
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-12 h-12 border border-indigo-400/30 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-10 blur-3xl bg-blue-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-10 blur-3xl bg-indigo-500"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="footer-content grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Company Info Column */}
          <motion.div 
            className="footer-section lg:col-span-2"
            variants={itemVariants}
          >
            <motion.div 
              className="flex items-center gap-4 mb-6"
              animate={floatingAnimation}
            >
              <motion.img
                src={logo}
                alt="Saraswathi Printers Logo"  
                className="h-16"
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0]
                }}
                transition={{ duration: 0.5 }}
              />
              <div>
               
               
              </div>
            </motion.div>

            <motion.p 
              className="text-gray-300 mb-6 leading-relaxed max-w-md"
              variants={itemVariants}
            >
              Professional printing solutions with unmatched quality and reliability. 
              Serving businesses with premium printing services for over a decade.
            </motion.p>

            <motion.div 
              className="social-media"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Connect With Us</h4>
              <div className="social-links flex gap-4">
                {[
                  { platform: 'facebook', color: 'hover:text-blue-400', icon: 'fab fa-facebook-f' },
                  { platform: 'instagram', color: 'hover:text-pink-400', icon: 'fab fa-instagram' },
                  { platform: 'whatsapp', color: 'hover:text-green-400', icon: 'fab fa-whatsapp' },
                  { platform: 'linkedin', color: 'hover:text-blue-300', icon: 'fab fa-linkedin-in' },
                  { platform: 'twitter', color: 'hover:text-sky-400', icon: 'fab fa-twitter' }
                ].map(({ platform, color, icon }) => (
                  <motion.a
                    key={platform}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/70 transition-all duration-300 ${color} border border-white/10`}
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                  >
                    <i className={icon}></i>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div 
            className="footer-section"
            variants={itemVariants}
          >
            <motion.h4 
              className="text-xl font-semibold mb-6 text-blue-400"
              whileHover={{ x: 5 }}
            >
              Quick Links
            </motion.h4>
            <motion.ul 
              className="footer-links space-y-3"
              variants={containerVariants}
            >
              {[
                { name: 'Home', href: '#home' },
                { name: 'Services', href: '#services' },
                { name: 'Portfolio', href: '#gallery' },
                { name: 'Contact', href: '#contact' }
              ].map((link, index) => (
                <motion.li key={link.name} variants={itemVariants}>
                  <motion.a
                    href={link.href}
                    className="flex items-center text-gray-300 no-underline transition-all duration-300 group"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    <motion.span 
                      className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100"
                      whileHover={{ scale: 1.5 }}
                    />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Contact Info Column */}
          <motion.div 
            className="footer-section"
            variants={itemVariants}
          >
            <motion.h4 
              className="text-xl font-semibold mb-6 text-blue-400"
              whileHover={{ x: 5 }}
            >
              Get In Touch
            </motion.h4>
            <motion.div 
              className="contact-details space-y-4"
              variants={containerVariants}
            >
              {[
                {
                  icon: 'fas fa-envelope',
                  content: (
                    <a
                      href="mailto:saraswathiprinters14@gmail.com"
                      className="text-gray-300 no-underline transition-all duration-300 hover:text-blue-400"
                    >
                      saraswathiprinters14@gmail.com
                    </a>
                  )
                },
                {
                  icon: 'fas fa-mobile-alt',
                  content: (
                    <a
                      href="tel:+91-9843763000"
                      className="text-gray-300 no-underline transition-all duration-300 hover:text-blue-400"
                    >
                      +91-9843763000
                    </a>
                  )
                },
                {
                  icon: 'fas fa-phone-office',
                  content: (
                    <a
                      href="tel:04224500414"
                      className="text-gray-300 no-underline transition-all duration-300 hover:text-blue-400"
                    >
                      04224500414 (Office)
                    </a>
                  )
                },
                {
                  icon: 'fas fa-map-marker-alt',
                  content: (
                    <span className="text-gray-300">
                      1st Street, Sivananda Colony, Tatabad,<br />
                      Coimbatore, Tamil Nadu 641012
                    </span>
                  )
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-3 group"
                  variants={itemVariants}
                  whileHover={{ x: 3 }}
                >
                  <motion.div 
                    className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300 mt-1"
                    whileHover={{ scale: 1.1 }}
                  >
                    <i className={`${item.icon} text-blue-400 text-sm`}></i>
                  </motion.div>
                  <div className="text-sm leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Business Hours */}
            <motion.div 
              className="mt-6 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h5 className="font-semibold text-blue-400 mb-2 text-sm">Business Hours</h5>
              <div className="text-xs text-gray-300 space-y-1">
                <div className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom text-center pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <motion.p 
              className="text-gray-400 text-sm order-2 md:order-1"
              whileHover={{ scale: 1.02 }}
            >
              &copy; {currentYear} Saraswathi Printers. All rights reserved.
            </motion.p>
            
            <motion.div 
              className="flex justify-center gap-6 order-1 md:order-2 mb-4 md:mb-0"
              variants={containerVariants}
            >
              {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-400 text-sm no-underline transition-colors duration-300 hover:text-blue-400"
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>

            <motion.div 
              className="flex justify-center md:justify-end items-center gap-2 order-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-gray-400 text-sm">Online Now</span>
            </motion.div>
          </div>

          <motion.div 
            className="flex justify-center items-center gap-6 mt-6 pt-6 border-t border-white/5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            
              <motion.a
                
                className="flex items-center gap-2 text-xs text-gray-400"
                href='https://mediaweb6.com/'
                target='_blank'
              >Powered by Media Web6
                
              </motion.a>
           
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};