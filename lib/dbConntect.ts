import mongoose from "mongoose";

export function dbConfig() {
  const URI_DB_MONGOOSE = process.env.DB_URI;

  if (!URI_DB_MONGOOSE) throw new Error("Please define a valid URI_DB");

  let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }

  async function connectDB() {
    try {
      if (cached.conn) return cached.conn;

      if (!cached.promise) {
        cached.promise = mongoose
          .connect(URI_DB_MONGOOSE as string)
          .then((data) => data);
      }

      cached.conn = await cached.promise;

      return cached.conn;
    } catch (error) {
      console.error("error connecting db mongo", error);
      return null;
    }
  }

  return { connectDB };
}
