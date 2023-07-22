export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/changes/:path*",
    "/api/dolar/:path*",
    "/api/money/:path*",
    "/api/signup/:path*",
    "/api/users/:path*",
    "/api/currency/:path*",
    "/api/configuration/:path*",
  ],
};
