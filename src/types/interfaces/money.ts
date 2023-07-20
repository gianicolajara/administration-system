import { Model } from "mongoose";

export interface IMoney {
  id?: string;
  name: string;
  delete?: boolean;
}

export interface IMoneyModel extends Model<IMoney> {}
