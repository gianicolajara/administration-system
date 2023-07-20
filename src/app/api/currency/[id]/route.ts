import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import Money from "@/models/money";
import { IMoney } from "@/types/interfaces/money";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import uniqid from "uniqid";

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
    console.log(params.id);

    const db = dbConfig();
    db.connectDB();

    const currency = await Money.findById(
      new mongoose.Types.ObjectId(params.id)
    );

    if (!currency) {
      return NextResponse.json(
        {
          message: "La moneda no existe",
        },
        { status: 400 }
      );
    }

    await Money.findByIdAndUpdate(new mongoose.Types.ObjectId(params.id), {
      name: `${currency.name}-delete-${uniqid()}`,
      delete: true,
    });

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
