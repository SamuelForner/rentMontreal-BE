import mongoose from 'mongoose';

import {
  Accommodation,
  Iproperty,
  PropertyType,
} from '../interfaces/propertyInterface';

const { Schema, Types, model } = mongoose;

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
  ownerId: { type: Schema.Types.ObjectId, ref: 'Owner' },
});

export default model<Iproperty>('properties', propertySchema);
