import { Suspense } from "react";
import { getAllCurrency } from "../../../../services/currency";
import { CurrencyReponseAPI } from "../../../../types/types/currency";
import CurrencyItems from "./CurrencyItems";

const Navbar = async () => {
  const currencyData: Promise<CurrencyReponseAPI> = getAllCurrency();

  return (
    <Suspense fallback={<h2 className="text-white">loading...</h2>}>
      <CurrencyItems promise={currencyData} />
    </Suspense>
  );
};

export default Navbar;
