import { onError } from "@/lib/handlers";
import Changes from "@/models/changes";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { IChanges } from "../../../../../types/interfaces/changes";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: Partial<IChanges> = await request.json();

    if (!body.amount || !body.from || !body.to) {
      return NextResponse.json(
        { message: "Todos los datos no fueron ingresados correctamente" },
        { status: 400 }
      );
    }

    await Changes.findByIdAndUpdate(
      new mongoose.Types.ObjectId(params.id),
      body
    );

    return NextResponse.json({
      message: "Cambio actualizado correctamente",
    });
  } catch (error) {
    return onError(error);
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await Changes.findByIdAndDelete(params.id);

    return NextResponse.json(
      {
        message: "El Cambio fue borrada correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};
