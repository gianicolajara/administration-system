import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const db = dbConfig();

    db.connectDB();

    const body = (await req.json()) as { username?: string; password?: string };

    if (!body.username || !body.password) {
      return NextResponse.json(
        {
          message:
            "No todos los datos requeridos fueron ingresados, intentelo de nuevo",
        },
        {
          status: 401,
        }
      );
    }

    const newUser = new User({
      username: body.username,
      password: body.password,
    });

    const usersSaved = await newUser.save();

    return NextResponse.json(
      {
        message: "Usuario creado satifactoriamente",
        user: usersSaved,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return onError(error);
  }
};
