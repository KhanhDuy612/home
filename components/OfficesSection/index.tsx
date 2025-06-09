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
    image: '/images/rooms/rooms.webp',
  },
  {
    id: '2',
    name: 'North Road',
    address: '19 North Road Piscataway, NJ 08854',
    phone: '(736) 297-0859',
    email: 'rsmartin@gmail.com',
    image: '/images/rooms/rooms.webp',
  },
  {
    id: '3',
    name: 'Rockville Ave',
    address: '8480 Rockville Ave, Greenville, NC 27834',
    phone: '(736) 297-0859',
    email: 'rsmartin@gmail.com',
    image: '/images/rooms/rooms.webp',
  },
];

export default function OfficesSection() {
  return (
    <section className="px-4 py-10 bg-white">
      <div className="container mx-auto">
        <h2 className="mb-2 text-2xl font-bold text-center md:text-3xl">Our Offices</h2>
        <p className="mb-8 text-center text-gray-500">
          Premium interdum risus risus facilisis cras pellentesque paum suspendisse
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offices.map((office) => (
            <div
              key={office.id}
              className="overflow-hidden bg-white shadow-sm rounded-xl"
            >
              <div className="relative w-full h-40">
                <Image
                  src={office.image}
                  alt={office.name}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <div className="font-bold">{office.name}</div>
                <div className="mb-1 text-sm text-gray-600">{office.address}</div>
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