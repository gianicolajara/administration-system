import { Schema, model, models } from "mongoose";
import { IMoney, IMoneyModel } from "../../types/interfaces/money";

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
        delete ret.password;
        return ret;
      },
    },
  }
);

const Money =
  (models.Money as IMoneyModel) ||
  model<IMoney, IMoneyModel>("Money", moneySchema);

export default Money;
