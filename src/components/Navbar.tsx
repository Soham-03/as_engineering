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
    <nav className="bg-white px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="AS Engineering Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="ml-2 font-semibold">AS ENGINEERING WORKS</span>
        </Link>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`${
                pathname === item.href ? 'text-blue-500' : 'text-gray-600'
              } hover:text-blue-500 transition-colors`}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}