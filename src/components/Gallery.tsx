import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { GalleryImage } from "../types";
import card1 from '../assets/media/card/card1.png';
import card2 from '../assets/media/card/card2.png';
import brochure1 from '../assets/media/card/brochur1.png';
import brochure2 from '../assets/media/card/brochur2.png';
import events1 from '../assets/media/card/events1.png';
import events2 from '../assets/media/card/events2.png';
import flyer1 from '../assets/media/card/flyer1.png';
import flyer2 from '../assets/media/card/flyer2.png';
import shirt1 from '../assets/media/card/shirt1.png';
import shirt2 from '../assets/media/card/shirt2.png';
import stamp1 from '../assets/media/card/stamp1.png';

const categories = ["business-cards", "id-cards", "brochures", "flyers", "stationery", "T-Shirt", "flyer", "Poster"];

// Comprehensive product data with detailed information
const productData = {
  "business-cards": [
    {
      id: "standard-business-card",
      name: "Standard Business Card",
      description: "Clean, polished, and versatile — perfect for everyday business interactions.",
      overview: "Upgrade your professional image with our Standard Business Cards. First impressions count, and your business card is often the first physical touchpoint of your brand. Our Standard Business Cards offer a sleek, professional look that clearly communicates your contact details. Choose from high-quality paper stocks and finishing options to match your business style.",
      size: "3.5 x 2 inches",
      paperOptions: "300 GSM Lykam Matte or Glossy Coated Paper",
      lamination: "Matte, Glossy, or No Lamination",
      finish: "Sharp digital printing with a professional look",
      moq: "100 cards",
      delivery: "Same-Day Delivery: On orders placed before 3 PM",
      idealFor: "Startups, Consultants, Professionals, Events & Walk-in Customers",
      price: "₹214.76 for 100 Qty (₹2.15 / piece)",
      features: ["High-quality paper stock", "Professional finish", "Fast turnaround", "Budget-friendly", "Crisp printing", "Multiple finish options"],
      image: card1,
      materials: "Premium Coated Paper",
      orientation: "Landscape or Portrait",
      printingLocation: "Single/Double Side",
      quantity: "100, 250, 500, 1000+",
      designGuidelines: "We accept AI, PSD, PDF, JPG files. Minimum 300 DPI resolution required.",
      rating: 4.7,
      reviews: 127,
      recommendation: "85% of customers recommend this product",
      similarProducts: [
        { name: "Premium Business Card", price: "₹4.50 each", image: card2 },
        { name: "Rounded Corner Card", price: "₹3.67 each", image: card1 },
        { name: "Square Business Card", price: "₹2.36 each", image: card2 }
      ]
    },
    {
      id: "premium-business-card",
      name: "Premium Business Card",
      description: "Make a lasting impression with premium quality and sophisticated finishes.",
      overview: "Elevate your brand presence with our Premium Business Cards. Designed for executives and businesses that demand excellence, these cards feature superior cardstock and advanced finishing techniques that create a memorable tactile experience.",
      size: "3.5 x 2 inches",
      paperOptions: "400 GSM Premium Cardstock with Silk Coating",
      lamination: "Spot UV, Matte, or Glossy with Foil Stamping",
      finish: "Premium printing with special effects and embossing",
      moq: "100 cards",
      delivery: "2-3 Business Days",
      idealFor: "Executives, Luxury Brands, Corporate Clients, Premium Services",
      price: "₹450.00 for 100 Qty (₹4.50 / piece)",
      features: ["Premium cardstock", "Spot UV coating", "Enhanced durability", "Luxury feel", "Foil stamping options", "Embossing available"],
      image: card2,
      materials: "Luxury Cardstock",
      orientation: "Landscape or Portrait",
      printingLocation: "Single/Double Side",
      quantity: "100, 250, 500, 1000+",
      designGuidelines: "Vector files preferred. Special finishes require specific file preparation.",
      rating: 4.9,
      reviews: 89,
      recommendation: "92% of customers recommend this product",
      similarProducts: [
        { name: "Standard Business Card", price: "₹2.15 each", image: card1 },
        { name: "Metallic Business Card", price: "₹6.43 each", image: card2 },
        { name: "Textured Business Card", price: "₹5.56 each", image: card1 }
      ]
    }
  ],
  "id-cards": [
    {
      id: "standard-id-card",
      name: "Professional ID Card",
      description: "Advanced security identification cards with durable construction.",
      overview: "Secure and professional identification solutions for corporate and institutional use. Our ID cards feature advanced security measures and durable materials to ensure long-lasting performance.",
      size: "3.375 x 2.125 inches (CR80 Standard)",
      material: "30 Mil Plastic PVC",
      lamination: "Matte or Glossy Protective Overlay",
      finish: "High-resolution dye-sublimation printing",
      moq: "50 cards",
      delivery: "3-5 Business Days",
      idealFor: "Corporate IDs, Employee Badges, Student Cards, Membership Cards",
      price: "₹1,200.00 for 50 Qty (₹24.00 / piece)",
      features: ["Durable PVC material", "Advanced security features", "Custom design", "Long-lasting", "Weather resistant", "Tamper evident"],
      image: card2,
      materials: "PVC Plastic",
      orientation: "Landscape",
      printingLocation: "Single Side",
      quantity: "50, 100, 200, 500+",
      designGuidelines: "Template provided. High-resolution photos required.",
      rating: 4.6,
      reviews: 234,
      recommendation: "88% of customers recommend this product",
      similarProducts: [
        { name: "Student ID Card", price: "₹18.00 each", image: card1 },
        { name: "Employee Badge", price: "₹28.00 each", image: card2 },
        { name: "Membership Card", price: "₹22.00 each", image: card1 }
      ]
    }
  ],
  "brochures": [
    {
      id: "tri-fold-brochure",
      name: "Tri-Fold Brochure",
      description: "Comprehensive marketing brochures with professional layout design.",
      overview: "Perfect for product catalogs and service overviews, our tri-fold brochures provide ample space to showcase your offerings while maintaining a professional, organized appearance.",
      size: "8.5 x 11 inches (Folded), 11 x 25.5 inches (Unfolded)",
      paperOptions: "170 GSM Glossy Art Paper",
      folds: "Professional Tri-fold design",
      finish: "Full-color digital printing with crisp folds",
      moq: "100 pieces",
      delivery: "2-4 Business Days",
      idealFor: "Product Catalogs, Service Overviews, Event Programs, Company Profiles",
      price: "₹1,500.00 for 100 Qty (₹15.00 / piece)",
      features: ["Ample space for content", "Professional layout", "High-quality printing", "Multiple folds", "Glossy finish", "Easy to distribute"],
      image: brochure1,
      materials: "Coated Art Paper",
      orientation: "Landscape",
      printingLocation: "Double Side",
      quantity: "100, 250, 500, 1000+",
      designGuidelines: "Bleed area required. CMYK color mode.",
      rating: 4.5,
      reviews: 156,
      recommendation: "82% of customers recommend this product",
      similarProducts: [
        { name: "Bi-Fold Brochure", price: "₹12.00 each", image: brochure1 },
        { name: "Gate Fold Brochure", price: "₹18.00 each", image: brochure2 },
        { name: "Z-Fold Brochure", price: "₹16.00 each", image: brochure1 }
      ]
    }
  ],
  "flyers": [
    {
      id: "standard-flyer",
      name: "Standard Flyer",
      description: "Eye-catching promotional flyers for maximum impact.",
      overview: "Cost-effective promotional tools that deliver your message with visual impact. Perfect for events, sales, and announcements with quick turnaround times.",
      size: "8.5 x 11 inches (A4)",
      paperOptions: "150 GSM Glossy Paper",
      finish: "Vibrant full-color digital printing",
      moq: "200 pieces",
      delivery: "1-2 Business Days",
      idealFor: "Events, Sales Promotions, Grand Openings, Announcements, Campaigns",
      price: "₹800.00 for 200 Qty (₹4.00 / piece)",
      features: ["Cost-effective", "Quick turnaround", "Vibrant colors", "Versatile use", "High visibility", "Easy distribution"],
      image: brochure2,
      materials: "Glossy Paper",
      orientation: "Portrait or Landscape",
      printingLocation: "Single Side",
      quantity: "200, 500, 1000, 2500+",
      designGuidelines: "Include 3mm bleed. High contrast recommended.",
      rating: 4.4,
      reviews: 312,
      recommendation: "79% of customers recommend this product",
      similarProducts: [
        { name: "Premium Flyer", price: "₹6.00 each", image: brochure2 },
        { name: "Door Hanger Flyer", price: "₹5.00 each", image: brochure1 },
        { name: "Handbill Flyer", price: "₹3.00 each", image: brochure2 }
      ]
    }
  ],
  "stationery": [
    {
      id: "corporate-letterhead",
      name: "Corporate Letterhead",
      description: "Professional stationery that represents your brand with elegance.",
      overview: "Establish brand consistency across all corporate communications with our premium letterheads. Designed to make every document look professional and authoritative.",
      size: "A4 (8.27 x 11.69 inches)",
      paperOptions: "100 GSM Premium Bond Paper",
      finish: "Crisp professional printing with brand elements",
      moq: "500 sheets",
      delivery: "3-5 Business Days",
      idealFor: "Corporate Communication, Official Documents, Business Proposals, Legal Documents",
      price: "₹2,500.00 for 500 Qty (₹5.00 / piece)",
      features: ["Brand consistency", "Professional appearance", "High-quality paper", "Custom branding", "Crisp printing", "Multiple applications"],
      image: stamp1,
      materials: "Bond Paper",
      orientation: "Portrait",
      printingLocation: "Single Side",
      quantity: "500, 1000, 2500, 5000+",
      designGuidelines: "Logo and branding elements required. Template available.",
      rating: 4.8,
      reviews: 178,
      recommendation: "91% of customers recommend this product",
      similarProducts: [
        { name: "Business Envelopes", price: "₹3.00 each", image: stamp1 },
        { name: "Compliment Slips", price: "₹2.00 each", image: stamp1 },
        { name: "Presentation Folders", price: "₹25.00 each", image: stamp1 }
      ]
    }
  ],
  "T-Shirt": [
    {
      id: "printed-tshirt-1",
      name: "Custom Printed T-Shirt",
      description: "High-quality custom printed t-shirts for branding and events.",
      overview: "Create memorable branded apparel with our custom printed t-shirts. Perfect for corporate events, team building, promotions, and merchandise.",
      size: "S, M, L, XL, XXL",
      paperOptions: "100% Cotton Premium Fabric",
      finish: "Digital printing with vibrant colors",
      moq: "50 pieces",
      delivery: "5-7 Business Days",
      idealFor: "Corporate Events, Team Building, Promotions, Brand Merchandise",
      price: "₹350.00 per piece",
      features: ["Premium cotton fabric", "Vibrant printing", "Comfortable fit", "Durable quality", "Custom sizing", "Brand customization"],
      image: shirt1,
      materials: "100% Cotton",
      orientation: "Front/Back Printing",
      printingLocation: "Single/Double Side",
      quantity: "50, 100, 200, 500+",
      designGuidelines: "Vector files preferred. High-resolution artwork required.",
      rating: 4.7,
      reviews: 203,
      recommendation: "89% of customers recommend this product",
      similarProducts: [
        { name: "Premium Polo Shirt", price: "₹450.00 each", image: shirt2 },
        { name: "Hoodie Printing", price: "₹650.00 each", image: shirt1 },
        { name: "Cap Printing", price: "₹200.00 each", image: shirt2 }
      ]
    },
    {
      id: "printed-tshirt-2",
      name: "Premium T-Shirt Printing",
      description: "Premium quality t-shirts with advanced printing techniques.",
      overview: "Elevate your brand apparel with our premium t-shirt printing service. Using advanced printing techniques and high-quality fabrics for superior results.",
      size: "S, M, L, XL, XXL, XXXL",
      paperOptions: "Premium Cotton Blend",
      finish: "Advanced screen printing with special effects",
      moq: "25 pieces",
      delivery: "7-10 Business Days",
      idealFor: "Premium Brands, Fashion Lines, Luxury Events, Executive Gifts",
      price: "₹550.00 per piece",
      features: ["Premium fabric blend", "Advanced printing", "Special effects", "Enhanced durability", "Premium finish", "Custom packaging"],
      image: shirt2,
      materials: "Cotton Blend",
      orientation: "Front/Back/Sleeve Printing",
      printingLocation: "Multiple Locations",
      quantity: "25, 50, 100, 250+",
      designGuidelines: "Professional artwork required. Consultation available.",
      rating: 4.9,
      reviews: 156,
      recommendation: "94% of customers recommend this product",
      similarProducts: [
        { name: "Standard T-Shirt", price: "₹350.00 each", image: shirt1 },
        { name: "Organic Cotton Shirt", price: "₹480.00 each", image: shirt2 },
        { name: "Performance Shirt", price: "₹600.00 each", image: shirt1 }
      ]
    }
  ],
  "flyer": [
    {
      id: "premium-flyer-1",
      name: "Premium Flyer",
      description: "High-impact premium flyers for special promotions and events.",
      overview: "Make a statement with our premium flyers. Designed for special promotions, luxury events, and high-end marketing campaigns that demand exceptional quality.",
      size: "8.5 x 11 inches (A4)",
      paperOptions: "250 GSM Premium Glossy Paper",
      finish: "High-gloss lamination with spot UV",
      moq: "100 pieces",
      delivery: "3-4 Business Days",
      idealFor: "Luxury Events, Premium Promotions, High-end Marketing, Special Launches",
      price: "₹1,200.00 for 100 Qty (₹12.00 / piece)",
      features: ["Premium paper stock", "High-gloss finish", "Spot UV effects", "Enhanced durability", "Luxury feel", "Special coatings"],
      image: flyer1,
      materials: "Premium Coated Paper",
      orientation: "Portrait or Landscape",
      printingLocation: "Single/Double Side",
      quantity: "100, 250, 500, 1000+",
      designGuidelines: "Include 3mm bleed. Premium design recommended.",
      rating: 4.8,
      reviews: 178,
      recommendation: "91% of customers recommend this product",
      similarProducts: [
        { name: "Standard Flyer", price: "₹4.00 each", image: flyer2 },
        { name: "Die-Cut Flyer", price: "₹18.00 each", image: flyer1 },
        { name: "Eco Flyer", price: "₹8.00 each", image: flyer2 }
      ]
    },
    {
      id: "premium-flyer-2",
      name: "Eco-Friendly Flyer",
      description: "Sustainable flyers made from recycled materials.",
      overview: "Promote your brand while being environmentally conscious with our eco-friendly flyers. Made from recycled materials with eco-friendly inks.",
      size: "8.5 x 11 inches (A4)",
      paperOptions: "150 GSM Recycled Paper",
      finish: "Matte eco-friendly coating",
      moq: "200 pieces",
      delivery: "2-3 Business Days",
      idealFor: "Eco-conscious Brands, Green Events, Sustainability Campaigns, Environmental Organizations",
      price: "₹900.00 for 200 Qty (₹4.50 / piece)",
      features: ["Recycled materials", "Eco-friendly inks", "Matte finish", "Sustainable", "Biodegradable", "Environmentally conscious"],
      image: flyer2,
      materials: "Recycled Paper",
      orientation: "Portrait or Landscape",
      printingLocation: "Single Side",
      quantity: "200, 500, 1000, 2500+",
      designGuidelines: "Eco-friendly design principles. Natural color palette recommended.",
      rating: 4.6,
      reviews: 267,
      recommendation: "87% of customers recommend this product",
      similarProducts: [
        { name: "Standard Flyer", price: "₹4.00 each", image: flyer1 },
        { name: "Premium Flyer", price: "₹12.00 each", image: flyer2 },
        { name: "Seed Paper Flyer", price: "₹15.00 each", image: flyer1 }
      ]
    }
  ],
  "Poster": [
    {
      id: "event-poster-1",
      name: "Event Poster",
      description: "Large format posters for events and promotions.",
      overview: "Capture attention with our large format event posters. Perfect for concerts, festivals, conferences, and promotional displays with vibrant colors and high visibility.",
      size: "18 x 24 inches",
      paperOptions: "200 GSM Glossy Poster Paper",
      finish: "High-gloss lamination for protection",
      moq: "50 pieces",
      delivery: "4-6 Business Days",
      idealFor: "Concerts, Festivals, Conferences, Promotional Displays, Retail Stores",
      price: "₹2,500.00 for 50 Qty (₹50.00 / piece)",
      features: ["Large format", "Vibrant colors", "Weather resistant", "High visibility", "Durable material", "Professional finish"],
      image: events1,
      materials: "Poster Paper",
      orientation: "Portrait",
      printingLocation: "Single Side",
      quantity: "50, 100, 200, 500+",
      designGuidelines: "High-resolution files required. Bold designs recommended.",
      rating: 4.7,
      reviews: 189,
      recommendation: "88% of customers recommend this product",
      similarProducts: [
        { name: "A3 Poster", price: "₹30.00 each", image: events2 },
        { name: "Billboard Poster", price: "₹120.00 each", image: events1 },
        { name: "Window Poster", price: "₹25.00 each", image: events2 }
      ]
    },
    {
      id: "event-poster-2",
      name: "Premium Exhibition Poster",
      description: "High-quality posters for exhibitions and professional displays.",
      overview: "Make a professional statement at exhibitions and trade shows with our premium posters. Featuring superior paper quality and advanced printing techniques.",
      size: "24 x 36 inches",
      paperOptions: "250 GSM Premium Matte Paper",
      finish: "Matte lamination with protective coating",
      moq: "25 pieces",
      delivery: "5-7 Business Days",
      idealFor: "Exhibitions, Trade Shows, Gallery Displays, Corporate Events, Professional Presentations",
      price: "₹4,500.00 for 25 Qty (₹180.00 / piece)",
      features: ["Premium paper", "Matte finish", "Professional appearance", "Enhanced durability", "Gallery quality", "Sophisticated look"],
      image: events2,
      materials: "Premium Matte Paper",
      orientation: "Portrait or Landscape",
      printingLocation: "Single Side",
      quantity: "25, 50, 100, 200+",
      designGuidelines: "Professional artwork required. Consultation recommended.",
      rating: 4.9,
      reviews: 134,
      recommendation: "95% of customers recommend this product",
      similarProducts: [
        { name: "Standard Event Poster", price: "₹50.00 each", image: events1 },
        { name: "Framed Poster", price: "₹250.00 each", image: events2 },
        { name: "Roll-up Banner", price: "₹800.00 each", image: events1 }
      ]
    }
  ]
};

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [itemsToShow, setItemsToShow] = useState(6);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [quantity, setQuantity] = useState(100);
  const galleryRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(galleryRef, { once: true, threshold: 0.1 });

  // Get products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === "all") {
      return Object.values(productData).flat();
    }
    return productData[selectedCategory as keyof typeof productData] || [];
  };

  const filteredProducts = getFilteredProducts();
  const visibleProducts = filteredProducts.slice(0, itemsToShow);

  const loadMore = () => {
    setItemsToShow(prev => prev + 6);
  };

  // Reset items to show when category changes
  useEffect(() => {
    setItemsToShow(6);
  }, [selectedCategory]);

  // Helper function to get product category
  const getProductCategory = (productId: string) => {
    for (const [category, products] of Object.entries(productData)) {
      if (products.some(p => p.id === productId)) {
        return category;
      }
    }
    return "unknown";
  };

  // Calculate price based on quantity
  const calculatePrice = (basePrice: string, qty: number) => {
    const base = parseFloat(basePrice.replace('₹', '').split(' ')[0]);
    let multiplier = 1;
    if (qty >= 1000) multiplier = 0.7;
    else if (qty >= 500) multiplier = 0.8;
    else if (qty >= 250) multiplier = 0.9;
    return `₹${(base * (qty / 100) * multiplier).toFixed(2)}`;
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  // Animation variants
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
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        duration: 0.8
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const tabVariants = {
    inactive: { 
      backgroundColor: "#ffffff",
      color: "#6B7280",
      scale: 1
    },
    active: { 
      backgroundColor: "#3B82F6",
      color: "#ffffff",
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 200
      }
    },
    hover: {
      backgroundColor: "#F3F4F6",
      scale: 1.05
    }
  };

  return (
    <section 
      id="gallery" 
      className="gallery py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
      ref={galleryRef}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-100 rounded-full opacity-30 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Enhanced Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Premium Products</span>
            <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Professional Printing Solutions
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our comprehensive range of premium printing products designed to elevate your brand and business communications
          </motion.p>
        </motion.div>

        {/* Enhanced Filter Buttons */}
        <motion.div 
          className="gallery-filter mb-16 flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <motion.button
            className={`px-6 py-3 rounded-2xl border-2 font-semibold text-sm transition-all duration-300 shadow-lg ${
              selectedCategory === "all" 
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-transparent shadow-blue-200" 
                : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-blue-100"
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedCategory("all")}
          >
            All Products
          </motion.button>

          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-3 rounded-2xl border-2 font-semibold text-sm capitalize transition-all duration-300 shadow-lg ${
                selectedCategory === category 
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-transparent shadow-blue-200" 
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:shadow-blue-100"
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCategory(category)}
            >
              {category.replace("-", " ")}
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {visibleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover="hover"
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Premium Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg">
                  PREMIUM
                </span>
              </div>

              {/* Product Image - Full Width & Height */}
              <div className="relative h-80 overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl text-blue-600 text-sm font-semibold uppercase tracking-wide shadow-lg">
                  {getProductCategory(product.id).replace("-", " ")}
                </div>
                
                {/* View Details Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500"
                  initial={{ opacity: 0 }}
                >
                  <motion.button
                    className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-2xl flex items-center gap-3 hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-lg">View Details</span>
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.button>
                </motion.div>
              </div>

              {/* Enhanced Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl text-gray-900 leading-tight">{product.name}</h3>
                  <div className="flex items-center gap-1 bg-green-50 px-3 py-1 rounded-lg">
                    <span className="text-green-600 text-sm font-semibold">★ {product.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-base mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-blue-600">{product.price.split(' ')[0]}</span>
                  <span className="px-3 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    In Stock
                  </span>
                </div>

                {/* Enhanced Features Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.features.slice(0, 2).map((feature: string, idx: number) => (
                    <span key={idx} className="px-3 py-2 bg-blue-50 text-blue-600 text-sm font-medium rounded-lg border border-blue-100">
                      {feature}
                    </span>
                  ))}
                  {product.features.length > 2 && (
                    <span className="px-3 py-2 bg-gray-50 text-gray-500 text-sm font-medium rounded-lg">
                      +{product.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Load More */}
        {itemsToShow < filteredProducts.length && (
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              onClick={loadMore}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Load More Products
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </motion.div>
        )}

        {/* Enhanced Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-16 border-t border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Stats content can be added here */}
        </motion.div>
      </div>

      {/* Enhanced Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              ref={modalRef}
              className="relative w-full h-full max-w-7xl max-h-[95vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-gray-600 hover:text-gray-800 z-50 shadow-lg border border-gray-200"
                onClick={() => setSelectedProduct(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-0 h-full">
                  {/* Product Image Section - Full Width & Height */}
                  <div className="relative w-full h-full min-h-[50vh] lg:min-h-full bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
                    <motion.div
                      className="absolute top-6 left-6 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl text-blue-600 font-semibold text-sm uppercase tracking-wide shadow-lg z-10"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {getProductCategory(selectedProduct.id).replace("-", " ")}
                    </motion.div>
                    
                    <motion.img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain p-8 lg:p-12"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_50%,transparent_75%)] bg-[size:50px_50px] animate-pulse" />
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-6 lg:p-8 overflow-y-auto">
                    <div className="mb-6">
                      <motion.h2 
                        className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {selectedProduct.name}
                      </motion.h2>
                      
                      {/* Rating */}
                      <motion.div 
                        className="flex items-center gap-3 mb-4 flex-wrap"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-xl">
                          <span className="text-yellow-400 text-lg">★</span>
                          <span className="font-semibold text-blue-700">{selectedProduct.rating}</span>
                          <span className="text-gray-500 text-sm">({selectedProduct.reviews} reviews)</span>
                        </div>
                        <span className="text-green-600 font-semibold text-sm bg-green-50 px-2 py-1 rounded">
                          {selectedProduct.recommendation}
                        </span>
                      </motion.div>

                      <motion.p 
                        className="text-lg text-gray-600 leading-relaxed mb-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {selectedProduct.description}
                      </motion.p>
                    </div>

                    {/* Tab Navigation */}
                    <motion.div 
                      className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-2xl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {["overview", "specifications", "pricing"].map((tab) => (
                        <motion.button
                          key={tab}
                          variants={tabVariants}
                          initial="inactive"
                          animate={activeTab === tab ? "active" : "inactive"}
                          whileHover="hover"
                          className="flex-1 py-3 px-2 lg:px-4 rounded-xl font-semibold text-xs lg:text-sm capitalize transition-all duration-200"
                          onClick={() => setActiveTab(tab)}
                        >
                          {tab}
                        </motion.button>
                      ))}
                    </motion.div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                      {activeTab === "overview" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <p className="text-gray-700 leading-relaxed mb-6 text-lg">{selectedProduct.overview}</p>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                            {selectedProduct.features.map((feature: string, index: number) => (
                              <div key={index} className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                                <span className="text-gray-600 text-base">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="bg-blue-50 rounded-2xl p-6">
                            <h4 className="font-semibold text-blue-900 mb-3 text-lg">Ideal For:</h4>
                            <p className="text-blue-700 text-base">{selectedProduct.idealFor}</p>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "specifications" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="space-y-4"
                        >
                          {[
                            { label: "Size", value: selectedProduct.size },
                            { label: "Materials", value: selectedProduct.materials },
                            { label: "Paper Options", value: selectedProduct.paperOptions },
                            { label: "Lamination", value: selectedProduct.lamination },
                            { label: "Finish", value: selectedProduct.finish },
                            { label: "Orientation", value: selectedProduct.orientation },
                            { label: "Printing Location", value: selectedProduct.printingLocation },
                            { label: "Minimum Order", value: selectedProduct.moq },
                            { label: "Delivery", value: selectedProduct.delivery },
                          ].map((spec, index) => (
                            spec.value && (
                              <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200">
                                <span className="font-semibold text-gray-700 text-base">{spec.label}:</span>
                                <span className="text-gray-600 text-base text-right">{spec.value}</span>
                              </div>
                            )
                          ))}
                        </motion.div>
                      )}

                      {activeTab === "pricing" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 lg:p-8 text-white mb-6">
                            <div className="text-3xl lg:text-4xl font-bold mb-3">{selectedProduct.price}</div>
                            <div className="text-blue-100 text-lg">Inclusive of all taxes • Free shipping on orders above ₹2000</div>
                          </div>

                          {/* Quantity Selector */}
                          <div className="mb-6">
                            <label className="block font-semibold text-gray-700 mb-4 text-lg">Quantity</label>
                            <div className="flex gap-3 lg:gap-4 flex-wrap">
                              {[100, 250, 500, 1000].map((qty) => (
                                <motion.button
                                  key={qty}
                                  className={`px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold border-2 transition-all duration-200 text-base ${
                                    quantity === qty
                                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setQuantity(qty)}
                                >
                                  {qty}+
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Bulk Pricing */}
                          <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
                            <h4 className="font-semibold text-gray-900 mb-6 text-xl">Bulk Pricing</h4>
                            <div className="space-y-4">
                              {[
                                { qty: 100, discount: "0%" },
                                { qty: 250, discount: "10%" },
                                { qty: 500, discount: "20%" },
                                { qty: 1000, discount: "30%" },
                              ].map((tier, index) => (
                                <div key={index} className="flex justify-between items-center py-3">
                                  <span className="text-gray-600 text-lg">{tier.qty} pieces</span>
                                  <span className={`font-semibold text-lg ${quantity === tier.qty ? "text-blue-600" : "text-gray-700"}`}>
                                    {calculatePrice(selectedProduct.price, tier.qty)}
                                    {tier.discount !== "0%" && <span className="text-green-600 text-base ml-3">({tier.discount} off)</span>}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Enhanced CTA Section - Updated for informational website */}
                    <motion.div 
                      className="mt-8 pt-8 border-t border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex flex-col lg:flex-row gap-4">
                        <motion.button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 lg:py-5 rounded-2xl font-semibold text-lg lg:text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-4"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            // Scroll to contact section or open contact modal
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                              contactSection.scrollIntoView({ behavior: 'smooth' });
                              setSelectedProduct(null);
                            }
                          }}
                        >
                          <span>Get Free Quote</span>
                          <span className="text-2xl">📞</span>
                        </motion.button>
                        <motion.button
                          className="px-8 lg:px-12 bg-white text-blue-600 py-4 lg:py-5 rounded-2xl font-semibold text-lg lg:text-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.open('tel:+919843763000')}
                        >
                          Call Now
                        </motion.button>
                      </div>
                      <p className="text-center text-gray-500 text-sm lg:text-base mt-4">
                        Need help? Call us at <span className="text-blue-600 font-semibold">+91-9843763000</span>
                      </p>
                    </motion.div>

                    {/* Similar Products */}
                    {selectedProduct.similarProducts && (
                      <motion.div 
                        className="mt-12 pt-8 border-t border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <h4 className="font-semibold text-gray-900 mb-6 text-2xl">Similar Products</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {selectedProduct.similarProducts.map((similar: any, index: number) => (
                            <motion.div
                              key={index}
                              className="bg-gray-50 rounded-2xl p-4 cursor-pointer hover:bg-gray-100 transition-colors border border-gray-200"
                              whileHover={{ scale: 1.03, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                const product = Object.values(productData).flat().find(p => p.name === similar.name);
                                if (product) setSelectedProduct(product);
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <img 
                                  src={similar.image} 
                                  alt={similar.name} 
                                  className="w-16 h-16 object-cover rounded-xl"
                                />
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900 text-base mb-1">{similar.name}</div>
                                  <div className="text-blue-600 font-bold text-lg">{similar.price}</div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};