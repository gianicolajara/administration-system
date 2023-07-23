import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import Changes from "@/models/changes";
import { IChanges } from "@/types/interfaces/changes";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = dbConfig();
    db.connectDB();

    const body: Partial<IChanges> = await request.json();
    console.log({ body });
    console.log(params.id);

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
    console.log(error);

    return onError(error);
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = dbConfig();
    db.connectDB();

    await Changes.findByIdAndUpdate(params.id, {
      delete: true,
    });

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
