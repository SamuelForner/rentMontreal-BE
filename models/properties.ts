import mongoose from 'mongoose';

const { Schema, Types, model } = mongoose;

export interface Iproperty {
  title: string;
  type: string;
  rooms: number;
  surfaceArea: string;
  address: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  description: string;
  picture?: string;
}

const propertySchema = new Schema<Iproperty>({
  title: {
    type: String,
    required: true,
  },
  type: { type: String, required: true }, // appartement, maison, .. required
  rooms: { type: Number, required: true }, // nombre de pièce required
  surfaceArea: { type: String, required: true }, // m2 required
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    country: { type: String, required: true },
  }, //required
  description: { type: String, required: true }, // bel appartement .. required
  picture: String, //not required
});
const Property = model<Iproperty>('properties', propertySchema);

export default model<Iproperty>('properties', propertySchema);
