import * as bcrypt from "bcrypt";
import { Schema, model, models } from "mongoose";
import validator from "validator";
import {
  IUser,
  IUserModel,
  IUserModelMethods,
} from "../../types/interfaces/user";

const UserSchema = new Schema<IUser, IUserModelMethods, IUserModelMethods>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      required: true,
      type: String,
      unique: false,
      validate: [
        validator.isStrongPassword,
        "Porfavor inserte una contraseña segura",
      ],
    },
    active: {
      type: Boolean,
      default: true,
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password as string, salt);
  next();
});

UserSchema.methods.comparePassword = function (
  enteredPassword: string,
  originalPassword: string
): boolean {
  return bcrypt.compareSync(enteredPassword, originalPassword);
};

UserSchema.static("hashPassword", (password: string) => {
  return bcrypt.hashSync(password as string, bcrypt.genSaltSync(10));
});

const User =
  (models.User as IUserModel) || model<IUser, IUserModel>("User", UserSchema);

export default User;
