import { AssetsEnum, BillsEnum } from "@/types/enums/dashboard";
import { IBill, IBillModel } from "@/types/interfaces/bill";
import { Schema, model, models } from "mongoose";

const billSchema = new Schema<IBill>(
  {
    billType: {
      type: Number,
      enum: BillsEnum,
      default: BillsEnum.Multas,
      required: true,
    },
    assets: {
      type: Number,
      enum: AssetsEnum,
      default: AssetsEnum.Egreso,
      required: true,
    },
    typeOfCurrency: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Money",
    },
    amountMoney: {
      type: Number,
      required: true,
    },
    billNumber: {
      type: String,
      required: true,
      unique: true,
    },
    report: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Bill =
  (models.Bill as IBillModel) || model<IBill, IBillModel>("Bill", billSchema);

export default Bill;
