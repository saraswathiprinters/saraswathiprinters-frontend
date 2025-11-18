import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const processSteps = [
  {
    icon: 'fas fa-file-upload',
    title: '1. Design Submission',
    description: 'Submit your design files through our secure platform or collaborate with our expert design team.',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    accentColor: 'text-blue-700'
  },
  {
    icon: 'fas fa-search-check',
    title: '2. Quality Review',
    description: 'Comprehensive analysis and optimization for print quality, materials, and cost-efficiency.',
    color: 'from-indigo-600 to-indigo-800',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    accentColor: 'text-indigo-700'
  },
  {
    icon: 'fas fa-check-circle',
    title: '3. Client Approval',
    description: 'Review digital proofs and physical samples with our quality assurance team.',
    color: 'from-emerald-600 to-emerald-800',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    accentColor: 'text-emerald-700'
  },
  {
    icon: 'fas fa-shipping-fast',
    title: '4. Production & Delivery',
    description: 'Precision printing followed by professional packaging and reliable delivery.',
    color: 'from-slate-600 to-slate-800',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    accentColor: 'text-slate-700'
  }
];

export const InfoGraphic: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacityProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.98, 1, 1, 0.98]);

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying || !isInView) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, isInView]);

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

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    active: {
      y: -4,
      scale: 1.01,
      boxShadow: "0 16px 32px rgba(0, 0, 0, 0.06)",
      borderColor: "rgba(59, 130, 246, 0.4)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    idle: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    active: {
      scale: 1.15,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="info-graphic" 
      className="info-graphic relative min-h-screen flex justify-center items-center py-16 px-4 overflow-hidden bg-gray-50"
    >
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Accent Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 border border-blue-100 rounded-lg opacity-40"
          animate={{
            rotate: 180,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <motion.div 
        ref={containerRef}
        className="process-container max-w-6xl w-full p-8 bg-white rounded-xl shadow-sm border border-gray-100 relative"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut"
        }}
        style={{ 
          opacity: opacityProgress,
          scale: scaleProgress
        }}
      >
        <div className="relative z-10">
          {/* Professional Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <i className="fas fa-print text-2xl text-white"></i>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our Process
            </motion.h1>
            
            <motion.div 
              className="w-24 h-1 bg-blue-600 rounded-full mx-auto mb-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              A streamlined workflow designed for exceptional quality, efficiency, and client satisfaction
            </motion.p>
          </motion.div>

          {/* Process Steps */}
          <motion.div 
            className="process-steps relative mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`step relative p-6 rounded-lg border-2 ${step.borderColor} ${step.bgColor} cursor-pointer group transition-all duration-300`}
                  variants={stepVariants}
                  whileHover="hover"
                  animate={activeStep === index ? "active" : "visible"}
                  onClick={() => {
                    setActiveStep(index);
                    setIsPlaying(false);
                    setTimeout(() => setIsPlaying(true), 8000);
                  }}
                >
                  {/* Step Number */}
                  <motion.div 
                    className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-semibold text-xs shadow-md border border-white`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Step Icon */}
                  <motion.div 
                    className="step-icon-container mb-4 flex justify-center"
                    variants={iconVariants}
                    animate={activeStep === index ? "active" : "idle"}
                    whileHover="hover"
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${step.color} shadow-sm`}>
                      <i className={`${step.icon} text-lg text-white`}></i>
                    </div>
                  </motion.div>

                  {/* Step Content */}
                  <motion.h3 
                    className={`step-title text-lg font-semibold mb-3 text-center ${step.accentColor}`}
                    layout
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p 
                    className="step-desc text-gray-600 text-center text-sm leading-relaxed"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Active Indicator */}
                  <motion.div 
                    className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r ${step.color} rounded-full`}
                    animate={activeStep === index ? { width: '60%' } : { width: '0%' }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div 
            className="flex justify-center items-center mb-8 space-x-3"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveStep(index);
                  setIsPlaying(false);
                  setTimeout(() => setIsPlaying(true), 8000);
                }}
                className="focus:outline-none"
              >
                <motion.div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    activeStep === index 
                      ? 'bg-blue-600' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              </button>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
          >
            <motion.h3 
              className="text-xl font-semibold text-gray-900 mb-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.1 }}
            >
              Ready to Start Your Project?
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 mb-6 max-w-md mx-auto text-sm"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2 }}
            >
              Professional printing services trusted by businesses with 99% client satisfaction rate.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 20px rgba(59, 130, 246, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300 hover:bg-blue-700 flex items-center gap-2 text-sm"
              >
                <i className="fas fa-calendar-check text-xs"></i>
                Schedule Consultation
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: "#F9FAFB",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors duration-300 hover:border-gray-400 flex items-center gap-2 text-sm"
              >
                <i className="fas fa-file-pdf text-xs"></i>
                Download Brochure
              </motion.button>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.4 }}
            className="mt-8 text-center"
          >
            <motion.p 
              className="text-gray-500 text-xs font-medium mb-4 tracking-wide"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.5 }}
            >
              INDUSTRY STANDARDS
            </motion.p>
            
            <div className="flex flex-wrap justify-center items-center gap-3">
              {['Quality Certified', 'Fast Turnaround', 'Professional Service', 'Secure Process'].map((badge, index) => (
                <motion.div
                  key={badge}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-md text-gray-600 text-xs font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    borderColor: "#3B82F6"
                  }}
                >
                  {badge}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};