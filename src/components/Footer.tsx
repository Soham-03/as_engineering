// components/Footer.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MessageSquare } from 'lucide-react'

interface FooterSection {
  title: string
  links: string[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Sitemap',
    links: ['Home', 'Categories', 'Contact Us']
  },
  {
    title: 'Categories',
    links: [
      'Papad Making Machines',
      'Chapati Making Machines',
      'Snacks Making Machines',
      'Dough Ball Cutting Machines'
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="AS Engineering Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className='text-2xl font-bold'>AS Engineering Works</p>
            <p className="text-gray-400">
              Leading manufacturer of industrial food processing machinery and
              equipment.
            </p>
          </div>

          {/* Sitemap and Categories */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link) => (
                  <li key={link} className="hover:text-gray-300 cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section with Map */}
          <div className="space-y-4">
            <h3 className="font-bold mb-4">Contact Us</h3>
            
            {/* Map */}
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7531.265242652624!2d73.2053736935791!3d19.29833610000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7957cc132958f%3A0x3b582de901431a17!2sA.%20S.%20ENGINEERING%20WORKS!5e0!3m2!1sen!2sin!4v1738502507827!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // className="grayscale"
              ></iframe>



            </div>

            {/* Contact Icons */}
            <div className="flex space-x-4 mt-4">
              <Link href="tel:+919999999999" className="hover:text-blue-500 transition-colors" title="Call Us">
                <Phone className="w-6 h-6" />
              </Link>
              <Link href="mailto:contact@asengineering.com" className="hover:text-blue-500 transition-colors" title="Email Us">
                <Mail className="w-6 h-6" />
              </Link>
              <Link href="/contact#message" className="hover:text-blue-500 transition-colors" title="Send Message">
                <MessageSquare className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} AS Engineering Works. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}