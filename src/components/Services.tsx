import React, { useState, useRef, useEffect } from 'react';
import { Service } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const services: Service[] = [
  {
    id: 'id-cards',
    title: 'ID Card Printing',
    icon: 'fas fa-id-card',
    features: [
      'Plastic PVC cards',
      'Magnetic stripe encoding',
      'Hologram overlay options',
      'UV printing security features',
      'Instant photo capture'
    ]
  },
  {
    id: 'business-cards',
    title: 'Business Card Printing',
    icon: 'fas fa-address-card',
    features: [
      'Standard & custom sizes',
      'Glossy/matte finishes',
      'Spot UV & embossing options',
      'Metallic foil customization',
      'Same-day printing available'
    ]
  },
  {
    id: 'labels-stickers',
    title: 'Custom Label & Sticker Printing',
    icon: 'fas fa-tags',
    features: [
      'Vinyl, paper, and transparent sticker options',
      'Waterproof & scratch-resistant finishes',
      'Die-cut custom shapes available',
      'Foil stamping & embossing effects',
      'Bulk printing discounts for large orders'
    ]
  },
  {
    id: 'brochures',
    title: 'Brochures & Flyers Printing',
    icon: 'fas fa-newspaper',
    features: [
      'Tri-fold, bi-fold & custom formats',
      'Premium full-color printing',
      'Eco-friendly paper options',
      'Glossy, matte & textured finishes',
      'Bulk printing discounts'
    ]
  },
  {
    id: 'flex-banners',
    title: 'Flex & Banner Printing',
    icon: 'fas fa-scroll',
    features: [
      'Vinyl flex banners',
      'Weather-resistant materials',
      'Large format printing',
      'UV-protected designs',
      'Custom size options'
    ]
  },
  {
    id: 'stationery',
    title: 'Office Stationery Printing',
    icon: 'fas fa-file-alt',
    features: [
      'Letterheads & notepads',
      'Business envelopes',
      'Custom invoice & forms',
      'Stamp printing',
      'Premium paper stocks available'
    ]
  }
];

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleService = (serviceId: string) => {
    if (activeService === serviceId) {
      setActiveService(null);
    } else {
      setActiveService(serviceId);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  const contentVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const featureVariants = {
    closed: { 
      opacity: 0, 
      x: -20 
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200
      }
    }
  };

  const iconVariants = {
    idle: { 
      rotate: 0,
      scale: 1
    },
    hover: { 
      rotate: [0, -5, 5, 0],
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    active: {
      rotate: 0,
      scale: 1.15,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="services-section py-20 px-4 relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
    >
      {/* Professional Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(#2D3748 1px, transparent 1px),
              linear-gradient(90deg, #2D3748 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        />

        {/* Geometric Shapes - Professional Style */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border-2 border-blue-200/30 rounded-lg"
          animate={{
            rotate: 180,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="absolute bottom-32 left-32 w-24 h-24 border-2 border-indigo-200/40 rounded-full"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Subtle Floating Dots */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-300/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Corporate Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #1E40AF 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #3730A3 0%, transparent 70%)'
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="section-title text-4xl md:text-5xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional Printing Services
          </motion.h2>
          <motion.p 
            className="section-subtitle text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Premium printing solutions for businesses seeking excellence and reliability
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="services-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover="hover"
              className={`service-card relative rounded-xl p-1 bg-white border border-gray-200 overflow-hidden shadow-lg ${
                activeService === service.id 
                  ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-xl' 
                  : 'ring-0'
              }`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Professional Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 transition-opacity duration-500 hover:opacity-100" />
              
              {/* Hover effect overlay */}
              {hoveredService === service.id && (
                <motion.div
                  className="absolute inset-0 bg-blue-50/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <div className="relative z-10 h-full flex flex-col bg-white/95 backdrop-blur-sm">
                <motion.div
                  className="service-header p-6 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleService(service.id)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="service-title flex items-center gap-4">
                    <motion.div
                      variants={iconVariants}
                      initial="idle"
                      whileHover="hover"
                      animate={activeService === service.id ? "active" : "idle"}
                      className="service-icon-container w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-md"
                    >
                      <i className={`${service.icon} text-white text-lg`}></i>
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {service.title}
                      </h3>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ 
                          width: hoveredService === service.id || activeService === service.id ? '100%' : 0 
                        }}
                        className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                  <motion.i
                    className={`fas fa-chevron-down text-gray-500 transition-colors duration-300 ${
                      activeService === service.id ? 'text-blue-600' : ''
                    }`}
                    animate={{ rotate: activeService === service.id ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  {activeService === service.id && (
                    <motion.div
                      key={`content-${service.id}`}
                      variants={contentVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="service-content overflow-hidden"
                    >
                      <motion.ul className="service-features list-none p-6 pt-2 m-0 space-y-3">
                        {service.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            variants={featureVariants}
                            className="py-3 pl-4 relative text-gray-600 rounded-lg bg-blue-50/50 border-l-4 border-blue-500 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 group"
                            whileHover={{ 
                              x: 5,
                              backgroundColor: "rgb(239 246 255)"
                            }}
                          >
                            <div className="flex items-center">
                              <motion.div
                                className="w-2 h-2 bg-blue-500 rounded-full mr-3"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity,
                                  delay: index * 0.2 
                                }}
                              />
                              <span className="text-sm font-medium group-hover:text-gray-800 transition-colors duration-300">
                                {feature}
                              </span>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="px-6 pb-6"
                      >
                        <motion.button
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 8px 25px rgba(59, 130, 246, 0.25)"
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                          Get Quote
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Professional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-16 p-8 bg-white rounded-2xl border border-gray-200 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Elevate Your Business Printing
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Partner with us for exceptional quality, reliability, and professional service that your business deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
            >
              Start Your Project
            </motion.button>
            
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">Trusted by 500+ Businesses</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-gray-400 text-xs border border-gray-300 rounded-lg px-4 py-2">ISO 9001 Certified</div>
            <div className="text-gray-400 text-xs border border-gray-300 rounded-lg px-4 py-2">24-48hr Turnaround</div>
            <div className="text-gray-400 text-xs border border-gray-300 rounded-lg px-4 py-2">Quality Guarantee</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};