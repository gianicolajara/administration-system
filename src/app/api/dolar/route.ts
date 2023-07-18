import { onError } from "@/lib/handlers";
import { ResponseCurrencyConvert } from "@/types/types/currency";
import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const dataFetchDolar = fetch("https://www.bcv.org.ve/", {
      next: {
        revalidate: 86400, //1 day revalidation
      },
    });

    const dataFetchVefToCop = fetch(
      "https://community-neutrino-currency-conversion.p.rapidapi.com/convert",
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key": process.env.RAPIT_API as string,
          "X-RapidAPI-Host": process.env.RAPIT_API_HOST as string,
        },
        next: {
          revalidate: 86400, //1 day revalidation
        },
        body: new URLSearchParams({
          "from-value": "1",
          "from-type": "USD",
          "to-type": "COP",
        }),
      }
    );

    const [dataDolar, dataUsdCop] = await Promise.all([
      dataFetchDolar,
      dataFetchVefToCop,
    ]);

    const html = (await dataDolar.text()) as string;
    const resVefCop = (await dataUsdCop.json()) as ResponseCurrencyConvert;

    const dom = new JSDOM(html);
    const document = dom.window.document;

    const dolarPrice = document
      .querySelector("#dolar")
      ?.querySelector("strong")?.textContent;

    if (dolarPrice && resVefCop) {
      const valueVEFTOUSD = parseFloat(
        parseFloat(dolarPrice.trim().replace(",", ".")).toFixed(2)
      );

      const valueUSDTOCOP = parseFloat(parseFloat(resVefCop.result).toFixed(2));

      const valueVEFTOCOP = parseFloat(
        parseFloat((valueUSDTOCOP / valueVEFTOUSD).toString()).toFixed(2)
      );

      return NextResponse.json(
        {
          VEFTOUSD: valueVEFTOUSD,
          USDTOCOP: valueUSDTOCOP,
          COPTOVEF: valueVEFTOCOP,
        },
        {
          status: 200,
        }
      );
    }

    NextResponse.json(
      {
        message: "error",
      },
      {
        status: 500,
        statusText: "Something was Wrong",
      }
    );
  } catch (error) {
    return onError(error);
  }
};
