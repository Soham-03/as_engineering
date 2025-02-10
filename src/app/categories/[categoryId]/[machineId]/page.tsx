// app/categories/[categoryId]/[machineId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Machine } from '@/types';
import { ArrowLeft, Clock, Settings, Power, Zap } from 'lucide-react';

type ImageSlide = {
  url: string;
  id: number;
};

export default function MachineDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [machine, setMachine] = useState<Machine | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const categoryId = decodeURIComponent(params.categoryId as string);
  const machineId = decodeURIComponent(params.machineId as string);

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const machineRef = doc(db, 'categories', categoryId as string, 'machines', machineId as string);
        const machineDoc = await getDoc(machineRef);
        if (machineDoc.exists()) {
          setMachine({ id: machineDoc.id, ...machineDoc.data() } as Machine);
        }
      } catch (error) {
        console.error('Error fetching machine details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && machineId) {
      fetchMachineDetails();
    }
  }, [categoryId, machineId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Machine not found</div>
      </div>
    );
  }

  // Prepare slides including main image and additional images
  const slides: ImageSlide[] = [
    { url: machine.machineImg, id: 0 },
    ...(machine.additionalImages?.map((url, index) => ({
      url,
      id: index + 1,
    })) || []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Machines
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Image Carousel */}
            <div className="relative">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={slides[currentSlide].url}
                  alt={machine.id}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {slides.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden 
                        ${currentSlide === index ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <Image
                        src={slide.url}
                        alt={`${machine.id} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Machine Details */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{machine.id}</h1>
              <div className="text-2xl font-bold text-blue-500 mb-6">
                {machine.price || 'Price on request'}
              </div>

              {/* Specifications Grid */}
              {machine.details && (
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {Object.entries(machine.details).map(([key, value]) => (
                    <div 
                      key={key}
                      className="bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="text-sm text-gray-500">{key}</div>
                      <div className="font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* YouTube Video */}
              {machine.youtube && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Product Video</h3>
                  <div className="relative pt-[56.25%] rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${machine.youtube.split('v=')[1]}`}
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              {/* Contact Button */}
              <button 
                onClick={() => window.location.href = `/contact?machine=${machine.id}`}
                className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-600 
                  transition-colors font-semibold text-lg"
              >
                Request Quote
              </button>
            </div>
          </div>

          {/* Additional Details Section */}
          {machine.details && Object.keys(machine.details).length > 0 && (
            <div className="border-t p-8">
              <h2 className="text-2xl font-semibold mb-6">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(machine.details).map(([key, value]) => (
                  <div 
                    key={key}
                    className="flex justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-600">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}