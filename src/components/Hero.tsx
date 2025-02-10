// components/Hero.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          For All Your Food Processing Machine Needs
        </h1>
        <p className="text-gray-600 mb-6">
          Specializing in high-quality Papad Making Machines, Chapati Making
          Machines, and Snacks Making Equipment. Built for efficient commercial
          production with customizable options.
        </p>
        <div className="space-x-4">
          <Link
            href="/products"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            BUY A MACHINE
          </Link>
          <Link
            href="/contact"
            className="border border-blue-500 text-blue-500 px-6 py-2 rounded hover:bg-blue-50 transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </div>
      <div className="rounded-xl overflow-hidden bg-gray-100">
        <Image
          src="/hero-image.png"
          alt="Manufacturing Equipment"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}