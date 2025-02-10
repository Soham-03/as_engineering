'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useEffect, useState } from 'react';
import { Category } from '@/types';

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  const phoneNumber = "9552269238";

  const handleCall = () => {
    window.location.href = `tel:+91${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    const message = "Hi, I'm interested in your food processing machines.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/91${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, limit(5));
        const snapshot = await getDocs(q);
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Category[];
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="AS Engineering Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className='text-2xl font-bold'>AS Engineering Works</p>
            <p className="text-gray-400">
              Leading manufacturer of industrial food processing machinery and
              equipment.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="font-bold mb-4">Sitemap</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-gray-300">Categories</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-400">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/categories/${category.id}`} className="hover:text-gray-300">
                    {category.id}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section with Map */}
          <div className="space-y-4">
            <h3 className="font-bold mb-4">Contact Us</h3>
            
            {/* Map */}
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7531.265242652624!2d73.2053736935791!3d19.29833610000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7957cc132958f%3A0x3b582de901431a17!2sA.%20S.%20ENGINEERING%20WORKS!5e0!3m2!1sen!2sin!4v1738502507827!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleWhatsApp}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              <button
                onClick={handleCall}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AS Engineering Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
