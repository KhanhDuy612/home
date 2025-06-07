
export interface NearbyLocation {
    name: string;
    distance: string;
  }
  
  export interface NearbyCategory {
    category: string;
    places: NearbyLocation[];
  }
  
  export interface PropertyDetails {
    totalArea: string;
    bedrooms: number;
    bathrooms: number;
    floor: string;
    constructionYear: number;
    elevator: number;
    parking: boolean;
    wifi: boolean;
    cableTV: boolean;
    garages?: number;
    price?: number;
  }
  
  export interface Room {
    id: string;
    title: string;
    address: string;
    image: {
      id: string;
    };
    description: string;
    slug: string;
    type: string;
    order?: string;
    totalArea: string;
    bedrooms: number;
    bathrooms: number;
    floor: string;
    constructionYear: number;
    elevator: number;
    parking: boolean;
    wifi: boolean;
    cableTV: boolean;
    garages?: number;
    price?: number;
    total_area: string;
  }
  