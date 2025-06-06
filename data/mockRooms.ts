// data/mockRooms.ts

import { Room } from "@/components/Room/Room";



export const mockRooms: Room[] = [
  {
    id: '1',
    title: 'North Road House',
    address: '123 North Road, NY',
    imageUrl: '/images/testimonial/testimonial.png',
    description: 'A beautiful house on North Road...',
    slug: 'north-road-house',
    type: 'houses',
    order: 'For sale',
    propertyDetails: {
      totalArea: '120 sq.ft',
      bedrooms: 3,
      bathrooms: 2,
      floor: '2nd',
      constructionYear: 2019,
      elevator: 1,
      parking: true,
      wifi: true,
      cableTV: false,
      garages: 1,
      price: 300000,
    },
    nearby: [
      {
        category: 'Education',
        places: [
          { name: 'North School', distance: '0.05 mile' },
          { name: 'East High', distance: '0.1 mile' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Road House Villa',
    address: '456 Beach Road, CA',
    imageUrl: '/images/testimonial/testimonial.png',
    description: 'Luxury villa near the beach...',
    slug: 'road-house',
    type: 'villas',
    order: 'For sale',
    propertyDetails: {
      totalArea: '250 sq.ft',
      bedrooms: 4,
      bathrooms: 3,
      floor: '1st',
      constructionYear: 2021,
      elevator: 0,
      parking: true,
      wifi: true,
      cableTV: true,
        garages: 2,
        price: 500000,
    },
    nearby: [
      {
        category: 'Food',
        places: [
          { name: 'Sunset Diner', distance: '0.03 mile' },
          { name: 'Ocean Grill', distance: '0.07 mile' },
        ],
      },
    ],
  },
];
