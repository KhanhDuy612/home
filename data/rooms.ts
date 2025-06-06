export type Room = {
  id: string;
  slug: string;
  title: string;
  address: string;
  image: string;
  description: string;
  totalArea: string;
  bedrooms: number;
  area: number; // Diện tích tổng thể
  garages: number; // Số lượng garage
  price: number; // Giá phòng
  type: 'For sale' | 'For rent'; // Loại phòng
  bathrooms: number;
  floor: string;
  constructionYear: number;
  elevator: number;
  parking: boolean;
  wifi: boolean;
  cableTV: boolean;
  nearby: {
    type: 'Education' | 'Health & Medicine' | 'Food' | 'Culture';
    places: { name: string; distance: string }[];
  }[];
};

export const rooms: Room[] = [
  {
    id: '1',
    slug: 'amazing-modern-apartment',
    title: 'Amazing modern apartment',
    address: '43 W. Wellington Road Fairhope, AL 36532',
    image: '/images/testimonial/testimonial.png',
    description:
      'Lorem ipsum dolor sit amet consectetur. Morbi quis habitant donec aliquet interdum. Massa bibendum tellus sed ultricies. Praesent pharetra in lorem eget. Etiam eget est ultrices pulvinar ultricies. Duis urna massa neque pulvinar eu feugiat gravida. In diam adipiscing sed viverra mauris in luctus. Turpis dignissim tincidunt dictum risus suspendisse est consequat purus enim.',
    totalArea: '100 sq.ft',
    bedrooms: 2,
    area: 480,
    garages: 1,
    price: 250000,
    type: 'For sale',
    bathrooms: 2,
    floor: '3rd',
    constructionYear: 2020,
    elevator: 2,
    parking: true,
    wifi: true,
    cableTV: true,
    nearby: [
      {
        type: 'Education',
        places: [
          { name: 'Allen Academy', distance: '0.089 mile' },
          { name: 'St. Joseph School', distance: '0.028 mile' },
          { name: 'George Washington School', distance: '0.059 mile' },
        ],
      },
      {
        type: 'Health & Medicine',
        places: [
          { name: 'Allen Academy', distance: '0.089 mile' },
          { name: 'St. Joseph School', distance: '0.028 mile' },
          { name: 'George Washington School', distance: '0.059 mile' },
        ],
      },
      {
        type: 'Food',
        places: [
          { name: 'Allen Academy', distance: '0.089 mile' },
          { name: 'St. Joseph School', distance: '0.028 mile' },
          { name: 'George Washington School', distance: '0.059 mile' },
        ],
      },
      {
        type: 'Culture',
        places: [
          { name: 'Allen Academy', distance: '0.089 mile' },
          { name: 'St. Joseph School', distance: '0.028 mile' },
          { name: 'George Washington School', distance: '0.059 mile' },
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'north-road-house',
    title: 'North Road House',
    address: '43 W. Wellington Road Fairhope, AL 36532',
    image: '/images/testimonial/testimonial.png',
    description:
      'Lorem ipsum dolor sit amet consectetur. Morbi quis habitant donec aliquet interdum. Massa bibendum tellus sed ultricies. Praesent pharetra in lorem eget. Etiam eget est ultrices pulvinar ultricies. Duis urna massa neque pulvinar eu feugiat gravida. In diam adipiscing sed viverra mauris in luctus. Turpis dignissim tincidunt dictum risus suspendisse est consequat purus enim.',
    totalArea: '100 sq.ft',
    bedrooms: 2,
    area: 480,
    garages: 1,
    price: 250000,
    type: 'For sale',
    bathrooms: 2,
    floor: '3rd',
    constructionYear: 2020,
    elevator: 2,
    parking: true,
    wifi: true,
    cableTV: true,
    nearby: [
      {
        type: 'Education',
        places: [
          { name: 'Allen Academy', distance: '0.089 mile' },
          { name: 'St. Joseph School', distance: '0.028 mile' },
          { name: 'George Washington School', distance: '0.059 mile' },
        ],
      },
      {
        type: 'Health & Medicine',
        places: [
          { name: 'Allen Academy', distance: '0.089 mile' },
          { name: 'St. Joseph School', distance: '0.028 mile' },
          { name: 'George Washington School', distance: '0.059 mile' },
        ],
      },
      {
        type: 'Food',
        places: [
          { name: 'Allen Academy', distance: '0.089 mile' },
          { name: 'St. Joseph School', distance: '0.028 mile' },
          { name: 'George Washington School', distance: '0.059 mile' },
        ],
      },
      {
        type: 'Culture',
        places: [
          { name: 'Allen Academy', distance: '0.089 mile' },
          { name: 'St. Joseph School', distance: '0.028 mile' },
          { name: 'George Washington School', distance: '0.059 mile' },
        ],
      },
    ],
  },
  
  // ... các phòng khác
];
