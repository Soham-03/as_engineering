'use client';

import Image from 'next/image';
import { Building2, Users, Shield, Truck, Package, MapPin } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-6">A S Engineering Works</h1>
            <p className="text-gray-600 text-lg">
              Established in 2017, we are leading Manufacturer, Retailer and Wholesaler of Food Processing Machines. Our expertise spans across Papad Making Machines, Snacks Making Machines, Chapati Making Machines, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">About Our Company</h2>
            <p className="text-gray-600">
              We are a renowned manufacturer specializing in superior Papad Making Machines, offering customizable solutions at competitive prices. Our machines are engineered for efficient production without ingredient wastage.
            </p>
            <p className="text-gray-600">
              Extensively used in the food industry, our machines are known for high operational fluency and rigid design. Our veteran engineers ensure perfect quality and durability using well-tested components and modern manufacturing techniques.
            </p>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">2017</div>
              <div className="text-gray-600">Established</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">40L+</div>
              <div className="text-gray-600">Annual Turnover</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Quality Assured', desc: 'Strict quality standards with well-tested components' },
              { icon: Users, title: 'Expert Team', desc: 'Highly experienced professionals at your service' },
              { icon: Truck, title: 'Timely Delivery', desc: 'Efficient delivery through strong distribution network' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-8">Company Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <div className="text-gray-600 mb-1">CEO</div>
                <div className="font-semibold">Amjad Shabbir Pathan</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Address</div>
                <div className="font-semibold">Runda Road, Tirupati Balaji Nagar Titwala east, Kalyan- 421605, Maharashtra, India</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">GST No.</div>
                <div className="font-semibold">27BNSPP2099G1ZB</div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-gray-600 mb-1">Business Type</div>
                <div className="font-semibold">Manufacturer, Retailer & Wholesaler</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Banks</div>
                <div className="font-semibold">IDBI Bank, Axis Bank</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Established</div>
                <div className="font-semibold">17-07-2017</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}