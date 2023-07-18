import P from "@/app/components/P";
import Table from "@/app/components/Table";
import Loader from "@/app/dashboard/components/Loader";
import { IMoney } from "@/types/interfaces/money";
import { BodyData, Head } from "@/types/types/table";
import { Dispatch, SetStateAction } from "react";
import ItemCurrency from "./ItemCurrency";

type Props = {
  currencies?: Array<IMoney>;
  loading: boolean;
  setFormData: Dispatch<SetStateAction<IMoney>>;
};

const TableCurrency = ({ currencies, loading, setFormData }: Props) => {
  if (loading) return <Loader />;

  if (currencies?.length === 0) return <P>Sin Data</P>;

  if (!currencies) return <P>Algo fue mal</P>;

  const handleSetFormCurrency = (currency: IMoney) => {
    setFormData({
      id: currency.id,
      name: currency.name,
    });
  };

  const generateHead = (): Array<Head> => {
    return [
      {
        id: 1,
        name: "Nombre",
      },
      {
        id: 2,
        name: "Acciones",
      },
    ];
  };

  const generateBody = (): Array<BodyData> => {
    return currencies.map((item) => ({
      id: item.id as string,
      filter: item.name,
      subData: [
        {
          subItem: (
            <ItemCurrency
              currency={item}
              handleSetFormCurrency={handleSetFormCurrency}
            />
          ),
        },
      ],
    }));
  };

  return (
    <Table addFilter={false} body={generateBody()} head={generateHead()} />
  );
};

export default TableCurrency;
