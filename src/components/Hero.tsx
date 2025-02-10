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
     <div className="max-w-7xl mx-auto px-4 py-24">
       {/* Decorative Blobs */}
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 0.2 }}
         transition={{ duration: 1.5 }}
         className="absolute -z-10 top-20 right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
       />
       <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 0.2 }}
         transition={{ duration: 1.5, delay: 0.3 }}
         className="absolute -z-10 bottom-20 left-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"
       />

       <motion.div 
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
       >
         <motion.div 
           variants={itemVariants}
           className="inline-block px-4 py-2 bg-blue-100 rounded-full"
         >
           <span className="text-blue-600 font-medium">
             Trusted by 500+ Businesses
           </span>
         </motion.div>
         
         <motion.h1 
           variants={itemVariants}
           className="text-5xl md:text-6xl font-bold leading-tight"
         >
           For All Your{' '}
           <span className="text-blue-600 relative">
             Food Processing
             <div className="absolute -z-10 inset-0 bg-blue-100/50 blur-xl"></div>
           </span>{' '}
           Machine Needs
         </motion.h1>
         
         <motion.p 
           variants={itemVariants}
           className="text-gray-600 text-lg md:text-xl"
         >
           Specializing in high-quality Papad Making Machines, Chapati Making
           Machines, and Snacks Making Equipment. Built for efficient commercial
           production with customizable options.
         </motion.p>
         
         <motion.div 
           variants={itemVariants}
           className="flex flex-col sm:flex-row gap-4 justify-center"
         >
           <Link
             href="/categories"
             className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold group"
           >
             EXPLORE MACHINES
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
           <Link
             href="/contact"
             className="inline-flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors font-semibold hover:shadow-lg"
           >
             CONTACT US
           </Link>
         </motion.div>

         {/* Responsive Cards Section */}
         <motion.div 
           variants={itemVariants}
           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t"
         >
           <div className="group">
             <div className="bg-blue-50/80 p-6 rounded-xl transition-all duration-300 group-hover:bg-blue-100/80 group-hover:shadow-lg group-hover:-translate-y-1">
               <div className="text-2xl font-bold text-blue-600">20+</div>
               <div className="text-gray-600">Years Experience</div>
             </div>
           </div>
           <div className="group">
             <div className="bg-blue-50/80 p-6 rounded-xl transition-all duration-300 group-hover:bg-blue-100/80 group-hover:shadow-lg group-hover:-translate-y-1">
               <div className="text-2xl font-bold text-blue-600">500+</div>
               <div className="text-gray-600">Customers</div>
             </div>
           </div>
           <div className="group">
             <div className="bg-blue-50/80 p-6 rounded-xl transition-all duration-300 group-hover:bg-blue-100/80 group-hover:shadow-lg group-hover:-translate-y-1">
               <div className="text-2xl font-bold text-blue-600">100%</div>
               <div className="text-gray-600">Quality Assured</div>
             </div>
           </div>
         </motion.div>
       </motion.div>
     </div>
   </div>
 );
}
