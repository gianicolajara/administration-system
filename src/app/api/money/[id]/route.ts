import { onError } from "@/lib/handlers";
import Money from "@/models/money";
import { NextResponse } from "next/server";
import { IMoney } from "../../../../../types/interfaces/money";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: Partial<IMoney> = await request.json();

    if (!body.name) {
      return NextResponse.json(
        { message: "Todos los datos no fueron ingresados correctamente" },
        { status: 400 }
      );
    }

    const moneyFound = await Money.findByIdAndUpdate(params.id, {
      body,
    });

    return NextResponse.json({
      message: "Moneda actualizada correctamente",
      money: moneyFound,
    });
  } catch (error) {
    return onError(error);
  }
};
