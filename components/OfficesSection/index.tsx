'use client';

import Image from 'next/image';

interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  image: string;
}

const offices: Office[] = [
  {
    id: '1',
    name: 'Smoky Hollow',
    address: '9514 Smoky Hollow St, Sulphur, LA 70683',
    phone: '(736) 297-0859',
    email: 'rsmartin@gmail.com',
    image: '/office-1.jpg',
  },
  {
    id: '2',
    name: 'North Road',
    address: '19 North Road Piscataway, NJ 08854',
    phone: '(736) 297-0859',
    email: 'rsmartin@gmail.com',
    image: '/office-2.jpg',
  },
  {
    id: '3',
    name: 'Rockville Ave',
    address: '8480 Rockville Ave, Greenville, NC 27834',
    phone: '(736) 297-0859',
    email: 'rsmartin@gmail.com',
    image: '/office-3.jpg',
  },
];

export default function OfficesSection() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Our Offices</h2>
        <p className="text-center text-gray-500 mb-8">
          Premium interdum risus risus facilisis cras pellentesque paum suspendisse
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offices.map((office) => (
            <div
              key={office.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={office.image}
                  alt={office.name}
                  fill
                  className="object-cover w-full h-full blur-sm"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="font-bold">{office.name}</div>
                <div className="text-sm text-gray-600 mb-1">{office.address}</div>
                <div className="text-sm">Phone: {office.phone}</div>
                <div className="text-sm">Email: {office.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}