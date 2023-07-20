import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import Bill from "@/models/bill";
import { IBill } from "@/types/interfaces/bill";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const db = dbConfig();
    db.connectDB();

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const billes = await Bill.find(
      startDate && endDate
        ? {
            createdAt: {
              $gte: new Date(startDate as string),
              $lte: new Date(endDate as string),
            },
          }
        : {}
    )
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
    console.error(error);
    return onError(error);
  }
};

export const POST = async (request: Request) => {
  try {
    const db = dbConfig();
    db.connectDB();

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
