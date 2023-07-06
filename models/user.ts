import bcrypt from "bcrypt";
import { Schema, model, models } from "mongoose";
import validator from "validator";
import { IUser, IUserModel } from "../types/interfaces/user";

const UserSchema = new Schema<IUser, IUserModel>(
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
  enteredPassword: string
): boolean {
  return bcrypt.compareSync(enteredPassword, this.password);
};

UserSchema.static("hashPassword", (password: string) => {
  return bcrypt.hashSync(password as string, bcrypt.genSaltSync(10));
});

const User =
  (models.User as IUserModel) || model<IUser, IUserModel>("User", UserSchema);

export default User;
