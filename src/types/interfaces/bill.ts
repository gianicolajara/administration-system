import { Model, Schema } from "mongoose";
import { IMoney } from "./money";
import { IUser } from "./user";

export interface IBill {
  id?: string;
  billType: number;
  assets: number;
  billNumber: string;
  amountMoney: number;
  typeOfCurrency: string | Schema.Types.ObjectId;
  report: string;
  createAt?: Date;
  updateAt?: Date;
  user: string | Schema.Types.ObjectId;
}

export interface IBillResponse {
  id?: string;
  billType: number;
  assets: number;
  billNumber: string;
  amountMoney: number;
  typeOfCurrency: IMoney;
  report: string;
  user: IUser;
  createAt?: Date;
  updateAt?: Date;
}

export interface IBillModel extends Model<IBill> {}
