import { getPriceCOP, getPriceUSD } from "@/services/currency";
import { Suspense } from "react";
import CurrencyItems from "./CurrencyItems";

const Navbar = () => {
  const promiseUSDTOVEF = getPriceUSD();
  const promiseUSDTOCOP = getPriceCOP();

  return (
    <Suspense fallback={<h2 className="text-white">loading...</h2>}>
      <CurrencyItems
        promiseCOP={promiseUSDTOCOP}
        promiseVEF={promiseUSDTOVEF}
      />
    </Suspense>
  );
};

export default Navbar;
