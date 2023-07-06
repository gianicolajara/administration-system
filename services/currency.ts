import { CurrencyReponseAPI } from "../types/types/currency";

export const getAllCurrency = async (): Promise<CurrencyReponseAPI> => {
  const res = await fetch("http://localhost:3000/api/dolar", {
    next: {
      revalidate: 3600, // 1 hour revalidation
    },
  });
  return res.json() as Promise<CurrencyReponseAPI>;
};
