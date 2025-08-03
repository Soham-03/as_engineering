'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Hardcoded featured machines with public image paths
const featuredMachines = [
  {
    id: 'Rice Bhakri Making Machine',
    categoryImg: '/rice_bhakri.png',
    description: 'Efficient rice bhakri making machine designed for high volume production.',
  },
  {
    id: 'Roti Making Machine',
    categoryImg: '/roti_making.png',
    description: 'Advanced roti making machine with customizable settings for perfect roti every time.',
  },
  {
    id: 'Papad Making Machine',
    categoryImg: '/papad.png',
    description: 'Top seller papad making machine built for consistent performance and durability.',
  },
];

export default function FeaturedCategories() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Section */}
          <div className="md:w-1/3 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Featured Machines</h2>
              <p className="text-gray-600">
                We design and manufacture a wide range of food processing equipment
                tailored for commercial kitchens and food production facilities.
              </p>
            </div>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 group"
            >
              VIEW ALL MACHINES
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
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
          {/* Right Section - Machines */}
          <div className="md:w-2/3">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {featuredMachines.map((machine) => (
                <Link
                  href={`/categories`}
                  key={machine.id}
                  className="group hover:bg-blue-50 p-4 rounded-xl transition-colors"
                >
                  <div className="flex flex-col sm:gap-4">
                    <div className="relative w-full h-40 sm:h-60 md:h-40">
                      <Image
                        src={machine.categoryImg}
                        alt={machine.id}
                        fill
                        className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {machine.id}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {machine.description}
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
          </div>
        </div>
      </div>
    </div>
  );
}
