import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import Configuration from "@/models/configurations";
import { IConfiguration } from "@/types/interfaces/configuration";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async () => {
  try {
    const db = dbConfig();
    db.connectDB();

    const configurations = await Configuration.findOne({}).populate("change");

    return NextResponse.json({
      message: "Configuraciones conseguidos correctamente",
      configurations,
    });
  } catch (error) {
    return onError(error);
  }
};

export const POST = async (request: Request) => {
  try {
    const db = dbConfig();
    db.connectDB();

    const body: Partial<IConfiguration> = await request.json();

    const configurations = await Configuration.find({});

    if (configurations.length > 0) {
      await Configuration.updateOne(
        {},
        {
          $set: { change: body.change },
        },
        { strict: false }
      );
    } else {
      await Configuration.create({
        change: body.change,
      });
    }

    return NextResponse.json(
      {
        message: "Configuración creada correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};

export const PUT = async (request: Request) => {
  try {
    const body: Partial<IConfiguration> = await request.json();

    await Configuration.updateOne(
      {},
      {
        $set: { change: body.change },
      },
      { strict: false }
    );

    return NextResponse.json(
      {
        message: "Configuración guardada correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};
