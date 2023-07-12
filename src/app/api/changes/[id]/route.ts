import { onError } from "@/lib/handlers";
import Changes from "@/models/changes";
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

    const moneyFound = await Changes.findByIdAndUpdate(params.id, {
      body,
    });

    return NextResponse.json({
      message: "Cambio actualizado correctamente",
      money: moneyFound,
    });
  } catch (error) {
    return onError(error);
  }
};
