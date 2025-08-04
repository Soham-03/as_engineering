'use client';

import { Phone, MapPin, Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Need help choosing the right machine? Our team is here to assist you with product information, customization options, and quotes.
          </p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="max-w-7xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Available Mon-Sat, 9am-6pm</p>
            <button
              onClick={handleCall}
              className="flex items-center text-blue-600 font-medium hover:text-blue-700"
            >
              +91 {phoneNumber} <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
            <p className="text-gray-600 mb-4">Chat with our sales team</p>
            <button
              onClick={handleWhatsApp}
              className="flex items-center text-green-600 font-medium hover:text-green-700"
            >
              Message Now <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
            <p className="text-gray-600">Monday - Saturday</p>
            <p className="text-gray-600">9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Visit Our Factory</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg mt-1">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-gray-600">
                    76RR+6G, near Gail India,<br />
                    Mhaskal,<br />
                    Maharashtra 421605
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg mt-1">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@asengineering.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120505.99217326289!2d73.15893228594959!3d19.290529023867922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be79100564033d1%3A0x49508e0b7fb1bea0!2sA%20S%20Machinery!5e0!3m2!1sen!2sin!4v1754281027714!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}