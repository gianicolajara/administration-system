import { JSDOM } from "jsdom";
import { ResponseCurrencyConvert } from "../../../../types/types/currency";

type Props = {
  promiseVEF: Promise<any>;
  promiseCOP: Promise<any>;
};

const CurrencyItems = async ({ promiseCOP, promiseVEF }: Props) => {
  const resUSDTOVEF = (await promiseVEF) as string;
  const resUSDTOCOP = (await promiseCOP) as ResponseCurrencyConvert;

  const dom = new JSDOM(resUSDTOVEF);
  const document = dom.window.document;

  const dolarPrice = document
    .querySelector("#dolar")
    ?.querySelector("strong")?.textContent;

  if (dolarPrice && resUSDTOCOP) {
    const valueVEFTOUSD = parseFloat(
      parseFloat(dolarPrice.trim().replace(",", ".")).toFixed(2)
    );

    const valueUSDTOCOP = parseFloat(parseFloat(resUSDTOCOP.result).toFixed(2));

    const valueVEFTOCOP = parseFloat(
      parseFloat((valueUSDTOCOP / valueVEFTOUSD).toString()).toFixed(2)
    );

    return (
      <div className="w-full h-full flex gap-x-2 items-center">
        <p className="text-white">
          <strong className="underline">USD a COP:</strong> {valueUSDTOCOP} COP
          |
        </p>
        <p className="text-white">
          <strong className="underline">COP a VEF:</strong> {valueVEFTOCOP} VEF
          |
        </p>
        <p className="text-white">
          <strong className="underline">USD a VEF:</strong> {valueVEFTOUSD} VEF
        </p>
      </div>
    );
  }
};

export default CurrencyItems;
