import { onError } from "@/lib/handlers";
import Bill from "@/models/bill";
import { IBill } from "@/types/interfaces/bill";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const billes = await Bill.find({})
      .populate("typeOfCurrency")
      .populate("user");

    return NextResponse.json(
      {
        billes,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};

export const POST = async (request: Request) => {
  try {
    const body: IBill = await request.json();

    if (
      !body.amountMoney ||
      !body.assets ||
      !body.billNumber ||
      !body.billType ||
      !body.report ||
      !body.typeOfCurrency ||
      !body.user
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

    const newBill = new Bill(body);

    await newBill.save();

    return NextResponse.json(
      {
        message: "Factura creada correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};
