import mongoose, { Schema, model, models } from "mongoose";
import { IChanges, IModelChanges } from "../../types/interfaces/changes";

const changeSchema = new Schema<IChanges>(
  {
    from: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Money",
      required: true,
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
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
        delete ret.password;
        return ret;
      },
    },
  }
);

const Changes =
  (models.Changes as IModelChanges) ||
  model<IChanges, IModelChanges>("Changes", changeSchema);

export default Changes;
