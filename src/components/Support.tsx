// components/Support.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Support() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col lg:flex-row justify-between items-start">
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-bold mb-2">Support</h2>
          <Link 
            href="/contact" 
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <span>TALK TO US</span>
            <span className="ml-2">→</span>
          </Link>
        </div>
        
        <div className="lg:w-1/3 mt-6 lg:mt-0">
          <p className="text-gray-600 mb-4">
            Need assistance with our machines? Our technical support team is here to
            help you with installation, maintenance, and troubleshooting.
          </p>
          <p className="text-gray-600">
            Contact our support team for immediate assistance with your food
            processing equipment needs.
          </p>
        </div>

        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="relative w-full h-64">
            <Image
              src="/support.png"
              alt="Customer Support"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}