// app/categories/[categoryId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Machine } from '@/types';
import { Search, Settings, Clock } from 'lucide-react';
import LoadingSpinner from '@/components/LodaingSpinner';

export default function CategoryMachinesPage() {
  const params = useParams();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const categoryId = decodeURIComponent(params.categoryId as string);


  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const machinesRef = collection(db, 'categories', categoryId, 'machines');
        const snapshot = await getDocs(machinesRef);
        const machinesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Machine[];
        setMachines(machinesData);
      } catch (error) {
        console.error('Error fetching machines:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchMachines();
    }
  }, [categoryId]);

  const filteredMachines = machines.filter(machine =>
    machine.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-500 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <Link href="/categories" className="text-white mb-4 inline-block hover:underline">
            ← Back to Categories
          </Link>
          <h1 className="text-3xl font-bold text-white mb-6">{categoryId}</h1>
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Search machines..."
              className="w-full px-4 py-3 rounded-lg pl-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Machines Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMachines.map((machine) => (
              <Link 
                href={`/categories/${categoryId}/${machine.id}`} 
                key={machine.id}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:translate-y-[-4px]">
                  <div className="relative h-64">
                    <Image
                      src={machine.machineImg}
                      alt={machine.id}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {machine.youtube && (
                      <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        Video Available
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-500 transition-colors">{machine.id}</h3>
                    {machine.details && (
                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          <span className="text-sm">
                            {machine.details['type'] || 'Automatic'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">
                            {machine.details['capacity'] || 'Contact for details'}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-blue-500">
                        {machine.price ? (
                          <span className="font-medium">{machine.price + ' Rs.'}</span>
                        ) : (
                          <span className="text-blue-500 font-medium">Get Price Quote</span>
                        )}
                        <span className="ml-2 transform transition-transform group-hover:translate-x-2">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}