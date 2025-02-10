'use client';

import { Phone, MessageCircle } from 'lucide-react';

export default function ContactSales() {
  const phoneNumber = "9552269238";
  
  const handleCall = () => {
    window.location.href = `tel:+91${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in your food processing machines.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/91${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <button
        onClick={handleWhatsApp}
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={handleCall}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 group"
        aria-label="Call Sales"
      >
        <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      
      {/* Tooltip-style labels */}
      <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap bg-white rounded-lg shadow-lg py-2 px-4 text-sm font-medium">
        <div className="text-gray-600">Connect with Sales</div>
        <div className="text-gray-800">+91 {phoneNumber}</div>
      </div>
    </div>
  );
}