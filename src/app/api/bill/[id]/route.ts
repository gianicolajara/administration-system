import { onError } from "@/lib/handlers";
import Bill from "@/models/bill";
import { IBill } from "@/types/interfaces/bill";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body: Partial<IBill> = await request.json();

    if (
      !body.amountMoney ||
      !body.assets ||
      !body.billNumber ||
      !body.billType ||
      !body.report ||
      !body.typeOfCurrency ||
      !params.id
    ) {
      return NextResponse.json(
        {
          message:
            "No todos los datos requeridos fueron ingresados, intentelo de nuevo",
        },
        {
          status: 400,
        }
      );
    }

    await Bill.findByIdAndUpdate(new mongoose.Types.ObjectId(params.id), body);

    return NextResponse.json({
      message: "Factura actualizada correctamente",
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
    if (!params.id) {
      return NextResponse.json(
        {
          message:
            "No todos los datos requeridos fueron ingresados, intentelo de nuevo",
        },
        {
          status: 400,
        }
      );
    }

    await Bill.findByIdAndDelete(new mongoose.Types.ObjectId(params.id));

    return NextResponse.json({
      message: "Factura borrada correctamente",
    });
  } catch (error) {
    return onError(error);
  }
};
