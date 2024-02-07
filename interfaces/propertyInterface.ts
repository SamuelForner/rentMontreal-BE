import { ObjectId } from 'mongoose';

export enum PropertyType {
  Apartment = 'Apartment',
  House = 'House',
}

export enum Accommodation {
  EntireApartment = 'EntireApartment',
  FlatShare = 'FlatShare',
}

export interface Iproperty {
  title: string;
  type: PropertyType;
  livingArea: number;
  surfaceArea: number;
  isFurnished: boolean;
  address: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  floor: number; // étage
  price: number;
  isChargesIncluded: boolean; //charges comprises dans le prix?
  accommodation: Accommodation; //appartement entier/colocation
  description: string;
  picture?: string;
  ownerId?: ObjectId; // Une propriété est lié à un et un seul owner
}
