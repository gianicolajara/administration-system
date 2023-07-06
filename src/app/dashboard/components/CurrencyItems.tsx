import { CurrencyReponseAPI } from "../../../../types/types/currency";

type Props = {
  promise: Promise<CurrencyReponseAPI>;
};

const CurrencyItems = async ({ promise }: Props) => {
  const data = await promise;

  return (
    <div className="w-full h-full flex gap-x-2 items-center">
      <p className="text-white">
        <strong className="underline">USD a COP:</strong> {data.USDTOCOP} COP |
      </p>
      <p className="text-white">
        <strong className="underline">COP a VEF:</strong> {data.COPTOVEF} VEF |
      </p>
      <p className="text-white">
        <strong className="underline">USD a VEF:</strong> {data.VEFTOUSD} VEF
      </p>
    </div>
  );
};

export default CurrencyItems;
