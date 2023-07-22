import {
  IConfiguration,
  IModelConfiguration,
} from "@/types/interfaces/configuration";
import { Schema, model, models } from "mongoose";
import Money from "./money";

const ConfigurationScheme = new Schema<IConfiguration, IModelConfiguration>(
  {
    change: {
      type: Schema.Types.ObjectId,
      ref: Money,
      immutable: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret._id = ret.id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Configuration =
  (models.Configuration as IModelConfiguration) ||
  model<IConfiguration, IModelConfiguration>(
    "Configuration",
    ConfigurationScheme
  );

export default Configuration;
