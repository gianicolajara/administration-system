import mongoose, { Model } from "mongoose";

export interface IChanges {
  id?: string;
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  amount: number;
}

export interface IModelChanges extends Model<IChanges> {}
