import { Model } from "mongoose";

export interface IMoney {
  id?: string;
  name: string;
}

export interface IMoneyModel extends Model<IMoney> {}
