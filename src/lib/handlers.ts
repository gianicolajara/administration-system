import { Error } from "mongoose";
//import mongoose from 'mongoose';
import { MongoError } from "mongodb";
import { NextResponse } from "next/server";

export const onError = (error: any) => {
  if (error.name === "MongoServerError") {
    if ((error as MongoError).code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: (error as MongoError).message,
        },
        {
          status: 400,
        }
      );
    }
  }

  if (error instanceof Error.ValidationError) {
    const errors = Object.values(error.errors).map((err) => err.message);
    return NextResponse.json(
      {
        success: false,
        message: "Could not create user due to some invalid fields!",
        error: errors,
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: error.message ?? "Something was wrong",
      error,
    },
    {
      status: 500,
    }
  );
};
