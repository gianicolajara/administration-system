import Button from "@/app/dashboard/components/Button";
import { useDeleteCurrencyMutation } from "@/redux/services/currencyApi";
import { IMoney } from "@/types/interfaces/money";

type Props = {
  currency: IMoney;
  // eslint-disable-next-line no-unused-vars
  handleSetFormCurrency: (currency: IMoney) => void;
};

const ItemCurrency = ({ currency, handleSetFormCurrency }: Props) => {
  const [deleteCurrency, { isLoading }] = useDeleteCurrencyMutation();

  return (
    <>
      <td className="border-2 border-neutral-700 p-4">{currency.name}</td>
      <td className="border-2 border-neutral-700 px-2">
        <div className="flex gap-x-1">
          <Button onClick={() => handleSetFormCurrency(currency)}>
            Editar
          </Button>
          <Button
            loading={isLoading}
            onClick={() => deleteCurrency({ id: currency.id as string })}
          >
            Borrar
          </Button>
        </div>
      </td>
    </>
  );
};

export default ItemCurrency;
