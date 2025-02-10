'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const q = query(categoriesRef, limit(3));
        const snapshot = await getDocs(q);
        const categoriesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
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

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Section */}
          <div className="md:w-1/3 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Featured Categories</h2>
              <p className="text-gray-600">
                We design and manufacture a wide range of food processing equipment
                tailored for commercial kitchens and food production facilities.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 group"
            >
              VIEW ALL CATEGORIES
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Stats or Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <div className="text-sm text-gray-600">Product Categories</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Right Section - Categories */}
          <div className="md:w-2/3">
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                  <Link
                    href={`/categories/${category.id}`}
                    key={category.id}
                    className="group hover:bg-blue-50 p-4 rounded-xl transition-colors"
                  >
                    <div className="flex flex-col sm:gap-4">
                      <div className="relative w-full h-40 sm:h-60 md:h-40">
                        <Image
                          src={category.categoryImg}
                          alt={category.id}
                          fill
                          className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {category.id}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Advanced solutions for efficient {category.id.toLowerCase()} production with customizable options and high-volume capabilities.
                        </p>
                        <div className="flex items-center text-blue-600 font-medium">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
