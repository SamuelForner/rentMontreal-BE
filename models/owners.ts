import { compare } from 'bcrypt';
import mongoose from 'mongoose';

import { Iowner } from '../interfaces/ownerInterface';

const { Schema, Types, model } = mongoose;

const ownerSchema = new Schema<Iowner>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  createdAt: { type: Date, default: Date.now },
});

ownerSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  //password is req.body and this.password is owner in the database
  const isValid = await compare(password, this.password);

  return isValid;
};

const Owner = model<Iowner>('owners', ownerSchema);
export default Owner;
