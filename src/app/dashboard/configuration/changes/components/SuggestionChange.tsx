import Loader from "@/app/dashboard/components/Loader";
import useFetch from "@/hooks/useFetch";
import { CurrencyReponseAPI } from "@/types/types/currency";

const SuggestionChange = () => {
  const { data, loading, successfully } = useFetch<CurrencyReponseAPI>({
    url: "/api/dolar",
    method: "GET",
  });

  if (loading) return <Loader />;

  if (successfully)
    return (
      <div className="w-full h-full flex gap-x-2 items-center p-2 border-2 border-neutral-700 bg-neutral-900 rounded-lg mb-4 justify-center">
        <p className="text-white">
          <strong className="underline">USD a COP:</strong> {data.USDTOCOP} COP
          |
        </p>
        <p className="text-white">
          <strong className="underline">VEF a COP:</strong> {data.COPTOVEF} COP
          |
        </p>
        <p className="text-white">
          <strong className="underline">USD a VEF:</strong> {data.VEFTOUSD} VEF
        </p>
      </div>
    );
};

export default SuggestionChange;
