// app/categories/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Category } from '@/types';
import LoadingSpinner from '@/components/LodaingSpinner';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, 'categories');
        const snapshot = await getDocs(categoriesCollection);
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id.toString(),
          ...doc.data()
        })) as Category[];
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter(category =>
    category.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-blue-500"
        style={{ 
          backgroundImage: 'url("/machinery-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-blue-500">
          <div className="max-w-6xl mx-auto h-full flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-white mb-8">Our Categories</h1>
            <div className="w-full max-w-2xl relative">
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full px-4 py-3 rounded-lg pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {loading ? (
          <LoadingSpinner/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.map((category) => (
              <Link href={`/categories/${category.id}`} key={category.id}>
                <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64">
                    <Image
                      src={category.categoryImg}
                      alt={category.id}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{category.id}</h3>
                    <div className="flex items-center text-blue-500">
                      <span>View Machines</span>
                      <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-6 mb-6 md:mb-0">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Image src="/ic_support.png" alt="Support" width={32} height={32} />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Need help choosing?</h3>
            <p className="text-gray-600">Our experts are here to guide you.</p>
          </div>
        </div>
        <Link href="/contact">
          <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}