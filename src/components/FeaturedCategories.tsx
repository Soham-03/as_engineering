// components/FeaturedCategories.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'

const products: Product[] = [
  {
    id: 1,
    title: 'Papad Making Machines',
    description: 'Advanced machines for efficient papad production with customizable size and shape options.',
    imageUrl: '/products/papad-machine.jpg'
  },
  {
    id: 2,
    title: 'Chapati Making Machines',
    description: 'Automated solutions for high-volume chapati production with pressing and cooking capabilities.',
    imageUrl: '/products/chapati-machine.jpg'
  },
  {
    id: 3,
    title: 'Snacks Making Equipment',
    description: 'Versatile machinery for various snack productions with consistent quality output.',
    imageUrl: '/products/snacks-machine.jpg'
  }
]

export default function FeaturedCategories() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Featured Categories</h2>
        <Link 
          href="/categories" 
          className="text-blue-500 flex items-center hover:text-blue-600"
        >
          VIEW ALL CATEGORIES
          <span className="ml-2">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            We design and manufacture a wide range of food processing equipment
            tailored for commercial kitchens and food production facilities.
          </p>
        </div>
        <div className="space-y-6">
          {products.map((product) => (
            <div key={product.id} className="flex gap-4">
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={120}
                height={120}
                className="w-32 h-32 object-cover rounded"
              />
              <div>
                <h3 className="text-xl font-semibold text-blue-500 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}