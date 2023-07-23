import { Model, Schema } from "mongoose";
import { IMoney } from "./money";

export interface IConfiguration {
  id?: string | Schema.Types.ObjectId;
  change: string | Schema.Types.ObjectId;
}

export interface IConfigurationResponse {
  id?: string;
  change: IMoney;
}

export interface IModelConfiguration extends Model<IConfiguration> {}
