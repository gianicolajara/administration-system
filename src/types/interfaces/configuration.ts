import { Model, Schema } from "mongoose";
import { IChangesResponse } from "./changes";

export interface IConfiguration {
  id?: string | Schema.Types.ObjectId;
  change: string | Schema.Types.ObjectId;
}

export interface IConfigurationResponse {
  id?: string;
  change: IChangesResponse;
}

export interface IModelConfiguration extends Model<IConfiguration> {}
