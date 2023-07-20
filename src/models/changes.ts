import { IChanges, IModelChanges } from "@/types/interfaces/changes";
import mongoose, { Schema, model, models } from "mongoose";

const ChangeSchema = new Schema<IChanges>(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Money",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Money",
      required: true,
    },
    amount: {
      type: Number,
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

const Changes =
  (models.Changes as IModelChanges) ||
  model<IChanges, IModelChanges>("Changes", ChangeSchema);

export default Changes;
