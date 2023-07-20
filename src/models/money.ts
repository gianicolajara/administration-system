import { IMoney, IMoneyModel } from "@/types/interfaces/money";
import { Schema, model, models } from "mongoose";

const MoneySchema = new Schema<IMoney, IMoneyModel>(
  {
    name: {
      type: String,
      required: true,
    },
    delete: {
      type: Boolean,
      default: false,
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
  model<IMoney, IMoneyModel>("Money", MoneySchema);

export default Money;
