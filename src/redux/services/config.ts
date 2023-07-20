export const urlApi =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/"
    : "https://administration-system-green.vercel.app/api/";
