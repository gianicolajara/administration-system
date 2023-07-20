import { Model, Schema } from "mongoose";
import { IMoney } from "./money";

export interface IChanges {
  id?: string;
  from: string | Schema.Types.ObjectId;
  to: string | Schema.Types.ObjectId;
  amount: number | string;
  delete?: boolean;
}

export interface IChangesResponse {
  id?: string;
  from: IMoney;
  to: IMoney;
  amount: number;
  delete?: boolean;
}

export interface IModelChanges extends Model<IChanges> {}
