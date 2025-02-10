'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { title: 'HOME', href: '/' },
  { title: 'CATEGORIES', href: '/categories' },
  { title: 'ABOUT US', href: '/about' },
  { title: 'CONTACT US', href: '/contact' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 border-b">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="AS Engineering Logo"
                width={48}
                height={48}
                className="h-12 w-auto group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="ml-3">
              <span className="font-bold text-lg text-gray-900 block leading-tight">
                A. S. ENGINEERING WORKS
              </span>
              <span className="text-sm text-gray-600">Excellence in Engineering</span>
            </div>
          </Link>

          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === item.href 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}