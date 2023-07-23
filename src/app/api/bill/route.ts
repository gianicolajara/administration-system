import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import Bill from "@/models/bill";
import Changes from "@/models/changes";
import Configuration from "@/models/configurations";
import Money from "@/models/money";
import { IBill } from "@/types/interfaces/bill";
import { IChanges } from "@/types/interfaces/changes";
import { IConfigurationResponse } from "@/types/interfaces/configuration";
import { NextResponse } from "next/server";

export const revalidate = 0;

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

    const configuration = (await Configuration.findOne({}).populate(
      "change"
    )) as IConfigurationResponse;

    if (!configuration?.change?.id) {
      return NextResponse.json(
        {
          message:
            "Necesita configurar la moneda a usar para calcular totales de factura",
        },
        {
          status: 400,
        }
      );
    }

    const billTypeMoney = await Money.findById(body.typeOfCurrency);

    const changeAmount =
      billTypeMoney?.id !== configuration.change.id
        ? await Changes.findOne<IChanges>({
            from: billTypeMoney?.id,
            to: configuration.change.id,
          }).exec()
        : 1;

    if (!changeAmount) {
      return NextResponse.json(
        {
          message: "Necesita configurar los tipos de cambio correctamente",
        },
        {
          status: 400,
        }
      );
    }

    const newBill = new Bill({
      ...body,
      changeAmount:
        billTypeMoney?.id !== configuration.change.id
          ? ((changeAmount as IChanges).amount as number)
          : (changeAmount as number),
    });

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
