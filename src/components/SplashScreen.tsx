import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/media/sarasvathiprinterslogo.svg';

export const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Step-by-step animation sequence
    const stepTimer = setTimeout(() => {
      if (currentStep < 3) {
        setCurrentStep(prev => prev + 1);
      }
    }, 600);

    // Total splash screen duration
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(exitTimer);
    };
  }, [currentStep]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const logoVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.3
      }
    }
  };

  const printerVariants = {
    initial: { scale: 0, y: 50 },
    animate: {
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  const paperVariants = {
    initial: { x: -100, opacity: 0 },
    print: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.8
      }
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.2
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const backgroundVariants = {
    initial: {
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)"
    },
    animate: {
      background: [
        "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)",
        "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)",
        "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)"
      ],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-center items-center overflow-hidden"
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Gradient orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-30"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.4, 0.2, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.div
            className="relative z-10 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Advanced Printer Animation */}
            <motion.div
              className="relative w-32 h-24 mx-auto mb-8"
              variants={printerVariants}
              initial="initial"
              animate="animate"
            >
              {/* Printer Body */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-2xl border border-gray-600">
                {/* Printer Top */}
                <div className="absolute top-0 left-2 right-2 h-3 bg-gray-800 rounded-t-lg"></div>
                
                {/* Paper Output Slot */}
                <div className="absolute top-3 left-4 right-4 h-1 bg-gray-600"></div>
                
                {/* Control Panel */}
                <div className="absolute top-4 left-3 right-3 h-2 bg-gray-600 rounded"></div>
                <div className="absolute top-6 left-4 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                
                {/* Main Roller */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-b-lg"
                  animate={{
                    background: [
                      "linear-gradient(90deg, #2563eb 0%, #0891b2 100%)",
                      "linear-gradient(90deg, #0891b2 0%, #2563eb 100%)",
                      "linear-gradient(90deg, #2563eb 0%, #0891b2 100%)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>

              {/* Animated Paper */}
              <motion.div
                className="absolute w-20 h-12 bg-white shadow-lg rounded-sm border border-gray-200 bottom-6 left-6"
                variants={paperVariants}
                initial="initial"
                animate="print"
                exit="exit"
              >
                {/* Paper Content */}
                <div className="absolute inset-1 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-sm">
                  <div className="absolute top-1 left-1 right-1 h-1 bg-blue-200 rounded"></div>
                  <div className="absolute top-3 left-1 w-3/4 h-0.5 bg-gray-300 rounded"></div>
                  <div className="absolute top-4 left-1 w-1/2 h-0.5 bg-gray-300 rounded"></div>
                  <div className="absolute bottom-2 left-1 right-1 h-0.5 bg-blue-300 rounded"></div>
                </div>
              </motion.div>

              {/* Printing Effect */}
              {currentStep >= 1 && (
                <motion.div
                  className="absolute bottom-4 left-8 right-8 h-1 bg-blue-400 rounded-full"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </motion.div>

            {/* Logo with Enhanced Animation */}
            <motion.div
              className="mb-6"
              variants={logoVariants}
            >
              <motion.img
                src={logo}
                alt="Saraswathi Printers Logo"
                className="h-20 mx-auto drop-shadow-2xl"
                variants={floatingVariants}
                animate="float"
              />
            </motion.div>

            {/* Loading Text with Typing Animation */}
            <motion.div
              className="text-center"
              variants={textVariants}
            >
              <motion.h2
                className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4"
                variants={pulseVariants}
                animate="pulse"
              >
                Saraswathi Printers
              </motion.h2>
              
              <motion.div
                className="flex items-center justify-center space-x-2 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <motion.div
                  className="flex space-x-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                </motion.div>
                <span className="text-sm font-medium">Loading Premium Printing Solutions</span>
                <motion.div
                  className="flex space-x-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                </motion.div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="mt-4 w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="mt-6 text-sm text-gray-500 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Crafting Excellence in Every Print
            </motion.p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            className="absolute bottom-6 left-0 right-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <p className="text-xs text-gray-400">
              © 2024 Saraswathi Printers. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};