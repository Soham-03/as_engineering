'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function WhoWeAre() {
 return (
   <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white relative overflow-hidden">
     {/* Decorative Elements */}
     <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
     <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
     <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

     <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="space-y-8"
         >
           <div>
             <h2 className="text-4xl font-bold mb-4">Who We Are</h2>
             <div className="w-20 h-1 bg-blue-400 rounded-full"></div>
           </div>

           <p className="text-blue-100 text-lg leading-relaxed">
             A.S. Engineering Works was established in the year 2012. We are leading
             Manufacturer, Supplier and Trader of Papad Making Machine, Snacks
             Making Machine, Chapati Making Machine, Chapati Pressing Machine, Dough
             Ball Cutting Machine and many more.
           </p>

           <p className="text-blue-100 text-lg leading-relaxed">
             We are a renowned manufacturer and supplier of superior Papad Making 
             Machines to our clients at competitive prices in various shapes and sizes, 
             which can be customized as per the requirement of our clients.
           </p>

           <Link
             href="/about"
             className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl 
               hover:bg-blue-50 transition-all duration-300 font-semibold group shadow-lg hover:shadow-xl"
           >
             LEARN MORE
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Link>
         </motion.div>

         <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="relative"
         >
           <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
             <Image
               src="/factory.jpg"
               alt="Our Factory"
               fill
               className="object-cover hover:scale-105 transition-transform duration-700"
             />
           </div>
           <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20"></div>
         </motion.div>
       </div>
     </div>
   </div>
 );
}