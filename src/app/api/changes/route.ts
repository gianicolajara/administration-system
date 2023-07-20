import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import Changes from "@/models/changes";
import { IChanges } from "@/types/interfaces/changes";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const POST = async (request: Request) => {
  try {
    const db = dbConfig();
    db.connectDB();

    const body: IChanges = await request.json();

    if (!body.amount || !body.from || !body.to)
      return NextResponse.json(
        {
          message:
            "No todos los datos requeridos fueron ingresados, intentelo de nuevo",
        },
        {
          status: 400,
        }
      );

    const newChanges = new Changes(body);

    await newChanges.save();

    return NextResponse.json(
      {
        message: "Cambio creado correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};

export const GET = async () => {
  try {
    const db = dbConfig();
    db.connectDB();

    const changes = await Changes.find({
      delete: false,
    })
      .populate("from")
      .populate("to");

    return NextResponse.json(
      {
        changes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};
