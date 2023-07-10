export const getPriceUSD = async (): Promise<string> => {
  const res = await fetch("https://www.bcv.org.ve/", {
    next: {
      revalidate: 86400, //1 day revalidation
    },
  });

  return res.text();
};

export const getPriceCOP = async () => {
  const dataFetchVefToCop = await fetch(
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

  return dataFetchVefToCop.json();
};
