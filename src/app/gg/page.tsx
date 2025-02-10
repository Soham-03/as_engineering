'use client'
import React, { useEffect, useState } from 'react';

const ParallaxBeach = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden bg-black">
        {/* Background Image */}
        <div 
          className={`
            absolute inset-0 transition-all duration-2000 ease-out
            ${isLoaded ? 'translate-y-0' : '-translate-y-10'}
          `}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/gg.jpg')`,
              transform: 'scale(1.1)'
            }} 
          />
        </div>

        {/* Static Text Layer with 10px upward animation */}
        <div 
          className={`
            absolute inset-0 flex items-center justify-center z-10
            transition-transform duration-1000 ease-out
            ${isLoaded ? '-translate-y-[50px]' : 'translate-y-0'}
          `}
        >
          <h1 className="text-white text-8xl font-bold tracking-wider font-tan-nimbus">
            UNPLUG
          </h1>
        </div>

        {/* Waves Layer - with extended bottom */}
        <div
          className={`
            absolute inset-x-0 -bottom-20 pointer-events-none z-20
            transition-all duration-2000 ease-out
            ${isLoaded ? 'translate-y-0' : '-translate-y-1/2'}
          `}
          style={{
            height: '60vh'
          }}
        >
          {/* Main waves image */}
          <div 
            className="relative w-full h-full"
            style={{
              backgroundImage: `url('/cutout_gg.png')`,
              backgroundSize: '100% auto',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              transform: 'scale(1.05)'
            }}
          />
          {/* Extended bottom portion */}
          <div 
            className="absolute left-0 right-0 bottom-0 bg-[#003847]"
            style={{
              height: '50vh',
              transform: 'translateY(98%)'
            }}
          />
        </div>

        {/* Scroll Indicator */}
        <div
          className={`
            absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center
            transition-all duration-1000 delay-[2000ms] z-30
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
          `}
        >
          <div className="flex flex-col items-center space-y-2">
            <svg 
              className="w-5 h-5 animate-bounce" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span className="text-sm font-light tracking-wider">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="min-h-screen bg-[#001820] flex items-center px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="flex-1 text-white">
            <h2 className="text-5xl font-tan-nimbus mb-8 relative">
              About Us
              <span className="block w-20 h-1 bg-[#00a6fb] mt-4"></span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-300">
              We are passionate about creating the perfect balance between work and leisure. 
              Our mission is to help professionals find their ideal remote work environment 
              in breathtaking beach destinations. With carefully curated locations and 
              seamless connectivity, we make it possible to stay productive while living 
              your dream lifestyle by the ocean.
            </p>
          </div>
          
          {/* Image Card */}
          <div className="flex-1">
            <div className="relative rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-105 duration-500">
              <div className="aspect-w-16 aspect-h-12">
                <img 
                  src="/api/placeholder/800/600" 
                  alt="Beach workspace" 
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParallaxBeach;