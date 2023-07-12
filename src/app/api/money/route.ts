import { onError } from "@/lib/handlers";
import Money from "@/models/money";
import { NextResponse } from "next/server";
import { IMoney } from "../../../../types/interfaces/money";

export const POST = async (request: Request) => {
  try {
    const body: IMoney = await request.json();

    if (!body.name)
      return NextResponse.json(
        {
          message:
            "No todos los datos requeridos fueron ingresados, intentelo de nuevo",
        },
        {
          status: 400,
        }
      );

    const newMoney = new Money({
      name: body.name,
    });

    await newMoney.save();

    return NextResponse.json(
      {
        message: "Moneda creada correctamente",
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
    const monies = await Money.find({});

    return NextResponse.json(
      {
        money: monies,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};
