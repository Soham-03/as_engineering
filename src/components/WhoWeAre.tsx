// components/WhoWeAre.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function WhoWeAre() {
  return (
    <div className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 gap-8 items-center">
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/factory.jpg"
            alt="Our Factory"
            width={500}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
          <p className="mb-6">
            A.S. Engineering Works was established in the year 2012. We are leading
            Manufacturer, Supplier and Trader of Papad Making Machine, Snacks
            Making Machine, Chapati Making Machine, Chapati Pressing Machine, Dough
            Ball Cutting Machine and many more. We are a renowned manufacturer and
            supplier of superior Papad Making Machines to our clients at
            competitive prices in various shapes and sizes, which can be customized
            as per the requirement of our clients. Our machine helps in quickly
            making lots of papad without wasting any ingredients. We offer our
            range at competitive prices.
          </p>
          <Link
            href="/about"
            className="bg-white text-blue-500 px-6 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            LEARN MORE
          </Link>
        </div>
      </div>
    </div>
  )
}