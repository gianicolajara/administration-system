import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import Money from "@/models/money";
import { IMoney } from "@/types/interfaces/money";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const POST = async (request: Request) => {
  try {
    const db = dbConfig();
    db.connectDB();

    const body: IMoney = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { message: "Todos los datos no fueron ingresados correctamente" },
        { status: 400 }
      );
    }

    const newMoney = new Money(body);

    const moneySaved = await newMoney.save();

    return NextResponse.json(
      {
        message: "Moneda creada satifactoriamente",
        user: moneySaved,
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

    const currency = await Money.find({ delete: false });

    return NextResponse.json({
      message: "Las monedas fueron conseguidos exitosamente",
      currency: currency ?? [],
    });
  } catch (error) {
    return onError(error);
  }
};
