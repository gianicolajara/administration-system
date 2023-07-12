import { Model } from "mongoose";

export interface IMoney {
  name: string;
}

export interface IMoneyModel extends Model<IMoney> {}
