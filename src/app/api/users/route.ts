import dbConfig from "@/lib/dbConntect";
import { onError } from "@/lib/handlers";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async () => {
  try {
    const db = dbConfig();
    db.connectDB();

    const users = await User.find({});

    return NextResponse.json({
      message: "Usuarios conseguidos correctamente",
      users,
    });
  } catch (error) {
    return onError(error);
  }
};
