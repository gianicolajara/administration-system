export const urlApi =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/"
    : process.env.VERCEL === "1"
    ? "https://administration-system-green.vercel.app/api/"
    : "http://localhost:3000/api/";
