import { Model } from "mongoose";
import { IMoney } from "./money";

export interface IChanges {
  id?: string;
  from: string;
  to: string;
  amount: number | string;
}

export interface IChangesResponse {
  id?: string;
  from: IMoney;
  to: IMoney;
  amount: number;
}

export interface IModelChanges extends Model<IChanges> {}
