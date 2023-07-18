import { IMoney, IMoneyModel } from "@/types/interfaces/money";
import { Schema, model, models } from "mongoose";

const moneySchema = new Schema<IMoney>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Money =
  (models.Money as IMoneyModel) ||
  model<IMoney, IMoneyModel>("Money", moneySchema);

export default Money;
