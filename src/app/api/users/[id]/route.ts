import { onError } from "@/lib/handlers";
import User from "@/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { IUser } from "../../../../../types/interfaces/user";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: IUser = await request.json();

    if (!body.id || !body.username)
      return NextResponse.json(
        { message: "Todos los datos no fueron ingresados correctamente" },
        { status: 400 }
      );

    await User.findByIdAndUpdate(new mongoose.Types.ObjectId(params.id), body);

    return NextResponse.json(
      {
        message: "El usuario fue modificado correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    return onError(error);
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const userFinded = await User.findById(params.id);

    if (!userFinded)
      return NextResponse.json(
        { message: "El usuario no fue encontrado" },
        { status: 400 }
      );

    await User.findByIdAndUpdate(params.id, {
      active: !userFinded.active,
    });

    return NextResponse.json(
      {
        message: "El usuario fue desactivado correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    return onError(error);
  }
};
