import mongoose from 'mongoose';

import { Accommodation, PropertyType } from '../interfaces/propertyInterface';

const { Schema, Types, model } = mongoose;

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
}

const propertySchema = new Schema<Iproperty>({
  title: {
    type: String,
    required: true,
  },
  type: { type: String, enum: PropertyType, required: true },
  livingArea: { type: Number, required: true },
  surfaceArea: { type: Number, required: true },
  isFurnished: { type: Boolean, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  floor: { type: Number, required: true },
  price: { type: Number, required: true },
  isChargesIncluded: { type: Boolean, required: true },
  accommodation: { type: String, enum: Accommodation, required: true },
  description: { type: String, required: true },
  picture: String,
});

export default model<Iproperty>('properties', propertySchema);
