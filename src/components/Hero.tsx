import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import video from '../assets/media/video2.mp4';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const professionalTexts = [
    "Premium Printing Solutions",
    "Business Excellence",
    "Creative Innovation",
    "Quality Craftsmanship"
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.2
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [0, -25, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textRotatorVariants = {
    enter: { 
      y: 30, 
      opacity: 0,
      scale: 0.95
    },
    center: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25
      }
    },
    exit: { 
      y: -30, 
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Text rotator effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % professionalTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Enhanced particle system
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
      maxLife: number;
      rotation: number;
      rotationSpeed: number;
      pulse: number;
    }

    const particles: Particle[] = [];
    const colors = [
      'rgba(59, 130, 246, 0.6)',   // Blue
      'rgba(6, 182, 212, 0.5)',    // Cyan
      'rgba(16, 185, 129, 0.4)',   // Emerald
      'rgba(139, 92, 246, 0.3)',   // Purple
      'rgba(255, 255, 255, 0.4)'   // White
    ];

    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 150 + 100,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pulse: Math.random() * Math.PI * 2
      });
    };

    // Create initial particles
    for (let i = 0; i < 40; i++) {
      createParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      );
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles occasionally
      if (Math.random() < 0.03) {
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life++;
        particle.rotation += particle.rotationSpeed;
        particle.pulse += 0.05;

        const lifeRatio = particle.life / particle.maxLife;
        const alpha = 0.6 * (1 - lifeRatio);
        const pulseSize = particle.size * (0.8 + Math.sin(particle.pulse) * 0.2);

        // Draw particle with rotation
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        // Glow effect
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseSize * 3);
        gradient.addColorStop(0, particle.color.replace(/[\d.]+\)$/, `${alpha})`));
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(0, 0, pulseSize * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Main particle
        ctx.beginPath();
        ctx.arc(0, 0, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, `${alpha})`);
        ctx.fill();

        ctx.restore();

        if (particle.life > particle.maxLife) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="hero h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      {/* Video Background with Professional Overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-200/10 to-indigo-900/80" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Enhanced Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
            }}
            variants={floatingVariants}
            animate="float"
            transition={{
              duration: Math.random() * 10 + 6,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Professional Mouse Spotlight */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Background Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <div className="relative h-full flex items-center justify-center px-4 z-10">
        <motion.div
          className="max-w-6xl w-full mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo/Brand Introduction */}
          <motion.div
            className="mb-12"
            variants={itemVariants}
          >
            <motion.h2
              className="text-2xl md:text-3xl text-white/80 font-light mb-4 tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Welcome to
            </motion.h2>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              SARASWATHI
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-blue-100 to-white bg-clip-text text-transparent">
              PRINTE<span className="text-blue-400">R</span>S
            </span>
          </motion.h1>

          {/* Rotating Professional Text */}
          <motion.div
            className="h-20 mb-8 flex items-center justify-center"
            variants={itemVariants}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                className="text-2xl md:text-4xl lg:text-5xl font-semibold"
                variants={textRotatorVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {professionalTexts[currentTextIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide"
            variants={itemVariants}
          >
            Transforming your vision into exceptional print materials with{' '}
            <span className="text-cyan-300 font-medium">cutting-edge technology</span>
            {' '}and{' '}
            <span className="text-blue-300 font-medium">unmatched craftsmanship</span>
            {' '}since 2010
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            variants={itemVariants}
          >
            <motion.button
              onClick={scrollToContact}
              className="group relative px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold rounded-2xl shadow-2xl overflow-hidden min-w-[220px]"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                Get Instant Quote
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              onClick={scrollToServices}
              className="group relative px-10 py-5 bg-white/10 backdrop-blur-lg text-white text-lg font-semibold rounded-2xl border border-white/20 overflow-hidden min-w-[200px]"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                Explore Services
                <motion.span
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ↓
                </motion.span>
              </span>
            </motion.button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            {[
              { number: '500+', label: 'Happy Clients' },
              { number: '1000+', label: 'Projects' },
              { number: '10+', label: 'Years Exp' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{ 
                  y: -5,
                  backgroundColor: "rgba(255,255,255,0.1)"
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="text-white/60 text-sm font-light tracking-wider">SCROLL TO EXPLORE</div>
            <motion.div
              className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
              animate={{ 
                y: [0, 12, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Professional Bottom Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;