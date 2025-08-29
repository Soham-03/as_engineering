'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark blackish overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      <div className="max-w-7xl mx-auto px-4 py-24 relative z-20">
        {/* You can remove decorative blobs since video provides the background */}

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-block px-4 py-2 bg-black/30 rounded-full backdrop-blur-sm border border-white/20"
          >
            <span className="text-white font-medium">
              Trusted by 1 Lakh+ Businesses
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-2xl"
          >
            <span className="text-blue-400 relative">
              <div className="absolute -z-10 inset-0 bg-blue-400/20 blur-xl"></div>
            </span>{' '}
            A. S.{' '} Engineering Works
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-200 text-lg md:text-xl drop-shadow-lg"
          >
            Specializing in high-quality Papad Making Machines, Roti Making
            Machines, and Snacks Making Equipment. Built for efficient commercial
            production with customizable options.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/categories"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl font-semibold group"
            >
              EXPLORE MACHINES
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white px-8 py-4 rounded-xl hover:bg-white/10 transition-colors font-semibold hover:shadow-xl backdrop-blur-sm"
            >
              CONTACT US
            </Link>
          </motion.div>

          {/* Responsive Cards Section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/30"
          >
            <div className="group">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl transition-all duration-300 group-hover:bg-black/30 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="text-2xl font-bold text-blue-400">20+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl transition-all duration-300 group-hover:bg-black/30 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="text-2xl font-bold text-blue-400">1 Lakh+</div>
                <div className="text-gray-300">Customers</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-xl transition-all duration-300 group-hover:bg-black/30 group-hover:shadow-xl group-hover:-translate-y-1">
                <div className="text-2xl font-bold text-blue-400">100%</div>
                <div className="text-gray-300">Quality Assured</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
