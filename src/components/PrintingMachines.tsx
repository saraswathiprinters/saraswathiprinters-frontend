import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import printer from "../assets/media/illustrationprintmechine.png";
import paperImage from "../assets/media/gsmpaper.png";

export const PrintingAndPaper: React.FC = () => {
    const section2Ref = useRef<HTMLDivElement>(null);
    const isSection2InView = useInView(section2Ref, { once: true, threshold: 0.2 });




    const paperWeights = [
        { weight: "80–100 GSM", use: "Standard corporate documents and internal communications", class: "Standard" },
        { weight: "120–150 GSM", use: "Premium brochures, marketing materials, and client presentations", class: "Premium" },
        { weight: "200–250 GSM", use: "Executive business cards, postcards, and premium invitations", class: "Executive" },
        { weight: "300+ GSM", use: "Luxury packaging, corporate certificates, and premium business cards", class: "Luxury" }
    ];

    const paperSizes = [
        { size: "A1 (594 × 841 mm)", use: "Large format presentations and exhibition displays", code: "A1" },
        { size: "A2 (420 × 594 mm)", use: "Posters, charts, and technical drawings", code: "A2" },
        { size: "A3 (297 × 420 mm)", use: "Tabloid publications and large format reports", code: "A3" },
        { size: "A4 (210 × 297 mm)", use: "Standard business documents and corporate stationery", code: "A4" },
        { size: "A5 (148 × 210 mm)", use: "Booklets, notepads, and promotional flyers", code: "A5" }
    ];

    // Professional animation variants
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
            y: 40
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "easeOut",
                duration: 0.6
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "easeOut",
                duration: 0.5
            }
        },
        hover: {
            y: -5,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            borderColor: "#3B82F6",
            transition: {
                type: "easeOut",
                duration: 0.2
            }
        }
    };

    const statVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <>
          

            {/* Paper Specifications Section */}
            <section className="py-20 bg-gray-50" ref={section2Ref}>
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 40 }}
                        animate={isSection2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 rounded-full mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isSection2InView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Material Specifications</span>
                        </motion.div>
                        
                        <motion.h2 
                            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                            initial={{ opacity: 0 }}
                            animate={isSection2InView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Premium Paper Standards
                        </motion.h2>
                        
                        <motion.p 
                            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={isSection2InView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Comprehensive paper selection meeting international quality standards for professional printing
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content Section */}
                        <motion.div
                            className="space-y-12"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isSection2InView ? "visible" : "hidden"}
                        >
                            {/* Paper Weights */}
                            <motion.div variants={itemVariants}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl">⚖️</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Paper Weight Classification
                                        </h3>
                                        <p className="text-gray-600">GSM standards for various applications</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    {paperWeights.map((paper, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-200 transition-all duration-300 group"
                                            variants={cardVariants}
                                            whileHover="hover"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                                                        {paper.weight}
                                                    </h4>
                                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                        {paper.class} Grade
                                                    </span>
                                                </div>
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-green-500"
                                                    variants={statVariants}
                                                    whileHover={{ scale: 1.5 }}
                                                />
                                            </div>
                                            <p className="text-gray-600 leading-relaxed">
                                                {paper.use}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Paper Sizes */}
                            <motion.div variants={itemVariants}>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <span className="text-2xl">📐</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            International Paper Sizes
                                        </h3>
                                        <p className="text-gray-600">ISO standard dimensions</p>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-4">
                                    {paperSizes.map((size, index) => (
                                        <motion.div
                                            key={index}
                                            className="bg-white rounded-lg p-4 border border-gray-200 hover:border-orange-200 transition-all duration-300 group"
                                            variants={cardVariants}
                                            whileHover="hover"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                                                        <span className="text-lg">{size.icon}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900">
                                                            {size.size}
                                                        </h4>
                                                        <span className="text-xs text-gray-500 font-mono">
                                                            {size.code}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {size.use}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Image Section */}
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, x: 50 }}
                            animate={isSection2InView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                        >
                            <div className="relative">
                                <img
                                    src={paperImage}
                                    alt="Professional paper specifications"
                                    className="max-w-full h-auto rounded-lg shadow-lg"
                                />
                                <div className="absolute -bottom-6 -left-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl">
                                    <div className="text-sm font-semibold">ISO Certified</div>
                                    <div className="text-xs opacity-90">Quality Standards</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Section */}
             
                </div>
            </section>
        </>
    );
};