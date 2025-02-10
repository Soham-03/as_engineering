// components/Services.tsx
import { Settings, WrenchIcon, HeadphonesIcon, Hammer, ShieldCheck, Wrench } from 'lucide-react'
import { Service } from '@/types'

interface ServiceItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

const ServiceItem = ({ icon, title, description }: ServiceItemProps) => (
  <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
    <div className="text-blue-500 mb-4">
      {icon}
    </div>
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const services: Service[] = [
  {
    id: 1,
    title: 'Quality Engineering',
    description: 'Premium quality food processing equipment built to last, with efficient after-sales support and maintenance.',
    icon: <Settings className="w-6 h-6" />
  },
  {
    id: 2,
    title: 'Custom Solutions',
    description: 'Tailored machinery solutions designed to meet your specific production requirements.',
    icon: <WrenchIcon className="w-6 h-6" />
  },
  {
    id: 3,
    title: 'Technical Support',
    description: '24/7 technical assistance and maintenance support for all our machines.',
    icon: <HeadphonesIcon className="w-6 h-6" />
  },
  {
    id: 4,
    title: 'Installation Service',
    description: 'Professional installation and training for optimal machine performance.',
    icon: <Hammer className="w-6 h-6" />
  },
  {
    id: 5,
    title: 'Warranty Coverage',
    description: 'Comprehensive warranty and maintenance packages for peace of mind.',
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    id: 6,
    title: 'Spare Parts Supply',
    description: 'Quick access to genuine spare parts and components when needed.',
    icon: <Wrench className="w-6 h-6" />
  }
]

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-8">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </div>
  )
}