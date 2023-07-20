import { AssetsEnum, BillsEnum } from "@/types/enums/dashboard";
import { IBill, IBillModel } from "@/types/interfaces/bill";
import { Schema, model, models } from "mongoose";
import Money from "./money";
import User from "./user";

const BillSchema = new Schema<IBill, IBillModel>(
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
      ref: Money,
      required: true,
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
      ref: User,
      required: true,
    },
    createAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
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
  (models.Bill as IBillModel) || model<IBill, IBillModel>("Bill", BillSchema);

export default Bill;
