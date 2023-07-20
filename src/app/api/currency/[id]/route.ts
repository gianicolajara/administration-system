import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import Money from "@/models/money";
import { IMoney } from "@/types/interfaces/money";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const db = dbConfig();
    db.connectDB();

    const body: Partial<IMoney> = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { message: "Todos los datos no fueron ingresados correctamente" },
        { status: 400 }
      );
    }

    await Money.findByIdAndUpdate(new mongoose.Types.ObjectId(params.id), body);

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
    const db = dbConfig();
    db.connectDB();

    await Money.findByIdAndDelete(new mongoose.Types.ObjectId(params.id));

    return NextResponse.json(
      {
        message: "La moneda fue borrada correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    return onError(error);
  }
};
