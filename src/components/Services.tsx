'use client';

import { motion } from 'framer-motion';
import { Settings, WrenchIcon, HeadphonesIcon, Hammer, ShieldCheck, Wrench } from 'lucide-react';
import { Service } from '@/types';

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceItem = ({ icon, title, description, index }: ServiceItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="group"
  >
    <div className="p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 border border-gray-100">
      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
        <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const services: Service[] = [
  {
    id: 1,
    title: 'Quality Engineering',
    description: 'Premium quality food processing equipment built to last, with efficient after-sales support and maintenance.',
    icon: <Settings className="w-6 h-6" />
  },
  {
    id: 2,
    title: 'Custom Solutions',
    description: 'Tailored machinery solutions designed to meet your specific production requirements.',
    icon: <WrenchIcon className="w-6 h-6" />
  },
  {
    id: 3,
    title: 'Technical Support',
    description: '24/7 technical assistance and maintenance support for all our machines.',
    icon: <HeadphonesIcon className="w-6 h-6" />
  },
  {
    id: 4,
    title: 'Installation Service',
    description: 'Professional installation and training for optimal machine performance.',
    icon: <Hammer className="w-6 h-6" />
  },
  {
    id: 5,
    title: 'Warranty Coverage',
    description: 'Comprehensive warranty and maintenance packages for peace of mind.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    id: 6,
    title: 'Spare Parts Supply',
    description: 'Quick access to genuine spare parts and components when needed.',
    icon: <Wrench className="w-6 h-6" />
  }
];

export default function Services() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600 text-lg">
            Comprehensive solutions for your food processing equipment needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
