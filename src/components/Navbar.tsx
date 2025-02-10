'use client'
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Categories", href: "/categories" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 border-b relative">
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
                A. S. ENGINEERING
              </span>
              <span className="text-sm text-gray-600 hidden sm:block">
                Excellence in Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg py-4 px-4 space-y-2 z-50">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
