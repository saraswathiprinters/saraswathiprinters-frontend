import React, { useState, useRef, useEffect } from 'react';
import { ContactFormData } from '../types';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare email content
      const subject = `New Print Project Inquiry - ${formData.service}`;
      const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service Required: ${formData.service}

Project Details:
${formData.message}

---
This message was sent from Saraswathi Printers website contact form.
      `.trim();

      // Create mailto link
      const mailtoLink = `mailto:saraswathiprinters14@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open user's email client
      window.location.href = mailtoLink;
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error preparing email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="contact relative min-h-screen flex items-center justify-center py-20 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      {/* Professional Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-blue-200/30 rounded-lg"
          animate={{
            rotate: 180,
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="absolute bottom-32 left-32 w-24 h-24 border border-indigo-200/40 rounded-full"
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

        {/* Subtle Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl bg-blue-500"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full opacity-5 blur-3xl bg-indigo-500"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.04, 0.08, 0.04],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Start Your Project
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Let's discuss your printing needs. Get a free consultation and quote today.
          </motion.p>
          
          {/* Animated Underline */}
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-6"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <motion.h3 
                className="text-2xl font-bold text-gray-800 mb-6"
                animate={floatingAnimation}
              >
                Get In Touch
              </motion.h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start space-x-4 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <i className="fas fa-map-marker-alt text-blue-600 group-hover:text-white transition-colors duration-300"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Our Office</h4>
                    <p className="text-gray-600 text-sm">1st Street, Sivananda Colony, Tatabad,<br />Coimbatore, Tamil Nadu 641012</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <i className="fas fa-phone text-blue-600 group-hover:text-white transition-colors duration-300"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Call Us</h4>
                    <p className="text-gray-600 text-sm">+91 9843763000</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-start space-x-4 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <i className="fas fa-envelope text-blue-600 group-hover:text-white transition-colors duration-300"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email Us</h4>
                    <p className="text-gray-600 text-sm">saraswathiprinters14@gmail.com</p>
                  </div>
                </motion.div>
              </div>

              {/* Business Hours */}
              <motion.div 
                className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1 }}
              >
                <h5 className="font-semibold text-gray-800 mb-2">Business Hours</h5>
                <p className="text-sm text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM<br />Sat: 10:00 AM - 4:00 PM</p>
              </motion.div>

              {/* Direct Email Info */}
              <motion.div 
                className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 1.2 }}
              >
                <h5 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <i className="fas fa-info-circle"></i>
                  How It Works
                </h5>
                <p className="text-sm text-amber-700">
                  After clicking "Send Message", your email client will open with a pre-filled message. Just click send to contact us!
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.form 
              ref={formRef}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100"
              onSubmit={handleSubmit}
              variants={containerVariants}
            >
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                      >
                        <i className="fas fa-check text-white text-sm"></i>
                      </motion.div>
                      <div>
                        <h4 className="font-semibold text-emerald-800">Ready to Send!</h4>
                        <p className="text-emerald-700 text-sm">
                          Your email client should open with a pre-filled message. Please click send to complete your inquiry.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div variants={itemVariants} className="form-group">
                  <label htmlFor="name" className="block mb-3 text-gray-700 font-semibold">
                    Full Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    pattern="[A-Za-z ]{3,50}"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="form-group">
                  <label htmlFor="email" className="block mb-3 text-gray-700 font-semibold">
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    placeholder="john@example.com"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div variants={itemVariants} className="form-group">
                  <label htmlFor="phone" className="block mb-3 text-gray-700 font-semibold">
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    placeholder="+91 9843763000"
                    pattern="\+?[0-9]{1,3} ?[0-9 ]{9,12}"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white"
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="form-group">
                  <label htmlFor="service" className="block mb-3 text-gray-700 font-semibold">
                    Service Required *
                  </label>
                  <motion.select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    onFocus={() => handleFocus('service')}
                    onBlur={handleBlur}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white appearance-none"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select a Service</option>
                    <option value="ID Card Printing">ID Card Printing</option>
                    <option value="Business Cards">Business Cards</option>
                    <option value="Brochures & Flyers">Brochures & Flyers</option>
                    <option value="Labels & Stickers">Labels & Stickers</option>
                    <option value="Flex & Banners">Flex & Banners</option>
                    <option value="Office Stationery">Office Stationery</option>
                    <option value="Other">Other (Specify in message)</option>
                  </motion.select>
                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'service' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="form-group mb-6">
                <label htmlFor="message" className="block mb-3 text-gray-700 font-semibold">
                  Project Details *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  placeholder="Describe your project requirements, timeline, quantity, and any specific details..."
                  rows={5}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white resize-vertical"
                  whileFocus={{ scale: 1.01 }}
                />
                <motion.div
                  className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-1"
                  initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  variants={itemVariants}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 px-8 rounded-xl cursor-pointer transition-all duration-300 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg relative overflow-hidden group"
                  whileHover={{ 
                    scale: isSubmitting ? 1 : 1.02,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {isSubmitting ? (
                    <div className="flex items-center justify-center relative z-10">
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Opening Email Client...
                    </div>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center">
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message via Email
                    </span>
                  )}
                </motion.button>

                {/* Alternative Contact Methods */}
                <motion.div 
                  className="mt-6 text-center"
                  variants={itemVariants}
                >
                  <p className="text-gray-600 text-sm mb-4">Or contact us directly:</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.a
                      href="tel:+919843763000"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fas fa-phone"></i>
                      Call Now
                    </motion.a>
                    <motion.a
                      href="https://wa.me/919843763000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <i className="fab fa-whatsapp"></i>
                      WhatsApp
                    </motion.a>
                  </div>
                </motion.div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };